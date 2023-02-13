import { blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffc6e9",
    },
    secondary: {
      main: blue.A400,
    },
    error: {
      main: red.A700,
    },
  },
});
