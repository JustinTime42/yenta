import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase";
import { Platform } from "react-native";
import { handleUpdateProfile } from "./auth";

const storage = getStorage(app);

const uploadProfilePhoto = async (user, image) => {
  const metadata = {
    contentType: "image/jpeg",
  };

  const uri = Platform.OS === "ios" ? image.replace("file://", "") : image;
  const response = await fetch(uri);
  const blobFile = await response.blob();

  const filename = uri.substring(uri.lastIndexOf("/") + 1);
  const imageRef = ref(storage, `users/${user.uid}/profile/${filename}`);
  uploadBytes(imageRef, blobFile, metadata)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        handleUpdateProfile({ photoURL: url });
        return url;
      });
    })
    .catch((error) => {
      return error;
    });
};

const uploadMedia = async (mediaUrl, path) => {
  const uri =
    Platform.OS === "ios" ? mediaUrl.replace("file://", "") : mediaUrl;
  const response = await fetch(uri);
  const blobFile = await response.blob();
  const filename = uri.substring(uri.lastIndexOf("/") + 1);
  const mediaRef = ref(storage, `${path}/${filename}`);
  const snapshot = await uploadBytes(mediaRef, blobFile);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
export { storage, uploadProfilePhoto, uploadMedia };
