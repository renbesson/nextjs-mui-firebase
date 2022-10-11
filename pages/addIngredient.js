import { useState } from "react";
import { useUser } from "../customHooks/userContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CustomSnackbar from "../components/CustomSnackbar";

import { doc, setDoc } from "firebase/firestore";

import { customAlphabet } from "nanoid";
import { firestore, storage } from "../lib/firebase";
import { Input } from "@mui/material";
import FileInput from "../components/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const nanoid = customAlphabet("0123456789", 6);

const initialValue = {
  name: "",
  weight: "",
  volume: "",
  price: "",
};

export default function AddIngredient() {
  const { loadingUser, user } = useUser();
  const [newUid, setNewUid] = useState(nanoid());
  const [ingredient, setIngredient] = useState(initialValue);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: null,
  });
  const [imageFromChild, setImageFromChild] = useState(null);

  const addImg = async () => {
    let urlVar;
    const imgRef = ref(storage, `users/${user.uid}/ingredients/${newUid}.jpg`);
    await uploadBytes(imgRef, imageFromChild);
    await getDownloadURL(imgRef)
      .then((url) => {
        urlVar = url;
      })
      .catch((error) => {
        console.error(error);
      });
    return urlVar;
  };

  const addDoc = async (url) => {
    const docRef = doc(firestore, `users/${user.uid}/ingredients`, newUid);
    await setDoc(docRef, { ...ingredient, imgURL: url });
    await setIngredient(initialValue);
    setImageFromChild(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (imageFromChild)
        await addImg().then((url) => {
          addDoc(url);
        });
      else await addDoc("none");
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: `Error adding "${error.message}"!`,
        severity: "error",
      });
    } finally {
      setSnackbar({
        isOpen: true,
        message: `Ingredient "${ingredient.name}" Added!`,
        severity: "success",
      });
    }
  };

  return (
    <>
      <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Ingredient
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={ingredient.name}
              onChange={(e) =>
                setIngredient((prevIngredient) => ({
                  ...prevIngredient,
                  name: e.target.value,
                }))
              }
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              value={ingredient.weight}
              onChange={(e) =>
                setIngredient((prevIngredient) => ({
                  ...prevIngredient,
                  weight: e.target.value,
                }))
              }
              margin="normal"
              required
              fullWidth
              name="weight"
              label="Weight"
              id="weight"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              autoComplete="weight"
            />
            <TextField
              value={ingredient.volume}
              onChange={(e) =>
                setIngredient((prevIngredient) => ({
                  ...prevIngredient,
                  volume: e.target.value,
                }))
              }
              margin="normal"
              required
              fullWidth
              name="volume"
              label="Volume"
              id="volume"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              autoComplete="volume"
            />
            <TextField
              value={ingredient.price}
              onChange={(e) =>
                setIngredient((prevIngredient) => ({
                  ...prevIngredient,
                  price: e.target.value,
                }))
              }
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              id="price"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              autoComplete="price"
            />
            <FileInput setImageFromChild={setImageFromChild} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
