import { auth, storage } from "/lib/firebase";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUser } from "/customHooks/userContext";
import Box from "@mui/material/Box";
import FileInput from "/components/FileInput";
import CustomSnackbar from "/components/CustomSnackbar";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function UpdateUserPhoto({ drawer, clearDrawers }) {
  const { loadingUser, user } = useUser();
  const [imageFromChild, setImageFromChild] = useState(null);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const updateUserPhotoURL = async (path, file) => {
    let url = "";

    try {
      const fileName = `${user.uid}.${file.name.split(".").pop()}`; // Concatenates firebase ID + file extension
      const fullPath = `${path}/${fileName}`;
      const fileRef = ref(storage, fullPath);

      // Upload the file to fireStorage
      await uploadBytes(fileRef, file);

      // Gets the URL for the file and stores in the "eurl" variable
      await getDownloadURL(fileRef).then((eurl) => (url = eurl));

      // Updates the photo URL in the user's profile in fire auth
      await updateProfile(auth.currentUser, { photoURL: url });

      // Resets the form by deleting the uploaded file from cache
      setImageFromChild(null);

      setSnackbar({
        isOpen: true,
        message: `Photo updated!`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: `Error uploading file: ${error.message}`,
        severity: "error",
      });
    }
  };

  return (
    <>
      <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <Box
        component="form"
        noValidate
        sx={{ mt: 2, p: 2, border: "2px solid", borderRadius: 5 }}
      >
        <FileInput setImageFromChild={setImageFromChild} />
        <Button
          variant="contained"
          fullWidth
          disabled={!imageFromChild}
          onClick={() =>
            updateUserPhotoURL(
              process.env.NEXT_PUBLIC_PHOTOS_FOLDER,
              imageFromChild
            )
          }
        >
          Update Photo
        </Button>
      </Box>
    </>
  );
}
