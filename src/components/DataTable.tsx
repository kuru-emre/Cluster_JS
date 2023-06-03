import { FC } from "react";
import { TableType } from "../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const DataTable: FC<TableType> = (props) => {
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
        <DataGrid
            density="compact"
            rows={rows()}
            columns={columns()}
            autoHeight={true}
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
    );
};
