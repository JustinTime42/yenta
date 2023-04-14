import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import ImageEditor from "../../components/ImageEditor";

const ProfileEditor = () => {
  const [name, setName] = useState("");
  const [video, setVideo] = useState(null);


  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="First Name" />
      <ImageEditor />
    </View>
  );
};

export default ProfileEditor;
