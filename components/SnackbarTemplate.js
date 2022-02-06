import { useState, useContext } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../customHooks/userContext";
import * as React from "react";
import { Alert, Snackbar } from "@mui/material";

export default function SnackbarTemplate({ snackbar, setSnackbar }) {
  return (
    <Snackbar
      open={snackbar.isOpen}
      autoHideDuration={5000}
      onClose={() => setSnackbar(false)}
    >
      {snackbar.severity && (
        <Alert
          onClose={() => setSnackbar(false)}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      )}
    </Snackbar>
  );
}
