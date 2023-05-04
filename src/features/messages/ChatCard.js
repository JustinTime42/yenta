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
import { getUserDetails } from "./utils";

const ChatCard = ({ chatDoc, openChat }) => {
  const [lastMsg, setLastMsg] = useState("");
  const [lastPhoto, setLastPhoto] = useState("");

  useEffect(() => {
    if (chatDoc) {
      const chatRef = collection(db, `${chatDoc.path}/messages`);
      const q = query(chatRef, orderBy("timestamp", "desc"), limit(1));
      const unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setLastMsg({ ...doc.data(), id: doc.id });
        });
      });
      return unsub;
    } else {
      return;
    }
  }, [chatDoc]);

  useEffect(() => {
    if (lastMsg) {
      getCardPhoto(lastMsg.from);
    }
  }, [lastMsg]);

  const getCardPhoto = async (id) => {
    const details = await getUserDetails(id);
    setLastPhoto(details.photoURL);
  };

  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => openChat(chatDoc)}
    >
      {lastMsg && (
        <>
          <Avatar.Image
            source={
              lastPhoto
                ? { uri: lastPhoto }
                : require("../../../assets/favicon.png")
            }
          />
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
