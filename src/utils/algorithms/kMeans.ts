import { AxisType } from "../../types";

export const initializeCentroids = (data: AxisType[], k: number) => {
    return new Promise(async (resolve) => {
        const centroids: AxisType[] = [];

        setTimeout(() => {
            // Choose k random data points as centroids
            for (let i = 0; i < k; i++) {
                const randomX = Math.floor(Math.random() * data.length);
                const randomY = Math.floor(Math.random() * data.length);
                centroids.push({ x: randomX, y: randomY });
            }

            resolve(centroids)

        }, 2000);
    })
};

export const assignDataToCentroids = (data: AxisType[], centroids: AxisType[]) => {
    return new Promise(async (resolve) => {
        const clusters = new Array(centroids.length).fill([]).map(() => []);

        setTimeout(() => {
            // Assign each data point to the nearest centroid
            for (const point of data) {
                const distances = centroids.map((centroid) =>
                    euclideanDistance(point, centroid)
                );
                const nearestCentroidIndex = distances.indexOf(Math.min(...distances));
                clusters[nearestCentroidIndex].push(point);
            }

            resolve(clusters);

        }, 2000);
    })
};

export const calculateNewCentroids = async (clusters: AxisType[][]) => {
    return clusters.map((cluster) => {
        const clusterSize = cluster.length;

        // Calculate the mean of each feature
        const centroid = cluster.reduce(
            (accumulator, point) => {
                const xAxis = accumulator.x + point.x;
                const yAxis = accumulator.y + point.y;

                return { x: xAxis, y: yAxis };
            },
            { x: 0, y: 0 }
        );

        centroid.x = centroid.x / clusterSize;
        centroid.y = centroid.y / clusterSize;

        return centroid;
    });
};

const euclideanDistance = (pointA: AxisType, pointB: AxisType) => {
    return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y);
};

export const centroidsEqual = (centroidsA: AxisType[], centroidsB: AxisType[]) => {
    return JSON.stringify(centroidsA) === JSON.stringify(centroidsB);
};
