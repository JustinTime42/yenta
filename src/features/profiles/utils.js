import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../services/firestore";

export const onSaveNewProfile = async (details, userId) => {
  console.log(details);
  console.log(userId);
  const profileDocRef = await addDoc(collection(db, "profiles"), details);
  await setDoc(
    doc(db, "users", userId),
    {
      profiles: arrayUnion(profileDocRef.id),
    },
    { merge: true }
  );
  return profileDocRef.id;
};
