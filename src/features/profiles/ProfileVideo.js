import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TextInput, Avatar, Portal } from "react-native-paper";
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
import { uploadMedia } from "../../services/storage";
import ImageEditor from "../../components/ImageEditor";
import CameraScreen from "../../components/camera/CameraScreen";
import VideoScreen from "../../components/camera/VideoScreen";
import { cameraStyles } from "../../components/camera/cameraStyles";

const ProfileVideo = ({ navigation, uploadMedia }) => {
  const [video, setVideo] = useState(null);
  const [isVideoCameraOpen, setIsVideoCameraOpen] = useState(false);
  const { currentProfile } = useContext(ProfileContext);

  const onSave = async (img) => {
    //setVideo(img);
    const url = await uploadMedia(img, `profiles/${currentProfile}/`);
    await updateDoc(doc(db, "profiles", currentProfile), {
      videoUrl: url,
    });
  };

  const onStartCamera = () => {
    setIsVideoCameraOpen(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={onStartCamera}>
        <Avatar.Icon size={64} color={"red"} />
      </TouchableOpacity>
      {isVideoCameraOpen && (
        <Portal style={cameraStyles.container}>
          <VideoScreen onSave={onSave} setIsVideoCameraOpen={setIsVideoCameraOpen} />
        </Portal>
      )}
    </View>
  );
};

export default ProfileVideo;
