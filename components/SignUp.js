import { useState, useContext } from "react";
import { auth, firestore } from "../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useUser } from "../customHooks/userContext";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { doc, setDoc } from "firebase/firestore";
import CustomSnackbar from "./CustomSnackbar";
import { useRouter } from "next/router";

export default function SignUpDrawer({
  drawer,
  toggleDrawers,
  clearDrawers,
  setSnackbar,
}) {
  const { loadingUser, user } = useUser();

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser();
  };

  const createUser = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        clearDrawers();
        updateProfile(auth.currentUser, {
          displayName: `${name}`,
          photoURL: "https://i.pravatar.cc/300",
        });
        const userObj = {
          uid: res.user.uid,
          displayName: `${name}`,
          email: res.user.email,
          phoneNumber: "",
          shoppingLists: [],
          cart: [],
          orders: [],
          addresses: [],
        };
        setDoc(doc(firestore, "users", res.user.uid), userObj);
        setSnackbar({
          isOpen: true,
          message: `User "${name}" has been created successfully wth the email "${res.user.email}".`,
          severity: "success",
        });
        // Refreshes the page to reload the userContext.js to get the new user's info.
        setTimeout(() => router.reload(), 500);
      })
      .catch((error) => {
        console.error(error);
        setSnackbar({
          isOpen: true,
          message: `Error: ${error.message}`,
          severity: "error",
        });
      });
  };

  return (
    <Drawer anchor="right" open={drawer} onClose={clearDrawers}>
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={toggleDrawers} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Drawer>
  );
}
