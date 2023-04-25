import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import React, { useContext, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../contexts/user.context";
import { createNewMessageThread } from "../messages/utils";

const MatchCard = ({ navigation, profile, onClose }) => {
  const { currentUser } = useContext(UserContext);
  const videoRef = useRef(null);

  const pressMessage = () => {
    const chat = createNewMessageThread(currentUser, profile);
    navigation.navigate("Messages", {
      screen: "Chat",
      params: { chatDoc: { ...chat, path: `messages/${chat.id}` } },
    });
    onClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressMessage} style={styles.mailIcon}>
        <Ionicons name="mail" color="blue" size={64} />
      </TouchableOpacity>
      <Video
        resizeMode="contain"
        ref={videoRef}
        style={styles.video}
        source={{
          uri: profile.videoUrl,
        }}
        useNativeControls
        isLooping
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    backgroundColor: "white",
  },
  video: {
    flex: 1,
    height: 500,
  },
  mailIcon: {
    position: "absolute",
    top: 15,
    right: 55,
    zIndex: 1,
  },
});

export default MatchCard;
