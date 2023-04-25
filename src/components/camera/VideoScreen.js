import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { cameraStyles } from "./cameraStyles";
import { PrimaryButton } from "../buttons";
import { uploadMedia } from "../../services/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firestore";

const VideoScreen = ({ navigation, onSave, onClose, setIsVideoCameraOpen }) => {
  const [videoPermission, requestVideoPermission] =
    Camera.useCameraPermissions();
  const [audioPermission, requestAudioPermission] =
    Camera.useMicrophonePermissions();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const cameraRef = useRef();

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const onUpload = () => {
    onSave(videoSource, "videoUrl");
    setIsVideoCameraOpen(false)
    // const url = await uploadMedia(videoSource, `profiles/${currentProfile}/`);
    // await updateDoc(doc(db, "profiles", currentProfile), {
    //   videoUrl: url,
    // });
    // navigation.navigate("ProfileVideo");
  };

  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        const videoRecordPromise = cameraRef.current.recordAsync();
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          const data = await videoRecordPromise;
          const source = data.uri;
          if (source) {
            setIsPreview(true);
            console.log("video source", source);
            setVideoSource(source);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  const stopVideoRecording = () => {
    if (cameraRef.current) {
      setIsPreview(false);
      setIsVideoRecording(false);
      cameraRef.current.stopRecording();
    }
  };
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
  };
  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
      <View
        style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
      />
    </TouchableOpacity>
  );

  const renderUploadButton = () => {
    <View style={styles.control}>
      <TouchableOpacity onPress={onSave}>
        <Ionicons name={"cloud-upload"} size={256} />
      </TouchableOpacity>
    </View>;
  };

  const renderVideoPlayer = () => (
    <Video
      source={{ uri: videoSource }}
      shouldPlay={true}
      style={styles.media}
    />
  );
  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{"Recording..."}</Text>
    </View>
  );
  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={isVideoRecording} onPress={() => setIsVideoCameraOpen(false)}>
        <Ionicons name={"close"} size={64} />
      </TouchableOpacity>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Ionicons name={"camera-reverse-outline"} size={64} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={!isVideoRecording ? !videoSource ? recordVideo : onUpload : stopVideoRecording}
      >
        <Ionicons
          size={64}
          name={
            !isVideoRecording ? !videoSource ? "play-circle-outline" : "cloud-upload" : "stop-circle-outline"
          }
        />
      </TouchableOpacity>
    </View>
  );
  const requestPermission = () => {
    requestAudioPermission();
    requestVideoPermission();
  };
  if (!audioPermission?.granted || !videoPermission?.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <View style={cameraStyles.container}>
          <Text style={{ textAlign: "center" }}>
            We need your permission to show the camera
          </Text>
          <PrimaryButton onPress={requestPermission}>
            "grant permission for camera"
          </PrimaryButton>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.on}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("cammera error", error);
        }}
      />
      <View style={styles.container}>
        {renderUploadButton()}
        {isVideoRecording && renderVideoRecordIndicator()}
        {/* {videoSource && renderVideoPlayer()} */}
        {/* {isPreview && renderCancelPreviewButton()} */}
        {renderCaptureControl()}
      </View>
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: 128,
    width: 128,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "30%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  upload: {
    flexDirection: "row",
    bottom: 68,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "blue",
    borderRadius: 64,
    height: 64,
    width: 64,
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
});
