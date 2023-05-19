import { useAppDispatch, useAppSelector } from "../../redux";
import { AxisType } from "../../types";

export const useAlgorithms = () => {
    const dispatch = useAppDispatch();
    const chart = useAppSelector((state) => state.chart)

    const kmeans = async () => {
        let clusters: AxisType[][] = [];

        console.log("meow");

        // Step 1: Initialize centroids randomly
        let centroids = initializeCentroids(data, k);

        for (let iteration = 0; iteration < 10; iteration++) {
            // Step 2: Assign each data point to the nearest centroid
            clusters = assignDataToCentroids(data, centroids);

            // Step 3: Recalculate the centroids
            const newCentroids = calculateNewCentroids(clusters);

            // Step 4: Check convergence
            if (centroidsEqual(centroids, newCentroids)) {
                break;
            }

            centroids = newCentroids;
        }
    };

    return {kmeans}
};
