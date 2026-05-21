import { createTheme } from "@mui/material";

export const COLORS = {
  gray: "#404040",
};

const theme = createTheme({
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem", // base (mobile)
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
      "@media (min-width:900px)": {
        fontSize: "5rem",
      },
    },
  },
  palette: {
    primary: {
      main: COLORS.gray,
      contrastText: "#ffffff", // text color on primary
    },
    // secondary: {},
  },
});

export default theme;
