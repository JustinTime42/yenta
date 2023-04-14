import React, { useContext, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { collection, addDoc, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db } from "../../services/firestore";
import { PrimaryButton } from "../../components/buttons";
import { ProfileContext } from "../../contexts/profile.context";
import { uploadMedia } from "../../services/storage";
import ImageEditor from "../../components/ImageEditor";

const ProfilePicture = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const { currentProfile } = useContext(ProfileContext);

  const onSave = async (img) => {
    setImage(img);
    const url = await uploadMedia(img, `profiles/${currentProfile}/`);
    await updateDoc(doc(db, "profiles", currentProfile), {
      videoUrl: arrayUnion(url),
    });
  };

  return <ImageEditor uploadMedia={onSave} />;
};

export default ProfilePicture;
