import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableType } from "../../types";

const initialState: TableType = {
    columns: [],
    rows: [],
};

export const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setTableColumns: (
            state,
            action: PayloadAction<TableType["columns"]>
        ) => {
            state.columns = action.payload;
        },
        setTableRows: (state, action: PayloadAction<TableType["rows"]>) => {
            state.rows = action.payload;
        },
        resetTable: () => {
            return {...initialState};
        },
    },
});

export const { setTableColumns, setTableRows, resetTable } = tableSlice.actions;
export default tableSlice.reducer;
