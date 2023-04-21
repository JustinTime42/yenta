import React, { useEffect, useContext, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from "../../services/firestore";
import { UserContext } from "../../contexts/user.context";
import ChatCard from "./ChatCard";

const ChatList = () => {
  const { currentUser } = useContext(UserContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const conversationsRef = collection(db, "conversations");
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

  return (
    <ScrollView>
      {chats.map((chat, i) => {
        return <ChatCard chatDoc={chat} key={i} />;
      })}
      ;
    </ScrollView>
  );
};

export default ChatList;
