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
import { createNewMessageThread } from "./utils";

const Chat = ({ navigation, route }) => {
  const { currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const { chatDoc } = route.params;
  const [text, setText] = useState("");

  useEffect(() => {
    if (!chatDoc) {
      return;
    }
    let chatRef;
    chatRef = collection(db, `${chatDoc.path}/messages`);
    const q = query(chatRef, orderBy("timestamp"), limit(10));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let msgArray = [];
      querySnapshot.forEach((doc) => {
        msgArray.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgArray);
      console.log(msgArray);
    });
    return unsub;
  }, [chatDoc]);

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
    <View style={styles.chatWindow}>
      <ScrollView>
        {messages.map((msg, i) => {
          return (
            <TouchableOpacity key={i} styles={styles.msgContainer}>
              <Avatar.Image source={{ uri: chatDoc[msg.from]?.photoURL }} />
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
        <PrimaryButton style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={32} />
        </PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  msgContainer: {
    display: "flex",
    flexDirection: "row",
  },
  chatWindow: {
    display: "flex",
    height: "100%",
  },
  messageBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  sendText: {
    flexBasis: "80%",
  },
  sendButton: {},
});

export default Chat;
