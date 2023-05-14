import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { read, utils } from "xlsx";
import { chartData, chartSettings } from "./config";
import { DatasetType } from "../../../types";
import styles from "./Plot.module.scss";
import { DataTable } from "..";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const Plot: FC<{ theme: string }> = ({ theme }) => {
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [dataset, setDataset] = useState<DatasetType | null>(null);
    const [plot, setPlot] = useState({
        title: "",
        x: "",
        y: "",
        data: [],
    });

    const setData = async (file: File) => {
        const dataset = await file.arrayBuffer();
        const workbook = read(dataset);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const columns: string[] = utils.sheet_to_json<string[]>(worksheet, {
            header: 1,
            defval: "",
        })[0];

        const rows: object[] = utils.sheet_to_json<object[]>(worksheet);

        setDataset({
            ...dataset,
            columns: columns,
            rows: rows,
        });
    };

    const removeData = () => {
        setDataset(null);

        if (inputFile.current?.value != null) {
            inputFile.current.value = "";
        }
    };

    const handleChange = (event: any) => {
        setPlot({
            ...plot,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        const data = [];

        dataset?.rows.map((dataPoint) => {
            data.push({ x: dataPoint[plot.x], y: dataPoint[plot.y] });
        });

        setPlot({
            ...plot,
            data: data,
        });
    }, [plot.x, plot.y]);

    return (
        <div className={styles.container}>
            <h2>You can upload your dataset or choose these examples.</h2>

            <input
                type="file"
                accept=".csv, .ods, .xlsx"
                ref={inputFile}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files != null) {
                        setData(event.target.files[0]);
                    }
                }}
            />

            {dataset && (
                <div>
                    <button onClick={() => removeData()}>Remove</button>
                    <DataTable
                        columns={dataset?.columns}
                        rows={dataset?.rows}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "2%",
                            padding: "2%",
                        }}
                    >
                        <FormControl sx={{ width: "30%" }}>
                            <InputLabel id="x-axis">X-Axis</InputLabel>
                            <Select
                                labelId="x-axis-label"
                                id="x-axis"
                                value={plot.x}
                                name="x"
                                label="x-Axis"
                                onChange={handleChange}
                            >
                                {dataset.columns.map(
                                    (column: string, index: number) => {
                                        if (
                                            column !== plot.y &&
                                            typeof dataset.rows[index][
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
                        <FormControl sx={{ width: "30%" }}>
                            <InputLabel id="y-axis">Y-Axis</InputLabel>
                            <Select
                                labelId="y-axis-label"
                                id="y-axis"
                                value={plot.y}
                                name="y"
                                label="y-Axis"
                                onChange={handleChange}
                            >
                                {dataset.columns.map(
                                    (column: string, index: number) => {
                                        if (
                                            column !== plot.x &&
                                            typeof dataset.rows[index][
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
                            id="plot-title"
                            name="title"
                            label="Title"
                            variant="outlined"
                            onChange={handleChange}
                            value={plot.title}
                        />
                    </Box>

                    <Scatter
                        options={chartSettings}
                        data={chartData(plot.title, plot.data, theme)}
                    />
                </div>
            )}
        </div>
    );
};
