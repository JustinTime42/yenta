import React, { useContext, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Portal } from "react-native-paper";
import { cameraStyles } from "./cameraStyles";
import { Camera, CameraType, CameraPictureOptions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PrimaryButton } from "../buttons";
import { uploadProfilePhoto } from "../../services/storage";
import { UserContext } from "../../contexts/user.context";
import { LoadingContext } from "../../contexts/loading.context";

const CameraScreen = ({ uploadMedia, onClose }) => {
  const { currentUser } = useContext(UserContext);
  const [cameraType, setCameraType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [image, setImage] = useState(null);

  const cameraRef = useRef();

  const toggleCameraType = () => {
    setCameraType(() =>
      cameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (!permission) {
    // Loading
    return <View />;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 0.5,
        base64: true,
        skipProcessing: true,
      };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(Object.keys(data));
      if (data) {
        await cameraRef.current.pausePreview();
        setImage(data.uri);
      }
    }
  };

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={cameraStyles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <PrimaryButton onPress={requestPermission}>
          "grant permission"
        </PrimaryButton>
      </View>
    );
  }

  return (
    <Portal style={cameraStyles.container}>
      <Camera ref={cameraRef} style={cameraStyles.camera} type={cameraType}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name={"close-circle-outline"} size={64} />
        </TouchableOpacity>
        <TouchableOpacity
          style={cameraStyles.flipButton}
          onPress={toggleCameraType}
        >
          <Ionicons name={"camera-reverse-outline"} size={64} />
        </TouchableOpacity>
        {image ? (
          <TouchableOpacity
            style={cameraStyles.cameraButton}
            onPress={() => uploadMedia(image, "photoURL")}
          >
            <Ionicons name={"cloud-upload"} size={64} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={cameraStyles.cameraButton}
            onPress={takePicture}
          >
            <Ionicons name={"camera-outline"} size={64} />
          </TouchableOpacity>
        )}
      </Camera>
    </Portal>
  );
};

export default CameraScreen;
