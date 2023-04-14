import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { collection, addDoc, updateDoc, arrayUnion, doc } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import CameraScreen from "./camera/CameraScreen";
import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { PrimaryButton } from "./buttons";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ImageEditor = ({ uploadMedia }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImageAsync}>
        <Ionicons name={"folder-outline"} size={64} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowCamera(true)}>
        <Ionicons name={"camera-outline"} size={64} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={image}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        <PrimaryButton onPress={() => uploadMedia(image)}>Save</PrimaryButton>
      </View>
      {showCamera && (
        <CameraScreen
          uploadMedia={uploadMedia}
          hideCamera={() => setShowCamera(false)}
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
  },
  button: {
    position: "absolute",
  },
  imageContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
