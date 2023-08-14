import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-row:nth-child(odd)": {
    backgroundColor: "lightgrey",
  },
  "& .MuiDataGrid-row:nth-child(odd):hover": {
    backgroundColor: "#e0e0e0",
  },
});
