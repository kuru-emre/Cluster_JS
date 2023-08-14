import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./utils";
import { store } from "./redux";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
