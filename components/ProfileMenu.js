import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import CustomSnackbar from "../components/CustomSnackbar";
import UpdateUserUsername from "./profileMenu/UpdateUserUsername";
import UpdateUserEmail from "./profileMenu/UpdateUserEmail";
import UpdateUserPhoto from "./profileMenu/UpdateUserPhoto";

export default function ProfileMenu({ drawer, clearDrawers }) {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  return (
    <Drawer anchor="right" open={drawer} onClose={clearDrawers}>
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
            Add {process.env.NEXT_PUBLIC_DOC_NAME}
          </Typography>
          <UpdateUserUsername />
          <UpdateUserEmail />
          <UpdateUserPhoto />
        </Box>
      </Container>
    </Drawer>
  );
}
