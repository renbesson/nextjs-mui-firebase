import { useState, useContext } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../customHooks/userContext";
import * as React from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import SnackbarTemplate from "./SnackbarTemplate";

const theme = createTheme();

export default function SignInDrawer({ drawer, clearDrawers, setSnackbar }) {
  const { loadingUser, user } = useUser();

  const onSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setSnackbar({
          isOpen: true,
          message: `Signed out successfully.`,
          severity: "success",
        });
        clearDrawers();
      })
      .catch((error) => {
        setSnackbar({
          isOpen: true,
          message: `Error: ${error.message}`,
          severity: "error",
        });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer anchor="right" open={drawer} onClose={clearDrawers}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Button onClick={onSignOut}>SignOut</Button>
        </Container>
      </Drawer>
    </ThemeProvider>
  );
}
