import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";

import { useGlobalState } from "@/hooks/useGlobalState";

import Alert from "@/components/common/Alert";

export default function Toast() {
  const { toastOpen, toastMessage, removeToast } = useGlobalState();

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    removeToast();
  };

  return (
    <>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{
          top: { xs: 88, sm: "auto" },
          bottom: { xs: "auto", sm: 24 },
        }}>
        <Alert
          severity="success"
          onClose={handleClose}
          sx={{ width: "100%", backgroundColor: "primary.main", backgroundImage: "none" }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
