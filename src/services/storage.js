import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase";
import { Platform } from "react-native";
import { handleUpdateProfile } from "./auth";

const storage = getStorage(app);

const uploadProfilePhoto = async (user, image) => {
  const metadata = {
    contentType: "image/jpeg",
  };

  const uri =
    Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri;
  const response = await fetch(uri);
  const blobFile = await response.blob();

  const filename = uri.substring(uri.lastIndexOf("/") + 1);
  const imageRef = ref(storage, `users/${user.uid}/profile/${filename}`);
  return uploadBytes(imageRef, blobFile, metadata)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("url:", url.split("?")[0]);
        handleUpdateProfile({ photoURL: url });
        return url;
      });
    })
    .catch((error) => {
      return error;
    });
};
export { storage, uploadProfilePhoto };
