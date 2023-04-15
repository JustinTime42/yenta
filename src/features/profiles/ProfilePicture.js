import React, { useContext, useState } from "react";
import { db } from "../../services/firestore";
import { ProfileContext } from "../../contexts/profile.context";
import { uploadMedia } from "../../services/storage";
import ImageEditor from "../../components/ImageEditor";
import { doc, updateDoc } from "firebase/firestore";

const ProfilePicture = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const { currentProfile } = useContext(ProfileContext);

  const onSave = async (img) => {
    setImage(img);
    const url = await uploadMedia(img, `profiles/${currentProfile}/`);
    await updateDoc(doc(db, "profiles", currentProfile), {
      photoUrl: url,
    });
    navigation.navigate("ProfileVideo");
  };

  return <ImageEditor uploadMedia={onSave} />;
};

export default ProfilePicture;
