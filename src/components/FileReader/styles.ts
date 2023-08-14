import { styled, Box } from "@mui/material";

export const StyledUploadBox = styled(Box)(({ theme }) => ({
  borderStyle: "dotted",
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(4),
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(4),
  height: "100px",
}));
