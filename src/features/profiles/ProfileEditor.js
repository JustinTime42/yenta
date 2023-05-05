import React, { useState, useEffect, useContext, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Dialog, Portal, TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { doc, onSnapshot } from "firebase/firestore";
import { db, deleteProfile } from "../../services/firestore";
import ImageEditor from "../../components/ImageEditor";
import { DangerButton, PrimaryButton } from "../../components/buttons";
import { ProfileContext } from "../../contexts/profile.context";
import { uploadMedia } from "../../services/storage";
import { updateProfile } from "./utils";
import { cameraStyles } from "../../components/camera/cameraStyles";
import VideoScreen from "../../components/camera/VideoScreen";
import { Video, ResizeMode } from "expo-av";

const ProfileEditor = () => {
  const { currentProfile } = useContext(ProfileContext);
  const [profileDetails, setProfileDetails] = useState({});
  const [name, setName] = useState(profileDetails.firstName || "");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isVideoCameraOpen, setIsVideoCameraOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const videoRef = React.useRef(null);
  // const [image, setImage] = useState(null);
  // const [video, setVideo] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "profiles", currentProfile), (res) => {
      console.log("RES", res.data());
      setProfileDetails({ ...res.data(), id: res.id });
    });
    return unsub;
  }, [currentProfile]);

  useEffect(() => {
    console.log(profileDetails);
  }, [profileDetails]);
  //move the save functionality from profilepic and video here
  // I'm making the profile thing a one page deal for now.
  //might make a second page for the likes/dislikes but not sure
  const handleSaveMedia = async (media, field) => {
    const url = await uploadMedia(
      media,
      `profiles/${currentProfile}/${field.split("U")[0]}`
    );
    updateProfile({ id: currentProfile, [field]: url });
    setIsCameraOpen(false);
  };

  const onSave = (details, next) => {
    console.log(details);
    updateProfile({ ...profileDetails });
  };

  const onStartCamera = () => {
    setIsCameraOpen(true);
  };

  const onDeletePress = () => {
    deleteProfile(profileDetails);
    setShowDelete(false);
  };

  const setFirstName = (value) => {
    console.log("EVENT: ", value);
    setProfileDetails((details) => {
      return { ...details, firstName: value };
    });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      {/* change this. make a Text visible if not editing, TextInput if editting */}
      <View style={styles.nameContainer}>
        <TextInput
          style={styles.nameField}
          value={profileDetails.firstName}
          onChangeText={setFirstName}
        />
        <PrimaryButton style={styles.saveButton} onPress={onSave}>
          Save
        </PrimaryButton>
      </View>

      <ImageEditor
        uploadMedia={handleSaveMedia}
        img={profileDetails.photoURL}
      />
      <TouchableOpacity
        style={styles.videoButton}
        onPress={() => setIsVideoCameraOpen(true)}
      >
        <Text style={styles.videoText}>Take Video</Text>
        <Ionicons name="videocam" size={64} color="blue" />
      </TouchableOpacity>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{
          uri: profileDetails.videoUrl,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
      <DangerButton onPress={() => setShowDelete(true)}>
        Delete This Profile
      </DangerButton>
      <Dialog visible={showDelete} onDismiss={() => setShowDelete(false)}>
        <Dialog.Title>Delete Profile?</Dialog.Title>
        <Dialog.Content>
          <Text>
            Are you sure you want to delete the profile for{" "}
            {profileDetails.firstName}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <PrimaryButton onPress={() => setShowDelete(false)}>
            Cancel
          </PrimaryButton>
          <PrimaryButton onPress={onDeletePress}>
            Delete This Profile
          </PrimaryButton>
        </Dialog.Actions>
      </Dialog>
      {isVideoCameraOpen && (
        <Portal style={cameraStyles.container}>
          <VideoScreen
            onSave={handleSaveMedia}
            setIsVideoCameraOpen={setIsVideoCameraOpen}
          />
        </Portal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
  },
  video: {
    height: 300,
    width: "100%",
  },
  nameContainer: {
    flexDirection: "row",
    alignContent: "center",
  },
  saveButton: {
    flex: 1,
  },
  nameField: {
    flex: 5,
  },
  videoButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  videoText: {
    fontWeight: "bold",
    color: "blue",
  },
});

export default ProfileEditor;
