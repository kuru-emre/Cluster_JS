import { styled, Box, Grid } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
}));

export const StyledScatterGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: "480px",
  },
}));
