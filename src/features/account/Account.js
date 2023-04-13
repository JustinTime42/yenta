import React, { useContext, useState, useEffect } from "react";
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
import ProfilePhoto from "./ProfilePhoto";
// import CameraScreen from "./CameraScreen";

const Account = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [isEditting, setIsEditting] = useState(false);
  //const [photoURL, setPhotoURL] = useState(currentUser.photoURL); 

  const [snackText, setSnackText] = useState("");
  const theme = useTheme();

  const CameraButton = styled(Avatar.Icon)`
    width: 128px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 5px;
  `;

  useFocusEffect(
    React.useCallback(() => {
      setIsEditting(false);
      return () => {
        setIsEditting(false);
      };
    }, [])
  );

  useEffect(() => {
    console.log("photoURL: ", currentUser.photoURL);
  }, [currentUser.photoURL, currentUser.displayName]);

  const updateProfile = () => {
    const userDetails = {
      displayName: displayName,
    };
    handleUpdateProfile(userDetails)
      .then((res) => {
        setSnackText(res);
        setIsEditting(false);
      })
      .catch((err) => setSnackText(err));
  };

  const EditSettings = styled.View`
    align-items: flex-end;
  `;

  const navToCamera = () => {
    console.log("navigating to camera");
    navigation.navigate("Camera");
  };
  // Updating profile pic means take the picture, upload it to google storage
  // then retrieve the URL, send the URL to the updateProfile
  // I've started adding the expo camera component. need to figure out props and such
  return (
    <View>
      <EditSettings>
      <Button onPress={handleSignOut}>Log out</Button>
        <SecondaryButton onPress={() => setIsEditting((a) => !a)}>
          {isEditting ? "Cancel" : "Edit"}
        </SecondaryButton>
      </EditSettings>
      {isEditting ? (
        <TouchableOpacity onPress={navToCamera}>
          <CameraButton size={128} icon="camera" />
        </TouchableOpacity>
      ) : (
        <ProfilePhoto src={currentUser.photoURL} />
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
