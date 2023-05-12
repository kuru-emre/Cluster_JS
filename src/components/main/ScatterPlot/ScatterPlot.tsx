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
import styles from "./ScatterPlot.module.scss";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const COLORS: string[] = ["red", "blue", "green", "yellow", "purple", "orange"];

export const ScatterPlot: FC<{
    dataset: object;
    label: string;
    algorithm: string;
    theme?: string;
}> = ({ dataset, label, algorithm, theme }) => {
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const data = {
        datasets: [
            {
                label: label,
                data: dataset,
                pointRadius: 5.5,
                backgroundColor: theme === "light" ? "white" : "black",
            },
        ],
    };

    return (
        <div className={styles.container}>
            <div className={styles.plot}>
                <Scatter options={options} data={data} />
            </div>
        </div>
    );
};
