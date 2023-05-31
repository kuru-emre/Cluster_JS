import { setCentroids, setClusters, useAppDispatch, useAppSelector } from "../../redux";
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
        dispatch(setCentroids(centroids))

        while (!centroidsEqual(centroids, newCentroids)) {
            
            clusters = await assignDataToCentroids(chart.data, centroids);
            dispatch(setClusters(clusters))

            // Step 3: Recalculate the centroids
            newCentroids = await calculateNewCentroids(clusters);
            dispatch(setCentroids(newCentroids))


        }
    };

    return { kmeans };
};
