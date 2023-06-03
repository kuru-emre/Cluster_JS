import { ChartDataset } from "chart.js";
import { ChartType } from "../../types";

const COLORS: string[] = ["red", "blue", "green", "yellow", "purple", "orange"];

const isClustered = (props: ChartType): ChartDataset<'scatter'>[] => {
    if (props.data.length == 1) {
        return [{
            label: "unclustered",
            data: [...props.data.flat()],
            pointRadius: 5,
            pointStyle: "circle",
            pointBackgroundColor: ["grey"]
        }]
    }

    const centroids = props.data[0];
    const clusters = props.data.slice(1);
    const datasets: ChartDataset<'scatter'>[] = []

    clusters.forEach((cluster, index) => {
        datasets.push({
            label: `Cluster_${index + 1}`,
            data: [centroids[index], ...cluster],
            pointRadius: [15].concat(cluster.map(() => 5)),
            pointStyle: ['triangle'].concat(cluster.map(() => "circle")),
            pointBackgroundColor: [centroids[index], ...cluster].map(() => COLORS[index])
        })
    })

    return datasets;
}

export const chartConfig = (props: ChartType) => {
    return {
        data: {
            datasets: isClustered(props)
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: props.title,
                    font: {
                        size: 18
                    }
                }
            },
            maintainAspectRatio: false,
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
