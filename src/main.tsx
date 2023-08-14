import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { App } from "./components/App.tsx";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { theme } from "./utils";
import { store } from "./redux";
import React from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
