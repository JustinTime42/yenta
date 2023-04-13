import React, { useContext, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { Camera, CameraType, CameraPictureOptions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PrimaryButton } from "../buttons";
import { uploadProfilePhoto } from "../../services/storage";
import { UserContext } from "../../contexts/user.context";
import { LoadingContext } from "../../contexts/loading.context";

const CameraScreen = ({ navigation, icon, uploadMedia }) => {
  const { currentUser } = useContext(UserContext);
  const [cameraType, setCameraType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [image, setImage] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);
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
        setImage(data);
      }
    }
  };

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
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
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={cameraType}>
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
          <Ionicons name={"camera-reverse-outline"} size={64} />
        </TouchableOpacity>
        {image ? (
          <TouchableOpacity style={styles.cameraButton} onPress={uploadMedia}>
            <Ionicons name={"cloud-upload"} size={64} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <Ionicons name={icon} size={64} />
          </TouchableOpacity>
        )}
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
  camera: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  flipButton: {
    position: "absolute",
    right: 5,
    bottom: 5,
  },
  cameraButton: {
    marginRight: "auto",
    marginLeft: "auto",
  },
});

export default CameraScreen;
