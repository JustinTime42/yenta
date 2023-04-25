import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
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
  console.log("User Details: ", userDetails);
  await setDoc(doc(db, "users", uid), details, { merge: true });
};

export { addAndReturnDoc, db, updateUser };
