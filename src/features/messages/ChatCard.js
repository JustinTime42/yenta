import React, { useEffect, useState } from "react";
import { Avatar, Text, TouchableOpacity } from "react-native-paper";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../services/firestore";

const ChatCard = ({ chatDoc }) => {
  const [lastMsg, setLastMsg] = useState("");

  useEffect(() => {
    const chatRef = collection(db, `${chatDoc.path}/messages`);
    const q = query(chatRef, orderBy("timestamp", "desc"), limit(1));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setLastMsg({ ...doc.data(), id: doc.id });
      });
    });
    return unsub;
  });

  return (
    <TouchableOpacity>
      <Avatar.Image source={{ uri: chatDoc[lastMsg.from].photoUrl }} />
      <Text>{lastMsg.body}</Text>
    </TouchableOpacity>
  );
};

export default ChatCard;
