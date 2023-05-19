import { setChartData, useAppDispatch, useAppSelector } from "../../redux";
import { AxisType } from "../../types";
import {
    assignDataToCentroids,
    calculateNewCentroids,
    centroidsEqual,
    initializeCentroids,
} from "../algorithms/kMeans";

export const useAlgorithms = () => {
    const dispatch = useAppDispatch();
    const chart = useAppSelector((state) => state.chart);

    const kmeans = async () => {
        const k = chart.alg.props[0]
        let clusters: AxisType[][] = [];
        let newCentroids: AxisType[] = []

        // Step 1: Initialize centroids randomly
        let centroids = initializeCentroids(chart.data, k)
        dispatch(setChartData(centroids))

        while (!centroidsEqual(centroids, newCentroids)) {
            // Step 2: Assign each data point to the nearest centroid
            clusters = await assignDataToCentroids(chart.data, centroids);

            // Step 3: Recalculate the centroids
            newCentroids = await calculateNewCentroids(clusters);

            centroids = newCentroids;
        }
    };

    return { kmeans };
};
