import { AxisType, ChartType } from "../../types";

const COLORS: string[] = ["red", "blue", "green", "yellow", "purple", "orange"];

export const chartData = (props: ChartType) => {
    return {
        data: {
            datasets: [
                {
                    label: props.title,
                    data: props.data.map((dataPoint: AxisType) => {
                        return { x: dataPoint.x, y: dataPoint.y };
                    }),
                    pointRadius: 5.5,
                    pointStyle: "circle",
                    pointBackgroundColor: [],
                    showLine: false,
                    backgroundColor: "aqua",
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontSize: 30,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: props.y_title,
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: props.x_title,
                    },
                },
            },
        },
    };
};
