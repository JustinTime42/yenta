import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firestore";
import { Card, Portal, Text } from "react-native-paper";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PrimaryButton } from "../../components/buttons";
import Feed from "../feed/Feed";

const ProfileCard = ({ profile, showProfileEditor }) => {
  const [details, setDetails] = useState(null);
  const [showFeed, setShowFeed] = useState(false);

  useEffect(() => {
    console.log("Profile: ", profile);
    const unsub = onSnapshot(doc(db, "profiles", profile), (res) => {
      console.log(res.data());
      setDetails(res.data());
    });
    return unsub;
  }, [profile]);

  return (
    <View>
      <Text style={styles.text}>{details?.firstName}</Text>
      <TouchableOpacity style={styles.editButton}>
        <PrimaryButton onPress={() => showProfileEditor(profile)}>
          Edit
        </PrimaryButton>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowFeed(true)}>
        <Image
          style={styles.image}
          source={details?.photoUrl}
          contentFit="cover"
          transition={1000}
        />
      </TouchableOpacity>
      {showFeed && <Feed onClose={() => setShowFeed(false)} />}
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  text: {
    position: "absolute",
  },
  editButton: {
    alignSelf: "flex-end",
  },
  image: {
    width: "100%",
    backgroundColor: "#0553",
    height: 400,
  },
});
