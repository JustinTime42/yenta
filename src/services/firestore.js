import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

const addAndReturnDoc = async (doc, path) => {
  const docRef = await addDoc(collection(db, path), {
    name: "Tokyo",
    country: "Japan",
  });
  return docRef;
};

export { addAndReturnDoc, db };
