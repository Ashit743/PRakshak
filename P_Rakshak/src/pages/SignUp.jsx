import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CardElement from "../components/UI/Card";
import { Container, Typography, FormHelperText, Button } from "@mui/material";
import logo from "../assets/logo.png";
import Stack from "@mui/material/Stack";
import { sendotp } from "../service/auth";
import CustomAlert from "../components/UI/Alert";
import {useNavigate} from 'react-router'
export default function SignUp() {
  const [phoneNO, setPhoneNO] = useState("");
  const navigate=useNavigate()
  const [alertState, setAlertState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    alertMessage: "",
    type: "success",
  });

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log("phoneNO", phoneNO);
    if (phoneNO === "" || phoneNO.length < 10) return;
    try {
      const response = await sendotp(phoneNO);
      sessionStorage.setItem("phno",phoneNO)
      console.log(response);
      setPhoneNO("")
      setAlertState((prev) => ({
        ...prev,
        open: true,
        alertMessage: "OTP sent Successfully",
      }));
      navigate("/verify")
    } catch (error) {
      setAlertState((prev) => ({
        ...prev,
        open: true,
        alertMessage: "Some Error Occurred",
        type: "error",
      }));
      console.log(error);
    }
  };
  const handleClose = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertState((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <Container
      style={{
        height: "100dvh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <CustomAlert
        handleClose={handleClose}
        open={alertState.open}
        type={alertState.type}
        message={alertState.alertMessage}
        vertical={alertState.vertical}
        horizontal={alertState.horizontal}
      />
      <CardElement>
        <Stack gap={2} useFlexGap={true}>
          <Stack justifyContent="center" alignItems="center">
            <img src={logo} width="50" height="50" />
          </Stack>
          <Stack justifyContent="center" alignItems="center">
            <Typography
              variant="h5"
              gutterBottom
              style={{ color: "rgb(111 183 98)" }}
            >
              PRakshak
            </Typography>
          </Stack>
          <Box component="form" noValidate autoComplete="off" gap={10}>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Mobile No"
              variant="outlined"
              margin="normal"
              aria-describedby="phone no helper text"
              onChange={(e) => setPhoneNO(e.target.value)}
            />
            <FormHelperText id="phone no helper text">
              Please Enter Your Register Mobile Number To Receive a Verification
              Code
            </FormHelperText>
            <Button
              variant="contained"
              fullWidth={true}
              sx={{
                bgcolor: "green.dark",
                marginBlock: "10px",
                color: "white",
              }}
              onClick={submitHandler}
            >
              Create Account
            </Button>
          </Box>
        </Stack>
      </CardElement>
    </Container>
  );
}
