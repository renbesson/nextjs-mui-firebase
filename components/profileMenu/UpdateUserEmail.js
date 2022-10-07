import { auth } from "/lib/firebase";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUser } from "/customHooks/userContext";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CustomSnackbar from "/components/CustomSnackbar";
import { updateEmail } from "firebase/auth";

export default function UpdateUserEmail({ drawer, clearDrawers }) {
  const { loadingUser, user } = useUser();
  const [newDoc, setNewDoc] = useState({ username: "", email: "" });
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const updateEmailAddress = async (data) => {
    try {
      if (data !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, data);
        setNewDoc((prevNewDoc) => ({
          ...prevNewDoc,
          email: "",
        }));
        setSnackbar({
          isOpen: true,
          message: `Email address updated!`,
          severity: "success",
        });
      } else {
        setSnackbar({
          isOpen: true,
          message: `Please enter a different email address.`,
          severity: "warning",
        });
      }
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: `Please submit a valid email and different from the current one. ${error.message}`,
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
          value={newDoc.email}
          onChange={(e) =>
            setNewDoc((prevNewDoc) => ({
              ...prevNewDoc,
              email: e.target.value,
            }))
          }
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email"
          id="email"
          autoComplete="email"
        />
        <Button
          variant="contained"
          fullWidth
          disabled={newDoc.email === ""}
          onClick={() => updateEmailAddress(newDoc.email)}
        >
          Update Email
        </Button>
      </Box>
    </>
  );
}
