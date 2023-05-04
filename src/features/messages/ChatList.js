import React, { useEffect, useContext, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from "../../services/firestore";
import { UserContext } from "../../contexts/user.context";
import ChatCard from "./ChatCard";
import { Text } from "react-native-paper";
import { openChat } from "./utils";

const ChatList = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const conversationsRef = collection(db, "messages");
    const q = query(
      conversationsRef,
      where("members", "array-contains", currentUser.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const chatsArray = [];
      querySnapshot.forEach((res) => {
        chatsArray.push({
          ...res.data(),
          id: res.id,
          path: res.ref.path,
        });
      });
      setChats(chatsArray);
    });
    return unsub;
  }, [currentUser.uid]);

  // const openChat = (navigation, chatDoc) => {
  //   navigation.navigate("Chat", { chatDoc: chatDoc });
  // };

  return (
    <View>
      <Text>Messages</Text>
      {chats.length > 0 &&
        chats.map((chat, i) => {
          return (
            <ChatCard
              openChat={() => openChat(navigation, chat)}
              chatDoc={chat}
              key={i}
            />
          );
        })}
    </View>
  );
};

export default ChatList;
