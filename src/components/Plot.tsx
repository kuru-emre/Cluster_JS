import { Chart, LinearScale, PointElement, LineElement, Tooltip, Legend, Title } from "chart.js";
import { Alert, Button, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch, resetChart } from "../redux";
import { chartConfig, useAlgorithms } from "../utils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FC, useRef, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { PDFFile } from "./PDFFile";

Chart.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

export const Plot: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [preventCallback, setPreventCallback] = useState(false)
    const [chartImage, setChartImage] = useState("")
    const chartRef = useRef<Chart<'scatter'>>(null)
    const chart = useAppSelector((state) => state.chart);
    const dispatch = useAppDispatch();
    const { kmeans } = useAlgorithms();

    const startCluster = async () => {
        if (chart.alg.name == "" && preventCallback) {
            return
        }

        setPreventCallback(true);

        switch (chart.alg.name) {
            case "kmeans":
                try {
                    setIsLoading(true);
                    await kmeans();
                    break;
                } catch (error) {
                    console.log(error)
                    break;
                }
            default:
                break;
        }

        setIsLoading(false)
        setShowResult(true)

        if (chartRef.current) {
            setChartImage(chartRef.current.toBase64Image());
        }


    };

    const resetCluster = () => {
        if (!isLoading) {
            setPreventCallback(false)
            setShowResult(false)
            dispatch(resetChart())
        }

    }


    return (
        <>
            {chart.alg.props.length > 0 && (
                <Grid item xs={12} lg={4}>
                    <Button sx={{ width: 1, height: 1 }} variant="contained" onClick={() => preventCallback ? resetCluster() : startCluster()}>
                        {preventCallback ? <Typography>Reset Cluster</Typography> : <Typography>Start Cluster</Typography>}
                    </Button>
                </Grid>
            )}

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs={12}>
                {isLoading ? (
                    <>
                        <Typography>{chart.status}</Typography>
                        <LinearProgress />
                    </>
                ) : showResult ? (
                    <>
                        <Alert
                            severity="success"
                            action={
                                <PDFDownloadLink document={<PDFFile chartImage={chartImage} />} fileName="Clusters.pdf">
                                    {({ loading }) =>
                                        loading ? <Typography>Loading pdf...</Typography> : <Button variant="outlined" color="secondary">Download as PDF</Button>
                                    }
                                </PDFDownloadLink>
                            }
                        >
                            Clustering finished successfully!
                        </Alert>
                    </>
                ) : null}
            </Grid>

            <Grid
                item
                xs={12}
                sx={{ height: "500px" }}
                display={"flex"}
                justifyContent={"center"}
            >
                <Scatter {...chartConfig(chart)} ref={chartRef} />
            </Grid>
        </>
    );
};
