import { auth, firestore, storage } from "/lib/firebase";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUser } from "/customHooks/userContext";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CustomSnackbar from "/components/CustomSnackbar";
import { updateEmail, updateProfile } from "firebase/auth";

export default function UpdateUsername() {
  const [newDoc, setNewDoc] = useState({ username: "", email: "" });
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const updateUsername = async (data) => {
    try {
      if (data !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName: data });
        setNewDoc((prevNewDoc) => ({
          ...prevNewDoc,
          username: "",
        }));
        setSnackbar({
          isOpen: true,
          message: `Username updated!`,
          severity: "success",
        });
      } else {
        setSnackbar({
          isOpen: true,
          message: `Please enter a different username.`,
          severity: "warning",
        });
      }
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: `Please submit a valid username and different from the current one. ${error.message}`,
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
        <TextField
          value={newDoc.username}
          onChange={(e) =>
            setNewDoc((prevNewDoc) => ({
              ...prevNewDoc,
              username: e.target.value,
            }))
          }
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <Button
          variant="contained"
          fullWidth
          disabled={newDoc.username === ""}
          onClick={() => updateUsername(newDoc.username)}
        >
          Update Username
        </Button>
      </Box>
    </>
  );
}
