import {
  useAppSelector,
  useAppDispatch,
  resetTable,
  resetChart,
} from "../../redux";
import { Alert, Button, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { TableType } from "../../types";
import { FC } from "react";
import { StyledDataGrid } from "./styles";
import { useSnackbar } from "notistack";

export const DataTable: FC<TableType> = (props) => {
  const table = useAppSelector((state) => state.table);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const removeData = () => {
    dispatch(resetTable());
    dispatch(resetChart());
    enqueueSnackbar("Data removed successfully!", { variant: "success" });
  };

  const columns = () => {
    const headers: GridColDef[] = [
      { field: "id", headerName: "ID", width: 70 },
    ];
    props.columns?.forEach((header) => {
      headers.push({
        field: header,
        headerName: header.toUpperCase(),
      });
    });

    return headers;
  };

  const rows = () => {
    const rows = [];
    for (let index = 0; index < props.rows.length; index++) {
      rows.push({
        id: index,
        ...props.rows[index],
      });
    }

    return rows;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert
          variant="filled"
          severity="info"
          sx={{ display: "flex", justifyContent: "center", padding: 1 }}
        >
          <Typography>
            The name of the file is: <b>{table.name}</b>
          </Typography>
        </Alert>
      </Grid>

      <Grid item xs>
        <StyledDataGrid
          density="compact"
          rows={rows()}
          columns={columns()}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          fullWidth
          startIcon={<Delete />}
          variant="contained"
          onClick={removeData}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};
