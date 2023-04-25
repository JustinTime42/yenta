import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../services/firestore";

export const createNewProfile = async (user) => {
  const profileDocRef = await addDoc(collection(db, "profiles"), {
    name: "",
    account: {
      userId: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
    },
  });
  console.log("profileDocRef: ", profileDocRef);
  await setDoc(
    doc(db, "users", user.uid),
    {
      profiles: arrayUnion(profileDocRef.id),
    },
    { merge: true }
  );
  return profileDocRef.id;
};

export const updateProfile = async (details) => {
  const { id, ...newDetails } = details;
  const profileRef = doc(db, "profiles", id);
  await updateDoc(profileRef, { ...newDetails });
  return id;
};
