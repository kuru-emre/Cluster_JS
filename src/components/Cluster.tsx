import { useAppDispatch, useAppSelector, setChartTitle, setChartXTitle, setChartYTitle, setChartData, resetTable, resetChart, setChartAlgName, setChartAlgProps, } from "../redux";
import { Alert, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, } from "@mui/material";
import { DataTable, Plot, FileReader } from "./index";
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useEffect } from "react";
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
        const data = table.rows?.map((dataPoint) => ({
            x: dataPoint[chart.x_title],
            y: dataPoint[chart.y_title],
        }));

        dispatch(setChartData([data]));
    }, [chart.x_title, chart.y_title]);

    return (
        <>
            {table.columns.length === 0 ? (
                <FileReader />
            ) : (
                <Grid container spacing={4} xs={12}>
                    <Grid item xs={3} lg={1}>
                        <Button fullWidth startIcon={<DeleteIcon />} variant="contained" onClick={removeData}>
                            Remove
                        </Button>
                    </Grid>

                    <Grid item xs={9} lg={11}>
                        <Alert variant="filled" severity="info" sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography>The name of the file is: {table.name}</Typography>
                        </Alert>
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
                                {table.columns.map((column, index) => {
                                    const isNumber =
                                        typeof table.rows[index][column] === "number";

                                    if (column !== chart.y_title && isNumber) {
                                        return (
                                            <MenuItem key={`x-${index}`} value={column}>
                                                {column}
                                            </MenuItem>
                                        );
                                    }

                                    return null;
                                })}
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
                                {table.columns.map((column, index) => {
                                    const isNumber =
                                        typeof table.rows[index][column] === "number";

                                    if (column !== chart.x_title && isNumber) {
                                        return (
                                            <MenuItem key={`y-${index}`} value={column}>
                                                {column}
                                            </MenuItem>
                                        );
                                    }

                                    return null;
                                })}
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
                                {Object.keys(algorithms).map((alg, index) => (
                                    <MenuItem key={`alg-${index}`} value={alg}>
                                        {alg}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {chart.alg.name !== "" && algorithms[chart.alg.name]?.map((prop, index) => (
                        <Grid item xs={12} lg={4} key={index}>
                            <TextField
                                key={`${chart.alg.name}-${prop}`}
                                sx={{ width: 1 }}
                                id="chart-title"
                                label={prop}
                                type="number"
                                InputProps={{
                                    inputProps: { min: 2 },
                                }}
                                variant="outlined"
                                onChange={(e) =>
                                    dispatch(setChartAlgProps([index, Number(e.target.value)]))
                                }
                                value={chart.alg.props[index] || 0}
                            />
                        </Grid>
                    ))}

                    <Plot />

                </Grid>
            )}
        </>
    );
};
