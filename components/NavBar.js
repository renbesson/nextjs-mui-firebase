import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Profile from "../components/Profile";
import { useUser } from "../customHooks/userContext";
import CustomSnackbar from "./CustomSnackbar";
import { useRouter } from "next/router";

export default function NavBar() {
  const [signInDrawer, setSignInDrawer] = useState(false);
  const [signUpDrawer, setSignUpDrawer] = useState(false);
  const [profileDrawer, setProfileDrawer] = useState(false);
  const { loadingUser, user } = useUser();
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const router = useRouter();

  const handleUserButton = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (!user) setSignInDrawer(!signInDrawer);
    if (user) setProfileDrawer(!profileDrawer);
  };

  const toggleDrawers = () => {
    setSignInDrawer(!signInDrawer);
    setSignUpDrawer(!signUpDrawer);
  };

  const clearDrawers = () => {
    setSignInDrawer(false);
    setSignUpDrawer(false);
    setProfileDrawer(false);
  };

  return (
    <>
      <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <SignIn
        drawer={signInDrawer}
        toggleDrawers={toggleDrawers}
        clearDrawers={clearDrawers}
        setSnackbar={setSnackbar}
      />
      <SignUp
        drawer={signUpDrawer}
        toggleDrawers={toggleDrawers}
        clearDrawers={clearDrawers}
        setSnackbar={setSnackbar}
      />
      <Profile
        drawer={profileDrawer}
        clearDrawers={clearDrawers}
        setSnackbar={setSnackbar}
      />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* ++ Place your logo here ++ */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              LOGO
            </Typography>
            {/* -- Place your logo here -- */}
            {/* ++ Horizontal menu ++ */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="addIngredient"
                onClick={() => router.push("/addIngredient")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Add Ingredient
              </Button>
              <Button
                key="myIngredients"
                onClick={() => router.push("/myIngredients")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                My Ingredients
              </Button>
            </Box>
            {/* -- Horizontal menu -- */}
            {/* ++ Account menu ++ */}
            <Box sx={{ flexGrow: 0 }}>
              <Typography display="inline" sx={{ mr: 2 }}>
                {user ? user.displayName : "SignIn/Up"}
              </Typography>
              <Tooltip title="Open Profile">
                <IconButton onClick={handleUserButton} sx={{ p: 0 }}>
                  <Avatar
                    alt={user && user.displayName}
                    src={user && user.photoURL}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            {/* -- Account menu -- */}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
