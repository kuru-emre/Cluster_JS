import { RowType } from ".";

export type TableType = {
    name?: string;
    columns: string[];
    rows: RowType[];
};
