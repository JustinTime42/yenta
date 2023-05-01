import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

const addAndReturnDoc = async (doc, path) => {
  const docRef = await addDoc(collection(db, path), {
    name: "Tokyo",
    country: "Japan",
  });
  return docRef;
};

const updateUser = async (userDetails = {}) => {
  const { uid, ...details } = userDetails;
  console.log("User Details: ", details);
  try {
    await setDoc(doc(db, "users", uid), details, { merge: true });
  } catch (err) {
    console.log(err);
  }
};

const deleteProfile = async (profile) => {
  try {
    await deleteDoc(doc(db, "profiles", profile.id));
    await updateDoc(doc(db, "users", profile.account.userId), {
      profiles: arrayRemove(profile.id),
    });
  } catch (err) {
    console.log(err);
  }

};

export { addAndReturnDoc, db, updateUser, deleteProfile };
