import { AxisType, ChartType } from "../../types";

const COLORS: string[] = ["red", "blue", "green", "yellow", "purple", "orange"];

export const chartData = (props: ChartType) => {
    return {
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
