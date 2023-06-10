import { Grid, Typography, Divider, Button, TextField } from "@mui/material";
import { FC, useRef } from "react";
import { fetchURL } from "../utils";
import { read, utils } from "xlsx";
import { useAppDispatch, setTableColumns, setTableRows, setTableName } from "../redux";
import { RowType } from "../types";

export const FileReader: FC = () => {
    const textURL = useRef<HTMLTextAreaElement>();
    const dispatch = useAppDispatch();

    const readData = async (file: File | null) => {
        const dataset = await file?.arrayBuffer();
        const workbook = read(dataset);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const columns = utils.sheet_to_json<string[]>(worksheet, {
            header: 1,
            defval: "",
        })[0];

        const rows = utils.sheet_to_json<RowType>(worksheet);

        dispatch(setTableName(file?.name))
        dispatch(setTableColumns(columns));
        dispatch(setTableRows(rows));
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h5" align="center">
                    You can your local dataset or use an url to upload.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid
                item
                xs={12}
                lg={6}
                display={"flex"}
                justifyContent={"center"}
            >
                <Button
                    variant="contained"
                    component="label"
                    sx={{ width: 0.5 }}
                >
                    Local Upload
                    <input
                        hidden
                        accept=".csv, .ods, .xlsx"
                        type="file"
                        onChange={(e) => {
                            readData(e.target.files?.[0] ?? null);
                        }}
                    />
                </Button>
            </Grid>

            <Grid
                item
                xs={12}
                lg={6}
                display={"flex"}
                justifyContent={"center"}
                gap={4}
            >
                <TextField
                    id="dataset-url"
                    name="url"
                    label="Dataset URL"
                    variant="outlined"
                    inputRef={textURL}
                />

                <Button
                    variant="contained"
                    onClick={async () =>
                        readData(
                            await fetchURL(
                                textURL.current?.value ?? "",
                                "dataset"
                            ) as File
                        )
                    }
                >
                    Get from URL
                </Button>
            </Grid>
        </Grid>
    );
};
