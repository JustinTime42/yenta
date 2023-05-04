import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firestore";

export const createNewMessageThread = async (currentUser, profile) => {
  const threadData = {
    members: [currentUser.uid, profile.account.userId],
    // [currentUser.uid]: {
    //   displayName: currentUser.displayName,
    //   photoURL: currentUser.photoURL,
    // },
    // [profile.account.userId]: {
    //   displayName: profile.account.displayName,
    //   photoURL: profile.account.photoURL,
    // },
  };
  return await addDoc(collection(db, "messages"), threadData);
};

export const openChat = (navigation, chatDoc) => {
  navigation.navigate("Chat", { chatDoc: chatDoc });
};

export const getUserDetails = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), uid: id };
  } else {
    console.log("No such document!");
  }
};

export const getMembers = async (id) => {
  const promises = [];
  const docRef = doc(db, "messages", id);
  const docSnap = await getDoc(docRef);
  docSnap.data().members.forEach(async (member) => {
    promises.push(getUserDetails(member));
  });
  return Promise.all(promises).then((results) => {
    return results;
  });
};
