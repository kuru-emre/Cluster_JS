import { DatasetType } from "../../../types";

const COLORS: string[] = ["red", "blue", "green", "yellow", "purple", "orange"];

export const chartData = (
    label: string,
    dataset: DatasetType,
    theme?: string
) => {
    return {
        datasets: [
            {
                label: label,
                data: dataset.map((dataPoint) => {
                    return { x: dataPoint.x, y: dataPoint.y };
                }),
                pointRadius: 5.5,
                pointStyle: "circle",
                pointBackgroundColor: "red",
                backgroundColor: "aqua",
            },
        ],
    };
};

export const chartSettings = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        labels: {
            fontSize: 20,
        },
    },
};
