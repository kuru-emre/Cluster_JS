import { styled, AppBar, Tabs } from "@mui/material";
import SwipeableViews from "react-swipeable-views";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 5,
    marginBottom: "2px",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 100,
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  },
}));

export const StyledSwipeableViews = styled(SwipeableViews)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  background: "white",
}));
