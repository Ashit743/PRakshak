
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "@emotion/react";
import { createTheme, alpha, getContrastRatio } from "@mui/material";
const GreenBase = "#6fb062";
const GreenMain = alpha(GreenBase, 0.7);
const theme = createTheme({
  palette: {
    green: {
      main: GreenMain,
      light: alpha(GreenBase, 0.5),
      dark: alpha(GreenBase, 0.9),
      contrastText: getContrastRatio(GreenMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        '&:hover': {
          color:GreenMain,
          bgColor:"white"
        }
      }
    }
  }
});


function App() {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
