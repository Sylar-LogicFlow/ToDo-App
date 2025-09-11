import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars({
  openS,
  messageS,
  openER,
  ERmessage,
}) {
  return (
    <div>
      {/* success message */}
      <Snackbar open={openS} autoHideDuration={6000}>
        <Alert severity="success" variant="filled" sx={{ width: "90%" }}>
          {messageS}
        </Alert>
      </Snackbar>
      {/* ===success message=== */}

      {/* warring or fiald message  */}
      <Snackbar open={openER} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: "90%" }}>
          {ERmessage}.
        </Alert>
      </Snackbar>
      {/* ====warring or fiald message====  */}
    </div>
  );
}
