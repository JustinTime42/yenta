import React, { useEffect, useState } from "react";
import { Avatar, Text } from "react-native-paper";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../services/firestore";
import { View } from "react-native";

const ChatCard = ({ chatDoc, openChat }) => {
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
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => openChat(chatDoc)}
    >
      {lastMsg && (
        <>
          <Avatar.Image source={{ uri: chatDoc[lastMsg.from].photoUrl }} />
          <Text>{lastMsg.body}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  touchable: {
    display: "flex",
    flexDirection: "row",
  },
});
