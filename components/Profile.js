import { auth } from "../lib/firebase";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

const theme = createTheme();

export default function SignInDrawer({ drawer, clearDrawers, setSnackbar }) {
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
