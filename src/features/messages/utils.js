import { collection, addDoc, getDoc } from "firebase/firestore";
import { db } from "../../services/firestore";

export const createNewMessageThread = async (currentUser, profile) => {
  //get the profile
  // const profileSnap = await getDoc(db, "profiles", profileId);
  // const profile = profileSnap.data();
  const threadData = {
    members: [currentUser.uid, profile.account.userId],
    [currentUser.uid]: {
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
    },
    [profile.account.userId]: {
      displayName: profile.account.displayName,
      photoURL: profile.account.photoURL,
    },
  };
  return await addDoc(collection(db, "messages"), threadData);
  // console.log("New Message Thread: ", docRef.path);
  // return docRef;
};

export const openChat = (navigation, chatDoc) => {
  navigation.navigate("Chat", { chatDoc: chatDoc });
};
