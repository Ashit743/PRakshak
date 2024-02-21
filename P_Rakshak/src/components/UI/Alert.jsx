import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CustomAlert = ({
  open,
  handleClose,
  type,
  message,
  vertical = "top",
  horizontal = "center",
}) => {
  console.log(vertical, horizontal, type, handleClose);
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default CustomAlert;
