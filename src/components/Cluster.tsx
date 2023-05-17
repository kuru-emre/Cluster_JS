import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { read, utils } from "xlsx";
import { DataTableType, ChartType, AxisType, RowType } from "../types";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import {
    Button,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { chartData, fetchURL } from "../utils";
import { DataTable } from "./DataTable";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ALGORITHMS: string[] = ["k-means", "mean-shift", "DBSCAN"];

export const Cluster: FC = () => {
    const textURL = useRef<HTMLTextAreaElement>();
    const inputFile = useRef<HTMLInputElement>(null);
    const [dataTable, setDataTable] = useState<DataTableType | null>(null);
    const [chart, setChart] = useState<ChartType>({
        title: "",
        x_title: "",
        y_title: "",
        data: [],
        alg: "",
    });

    const readData = async (file: Blob | null) => {
        const dataset = await file?.arrayBuffer();
        const workbook = read(dataset);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const columns = utils.sheet_to_json<string[]>(worksheet, {
            header: 1,
            defval: "",
        })[0];

        const rows = utils.sheet_to_json<RowType>(worksheet);

        setDataTable({
            ...dataset,
            columns: columns,
            rows: rows,
        });
    };

    const removeData = () => {
        setDataTable(null);

        if (inputFile.current?.value != null) {
            inputFile.current.value = "";
        }
    };

    const handleChange = (event: any) => {
        setChart({
            ...chart,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        const data: AxisType[] = [];

        dataTable?.rows.map((dataPoint: RowType) => {
            data.push({
                x: dataPoint[chart.x_title],
                y: dataPoint[chart.y_title],
            });
        });

        setChart({
            ...chart,
            data: data,
        });
    }, [chart.x_title, chart.y_title]);

    return (
        <>
            {!dataTable && (
                <Grid container spacing={4} xs={12}>
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
                                ref={inputFile}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => {
                                    if (event.target.files != null) {
                                        readData(event.target.files[0]);
                                    }
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
                                    )
                                )
                            }
                        >
                            Get from URL
                        </Button>
                    </Grid>
                </Grid>
            )}

            {dataTable && (
                <Grid container spacing={4} xs={12}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={() => removeData()}
                        >
                            Remove
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <DataTable
                            columns={dataTable.columns}
                            rows={dataTable.rows}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <TextField
                            sx={{ width: 1 }}
                            id="chart-title"
                            name="title"
                            label="Chart Title"
                            variant="outlined"
                            onChange={handleChange}
                            value={chart.title}
                        />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <FormControl sx={{ width: 1 }}>
                            <InputLabel id="x-axis">X-Axis</InputLabel>
                            <Select
                                labelId="x-axis-label"
                                id="x-axis"
                                value={chart.x_title}
                                name="x_title"
                                label="x-Axis"
                                onChange={handleChange}
                            >
                                {dataTable.columns.map(
                                    (column: string, index: number) => {
                                        if (
                                            column !== chart.y_title &&
                                            typeof dataTable.rows[index][
                                                column
                                            ] === "number"
                                        ) {
                                            return (
                                                <MenuItem
                                                    key={`x-${index}`}
                                                    value={column}
                                                >
                                                    {column}
                                                </MenuItem>
                                            );
                                        }
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <FormControl sx={{ width: 1 }}>
                            <InputLabel id="y-axis">Y-Axis</InputLabel>
                            <Select
                                labelId="y-axis-label"
                                id="y-axis"
                                value={chart.y_title}
                                name="y_title"
                                label="y-Axis"
                                onChange={handleChange}
                            >
                                {dataTable.columns.map(
                                    (column: string, index: number) => {
                                        if (
                                            column !== chart.x_title &&
                                            typeof dataTable.rows[index][
                                                column
                                            ] === "number"
                                        ) {
                                            return (
                                                <MenuItem
                                                    key={`y-${index}`}
                                                    value={column}
                                                >
                                                    {column}
                                                </MenuItem>
                                            );
                                        }
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <FormControl sx={{ width: 1 }}>
                            <InputLabel id="algorithm">Algorithm</InputLabel>
                            <Select
                                labelId="algorithm-label"
                                id="algorithm"
                                value={chart.alg}
                                name="alg"
                                label="Algorithm"
                                onChange={handleChange}
                            >
                                {ALGORITHMS.map(
                                    (alg: string, index: number) => {
                                        return (
                                            <MenuItem
                                                key={`alg-${index}`}
                                                value={alg}
                                            >
                                                {alg}
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{ height: "500px" }}
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        <Scatter {...chartData(chart)} />
                    </Grid>
                </Grid>
            )}
        </>
    );
};
