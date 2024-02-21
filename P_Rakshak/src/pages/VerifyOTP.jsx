import * as React from "react";
import Box from "@mui/material/Box";
import CardElement from "../components/UI/Card";
import { Input as BaseInput } from "@mui/base/Input";
import { Container, Typography, FormHelperText, Button } from "@mui/material";
import logo from "../assets/logo.png";
import Stack from "@mui/material/Stack";
import { verifyotp } from "../service/auth";
import CustomAlert from "../components/UI/Alert";

export default function VerifyOTP() {
  return (
    <Container
      style={{
        height: "100dvh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <CardElement>
        <Stack gap={2} useFlexGap={true}>
          <Stack justifyContent="center" alignItems="center">
            <img src={logo} width="50" height="50" />
          </Stack>
          <Stack justifyContent="center" alignItems="center">
            <Typography variant="h5" gutterBottom sx={{ color: "green.dark" }}>
              PRakshak
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ color: "green.dark" }}
            >
              Verify Your Number
            </Typography>
          </Stack>
          <Box component="form" noValidate autoComplete="off" gap={10}>
            <Stack justifyContent="center" alignItems="center">
              <OTPInput />
            </Stack>
          </Box>
        </Stack>
      </CardElement>
    </Container>
  );
}

function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

function OTPInput() {
  const [otp, setOtp] = React.useState("");
  const [alertState, setAlertState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    alertMessage: "",
    type: "success",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertState((prev) => ({ ...prev, open: false }));
  };
  const submitHandler = async () => {
    if (!otp || !otp.length) {
      return;
    }
    try {
      const response = await verifyotp(otp);
      setOtp("");
      setAlertState((prev) => ({
        ...prev,
        open: true,
        alertMessage: "Successfully Verified the OTP",
      }));
      console.log(response);
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
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
      <FormHelperText id="phone no helper text">
        Please Enter The 4 Digit Code Sent To 91+ ********65
      </FormHelperText>
      <OTP
        separator={<span>-</span>}
        value={otp}
        onChange={setOtp}
        length={4}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        00:20
      </Box>
      <Button
        variant="outlined"
        sx={{
          borderColor: "green.dark",
          color: "black",
        }}
        size="small"
      >
        Resend
      </Button>
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
        Verify
      </Button>
    </Box>
  );
}
