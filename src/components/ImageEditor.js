import React, { useState, useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraScreen from "./camera/CameraScreen";
import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { PrimaryButton } from "./buttons";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ImageEditor = ({ uploadMedia, img }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(img);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    uploadMedia(result.assets[0].uri, "photoURL")
    //setImage(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImageAsync}>
          <Ionicons name={"folder-outline"} size={64} />
          <Text>Upload Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowCamera(true)}>
          <Ionicons name={"camera-outline"} size={64} />
          <Text>Take Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={img}
          contentFit="cover"
          transition={1000}
        />
      </View>
      {showCamera && (
        <CameraScreen
          mode="camera"
          uploadMedia={uploadMedia}
          onClose={() => setShowCamera(false)}
        />
      )}
    </View>
  );
};

export default ImageEditor;

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  image: {
    width: "100%",
    backgroundColor: "#0553",
    height: 300,
  },
  button: {
    position: "absolute",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  imageContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
