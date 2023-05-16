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
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { chartSettings, chartData, fetchURL } from "../utils";
import { DataTable } from "./DataTable";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ALGORITHMS: string[] = ["kmeans", "meanshift", "dbscan"];

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
        <Box>
            <h2>You can upload your dataset or use a url</h2>

            <input
                type="file"
                accept=".csv, .ods, .xlsx"
                ref={inputFile}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files != null) {
                        readData(event.target.files[0]);
                    }
                }}
            />

            <Box sx={{ display: "flex", justifyContent: "center", gap: "2%" }}>
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
                    Get the dataset
                </Button>
            </Box>

            {dataTable && (
                <div>
                    <button onClick={() => removeData()}>Remove</button>

                    <Box
                        sx={{
                            display: "grid",
                            gap: 3,
                            padding: "2%",
                        }}
                    >
                        <DataTable
                            columns={dataTable.columns}
                            rows={dataTable.rows}
                        />

                        <Divider />

                        <Box>
                            <FormControl sx={{ width: "25%" }}>
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
                            <FormControl sx={{ width: "25%" }}>
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
                            <TextField
                                sx={{ width: "25%" }}
                                id="chart-title"
                                name="title"
                                label="Title"
                                variant="outlined"
                                onChange={handleChange}
                                value={chart.title}
                            />
                        </Box>

                        <Divider />
                    </Box>

                    <Scatter options={chartSettings} data={chartData(chart)} />
                </div>
            )}
        </Box>
    );
};
