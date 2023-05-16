import { ThemeOptions, createTheme } from "@mui/material/styles";

export const theme: ThemeOptions = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "rgba(233,150,10,0.95)",
            light: "rgba(233,180,21,0.95)",
            dark: "rgba(230,105,4,0.95)",
            contrastText: "rgba(51,51,51,0.95)",
        },
        secondary: {
            main: "rgba(10,92,233,0.95)",
            light: "rgba(0,111,251,0.95)",
            dark: "rgba(32,56,201,0.95)",
            contrastText: "rgba(255,255,255,0.95)",
        },
        background: {
            default: "#f2f2f2",
        },
    },
    spacing: 4,
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
});
