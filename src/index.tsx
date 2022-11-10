import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Main from "./page/main";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },
    MuiButton: {
      defaultProps: {
        fullWidth: true,
        variant: "contained",
        size: "small",
      },
    },
  },
});

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
