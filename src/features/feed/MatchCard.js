import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import React, {useRef} from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const MatchCard = ({ profile }) => {
  const videoRef = useRef(null);
  return (
    <TouchableOpacity style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{
          uri: profile.videoUrl,
        }}
        useNativeControls
        isLooping
      />
      {/* <Image
        style={{ height: 400, width: "100%" }}
        source={{ uri: profile.photoUrl }}
      /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    backgroundColor: "white"
  },
  video: {
    flex: 1,
    height: 600,
  },
});

export default MatchCard;
