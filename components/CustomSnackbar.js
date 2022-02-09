import { Alert, Snackbar } from "@mui/material";

export default function CustomSnackbar({ snackbar, setSnackbar }) {
  const handleClose = (event, reason) => {
    // Prevent the snackbar to close on click away
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };
  return (
    <Snackbar
      open={snackbar.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      {snackbar.severity && (
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      )}
    </Snackbar>
  );
}
