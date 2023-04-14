import { StyleSheet } from "react-native";

export const cameraStyles = StyleSheet.create({
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
