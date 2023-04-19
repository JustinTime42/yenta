import React, { useState, useEffect, useContext, useRef } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Portal, TextInput } from "react-native-paper";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firestore";
import ImageEditor from "../../components/ImageEditor";
import { PrimaryButton } from "../../components/buttons";
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
  const videoRef = React.useRef(null);
  // const [image, setImage] = useState(null);
  // const [video, setVideo] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "profiles", currentProfile), (res) => {
      setProfileDetails({ ...res.data(), id: res.id });
    });
    return unsub;
  }, [currentProfile]);

  //move the save functionality from profilepic and video here
  // I'm making the profile thing a one page deal for now.
  //might make a second page for the likes/dislikes but not sure
  const handleSaveMedia = async (media, field) => {
    const url = await uploadMedia(
      media,
      `profiles/${currentProfile}/${field.split("U")[0]}`
    );
    updateProfile({ id: currentProfile, [field]: url });
  };

  const onSave = (details, next) => {
    console.log(details);
    updateProfile({ firstName: name, id: currentProfile });
  };

  const onStartCamera = () => {
    setIsCameraOpen(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* change this. make a Text visible if not editing, TextInput if editting */}
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={profileDetails.firstName || "First Name"}
      />
      <PrimaryButton onPress={onSave}>Save</PrimaryButton>
      <ImageEditor
        uploadMedia={handleSaveMedia}
        img={profileDetails.photoUrl}
      />
      <TouchableOpacity onPress={() => setIsVideoCameraOpen(true)}>
        <Avatar.Icon size={64} color="red" />
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
    height: "80%",
    overflow: "scroll",
  },
  video: {
    height: 300,
    width: "100%",
  },
});

export default ProfileEditor;
