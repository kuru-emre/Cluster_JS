import { FC, useEffect } from "react";
import { AxisType, RowType } from "../types";
import {
    Button,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { DataTable, Chart, FileReader } from "./index";
import {
    useAppDispatch,
    useAppSelector,
    setChartTitle,
    setChartXTitle,
    setChartYTitle,
    setChartData,
    resetTable,
    resetChart,
    setChartAlgName,
    setChartAlgProps,
} from "../redux";
import { algorithms } from "../utils";

export const Cluster: FC = () => {
    const table = useAppSelector((state) => state.table);
    const chart = useAppSelector((state) => state.chart);
    const dispatch = useAppDispatch();

    const removeData = () => {
        dispatch(resetTable());
        dispatch(resetChart());
    };

    useEffect(() => {
        const data: AxisType[] = [];

        table.rows?.map((dataPoint: RowType) => {
            data.push({
                x: dataPoint[chart.x_title],
                y: dataPoint[chart.y_title],
            });
        });

        dispatch(setChartData(data));
    }, [chart.x_title, chart.y_title]);

    return (
        <>
            {table.columns.length === 0 ? (
                <FileReader />
            ) : (
                <Grid container spacing={4} xs={12}>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={removeData}>
                            Remove
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <DataTable columns={table.columns} rows={table.rows} />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <TextField
                            sx={{ width: 1 }}
                            id="chart-title"
                            label="Chart Title"
                            variant="outlined"
                            onChange={(e) =>
                                dispatch(setChartTitle(e.target.value))
                            }
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
                                label="x-Axis"
                                onChange={(e) =>
                                    dispatch(setChartXTitle(e.target.value))
                                }
                            >
                                {table.columns.map(
                                    (column: string, index: number) => {
                                        if (
                                            column !== chart.y_title &&
                                            typeof table.rows[index][column] ===
                                                "number"
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
                                label="y-Axis"
                                onChange={(e) =>
                                    dispatch(setChartYTitle(e.target.value))
                                }
                            >
                                {table.columns.map(
                                    (column: string, index: number) => {
                                        if (
                                            column !== chart.x_title &&
                                            typeof table.rows[index][column] ===
                                                "number"
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
                                value={chart.alg.name}
                                label="Algorithm"
                                onChange={(e) =>
                                    dispatch(setChartAlgName(e.target.value))
                                }
                            >
                                {Object.keys(algorithms).map(
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

                    {chart.alg.name !== "" &&
                        algorithms[chart.alg.name].map((prop: string, index: number) => {
                            return (
                                <Grid item xs={12} lg={4} key={index}>
                                    <TextField
                                        key={`${chart.alg.name}-${prop}`}
                                        sx={{ width: 1 }}
                                        id="chart-title"
                                        label={prop}
                                        type="number"
                                        variant="outlined"
                                        onChange={(e) =>
                                            dispatch(
                                                setChartAlgProps([index, Number(e.target.value)])
                                            )
                                        }
                                        value={chart.alg.props[index]}
                                    />
                                </Grid>
                            );
                        })
                    }

                    <Chart />
                </Grid>
            )}
        </>
    );
};
