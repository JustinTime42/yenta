import React, { useContext, useEffect, useState } from "react";
import { Avatar, Text, TextInput } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/firestore";
import { ScrollView, StyleSheet } from "react-native";
import { PrimaryButton } from "../../components/buttons";
import { UserContext } from "../../contexts/user.context";
import { getMembers } from "./utils";
import KeyboardShift from "../../components/KeyboardAvoidingView";

const Chat = ({ navigation, route }) => {
  const { currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [memberDetails, setMemberDetails] = useState([]);
  const { chatDoc } = route.params;
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("CHATDOC: ", chatDoc.id);
    getMembers(chatDoc.id).then((res) => {
      setMemberDetails(res);
    });
  }, [chatDoc]);

  useEffect(() => {
    let chatRef;
    chatRef = collection(db, `${chatDoc.path}/messages`);
    const q = query(chatRef, orderBy("timestamp"), limit(10));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let msgArray = [];
      querySnapshot.forEach((res) => {
        const msg = res.data();
        const photoURL = memberDetails?.find(
          (i) => i.uid === msg.from
        )?.photoURL;
        msgArray.push({ ...res.data(), id: res.id, photoURL: photoURL });
      });
      setMessages(msgArray);
    });
    return unsub;
  }, [chatDoc.path, memberDetails]);

  // need to get members, then for each member, get their details.
  // then we need to access those based on msg.from
  // useEffect(() => {
  //   console.log("MEMBER DETALS: ", memberDetails);
  // }, [memberDetails]);

  const handleSendMessage = async () => {
    const newMessageRef = await addDoc(
      collection(db, `${chatDoc.path}/messages`),
      {
        body: text,
        from: currentUser.uid,
        timestamp: serverTimestamp(),
      }
    );
    setText("");
  };

  return (
    <KeyboardShift>
      <View style={styles.chatWindow}>
        <ScrollView>
          {messages.map((msg, i) => {
            return (
              <TouchableOpacity style={styles.msgContainer} key={i}>
                <Avatar.Image
                  source={{
                    uri: msg.photoURL,
                  }}
                />
                <Text>{msg.body}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.messageBox}>
          <TextInput
            style={styles.sendText}
            value={text}
            onChangeText={(t) => setText(t)}
          />
          <Ionicons
            color="blue"
            style={styles.sendButton}
            onPress={handleSendMessage}
            name="send"
            size={32}
          />
        </View>
      </View>
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  msgContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 1,
    alignItems: "center",
  },
  chatWindow: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
  messageBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  sendText: {
    flexBasis: "80%",
  },
  sendButton: {},
});

export default Chat;
