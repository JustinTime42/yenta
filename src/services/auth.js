import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

const handleSignup = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential;
    })
    .catch((error) => {
      return error;
    });
};

const handleLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential;
    })
    .catch((error) => {
      console.log("firebase error: ", error);
      throw error.message;
    });
};

const handleSignOut = () => {
  console.log("trying to sign out");
  return signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      throw error;
    });
};

const handleUpdateProfile = (userDetails) => {
  return updateProfile(auth.currentUser, userDetails)
    .then((result) => {
      console.log("update", auth.currentUser);
      return "Profile Updated";
    })
    .catch((error) => {
      throw error;
    });
};

export { auth, handleLogin, handleSignup, handleSignOut, handleUpdateProfile };
