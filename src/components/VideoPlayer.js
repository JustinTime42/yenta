import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";

const VideoPlayer = ({ src }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: src,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 200,
  }


});

export default VideoPlayer;
