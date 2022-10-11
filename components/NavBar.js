import { useState } from "react";
import { auth } from "../lib/firebase";
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
import MainMenu from "../components/MainMenu";
import { useUser } from "../customHooks/userContext";
import CustomSnackbar from "./CustomSnackbar";
import { useRouter } from "next/router";
import ProfileMenu from "./ProfileMenu";
import { Menu, MenuItem } from "@mui/material";
import Link from "next/link";

export default function NavBar() {
  const [signInDrawer, setSignInDrawer] = useState(false);
  const [signUpDrawer, setSignUpDrawer] = useState(false);
  const [mainMenuDrawer, setMainMenuDrawer] = useState(false);
  const [profileMenuDrawer, setProfileMenuDrawer] = useState(false);
  const { loadingUser, user } = useUser();
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const loggedOutMenu = [
    { title: "Sign In", function: () => setSignInDrawer(true) },
    { title: "Sign Up", function: () => setSignUpDrawer(true) },
  ];

  const loggedInMenu = [
    { title: "Profile", function: () => setProfileMenuDrawer(true) },
    { title: "Account", function: () => console.log("Account") },
    { title: "Sign Out", function: () => onSignOut() },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const router = useRouter();

  const handleUserButton = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const toggleDrawers = () => {
    setSignInDrawer(!signInDrawer);
    setSignUpDrawer(!signUpDrawer);
  };

  const clearDrawers = () => {
    setSignInDrawer(false);
    setSignUpDrawer(false);
    setMainMenuDrawer(false);
    setProfileMenuDrawer(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onSignOut = () => {
    auth
      .signOut(auth)
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
      <MainMenu
        drawer={mainMenuDrawer}
        clearDrawers={clearDrawers}
        setSnackbar={setSnackbar}
      />
      <ProfileMenu
        drawer={profileMenuDrawer}
        clearDrawers={clearDrawers}
        setSnackbar={setSnackbar}
      />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* ++ Place your logo here ++ */}
            <Link href="/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  cursor: "pointer",
                }}
              >
                LOGO
              </Typography>
            </Link>
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
            {!loadingUser && (
              <Box sx={{ flexGrow: 0 }}>
                <Typography display="inline" sx={{ mr: 2 }}>
                  {user ? user.displayName : "SignIn/Up"}
                </Typography>
                <Tooltip title="Open Main Menu">
                  <IconButton onClick={handleUserButton} sx={{ p: 0 }}>
                    <Avatar alt={user?.displayName} src={user?.photoURL} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {!user
                    ? loggedOutMenu.map((menu) => (
                        <MenuItem
                          key={menu.title}
                          onClick={handleCloseUserMenu}
                        >
                          <Typography
                            onClick={menu.function}
                            textAlign="center"
                          >
                            {menu.title}
                          </Typography>
                        </MenuItem>
                      ))
                    : loggedInMenu.map((menu) => (
                        <MenuItem
                          key={menu.title}
                          onClick={handleCloseUserMenu}
                        >
                          <Typography
                            onClick={menu.function}
                            textAlign="center"
                          >
                            {menu.title}
                          </Typography>
                        </MenuItem>
                      ))}
                </Menu>
              </Box>
            )}
            {/* -- Account menu -- */}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
