import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../services/auth";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Snackbar, TextInput, Avatar } from "react-native-paper";
import { Camera, CameraType } from "expo-camera";
import { UserContext } from "../../contexts/user.context";
import { handleUpdateProfile, handleSignOut } from "../../services/auth";

import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PrimaryButton, SecondaryButton } from "../../components/buttons";
import { useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import UserPhoto from "./UserPhoto";
import CameraScreen from "../../components/camera/CameraScreen";
import { LoadingContext } from "../../contexts/loading.context";
import { uploadProfilePhoto } from "../../services/storage";
import ImageEditor from "../../components/ImageEditor";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firestore";
// import CameraScreen from "./CameraScreen";

const Account = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isEditting, setIsEditting] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  //const [photoURL, setPhotoURL] = useState(currentUser.photoURL);

  const [snackText, setSnackText] = useState("");
  const theme = useTheme();

  const CameraButton = styled(Avatar.Icon)`
    width: 128px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 5px;
  `;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUser.uid), (res) => {
      const data = res.data();
      setPhotoURL(data.photoURL);
      setDisplayName(data.displayName);
    });
    return unsub;
  }, [currentUser]);

  const updateProfile = () => {
    const userDetails = {
      displayName: displayName,
    };
    handleUpdateProfile(userDetails)
      .then((res) => {
        auth.getInstance().getCurrentUser().reload();
        setSnackText(res);
        setIsEditting(false);
      })
      .catch((err) => setSnackText(err));
  };

  const onSaveImage = (image) => {
    setIsLoading(true);
    uploadProfilePhoto(currentUser, image).then((res) => {
      setIsLoading(false);
      setShowCamera(false);
      setIsEditting(false);
    });
  };

  const EditSettings = styled.View`
    align-items: flex-end;
  `;

  return (
    <View>
      <PrimaryButton onPress={handleSignOut}>Log out</PrimaryButton>
      <Button onPress={() => setIsEditting((a) => !a)}>
        {isEditting ? "Cancel" : "Edit"}
      </Button>
      {isEditting ? (
        <ImageEditor uploadMedia={onSaveImage} />
      ) : (
        <UserPhoto src={photoURL} />
      )}
      {isEditting ? (
        <>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Display Name"
          />
          <SecondaryButton onPress={updateProfile}>
            Save Changes
          </SecondaryButton>
        </>
      ) : (
        <Text>Hi {currentUser.displayName}</Text>
      )}
      <Snackbar visible={snackText} onDismiss={() => setSnackText("")}>
        {snackText}
      </Snackbar>
    </View>
  );
};

export default Account;
