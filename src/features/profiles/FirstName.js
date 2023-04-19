import React, { useContext, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "../../services/firestore";
import { PrimaryButton } from "../../components/buttons";
import { ProfileContext } from "../../contexts/profile.context";
import { UserContext } from "../../contexts/user.context";
import { onSaveNewProfile } from "./utils";

const FirstName = ({ navigation, profile, onSave }) => {
  const { setCurrentProfile, currentProfile } = useContext(ProfileContext);
  const { currentUser } = useContext(UserContext);
  const [name, setName] = useState("");





  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="First Name" />
      <PrimaryButton onPress={onSave}>Save</PrimaryButton>
    </View>
  );
};

export default FirstName;
