import { styled, Box } from "@mui/material";

export const StyledFooterBox = styled(Box)(({theme}) => ({
    padding: theme.spacing(4),
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(4)
}))