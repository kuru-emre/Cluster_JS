import { FC } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { chartConfig, useAlgorithms } from "../utils";
import { useAppSelector } from "../redux";
import { Button, Divider, Grid } from "@mui/material";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const Chart: FC = () => {
    const chart = useAppSelector((state) => state.chart);
    const { kmeans } = useAlgorithms();

    const startCluster = () => {
        if (chart.alg.name !== "") {
            switch (chart.alg.name) {
                case "kmeans":
                    kmeans()
                    break;
            
                default:
                    break;
            }
        }
    };

    return (
        <>
            <Grid item xs={12} lg={4}>
                <Button variant="contained" onClick={() => startCluster()}>
                    Start Clustering
                </Button>
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
                <Scatter {...chartConfig(chart)} />
            </Grid>
        </>
    );
};
