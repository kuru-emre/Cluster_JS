import { setChartData, setStatus, useAppDispatch, useAppSelector } from "../../redux";
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
        // Initialize required variables.
        const k = chart.alg.props[0]
        const data = chart.data.flat();
        const start = true;
        let tries = 0

        // Initialize empty array (type of AxisType[]) to fill data later.
        let clusters: AxisType[][] = [];
        let centroids: AxisType[] = [];
        let newCentroids: AxisType[] = [];

        // Fill centroids arrays with randomized, k-length centroid points, update the global state.
        const kmeansIteration = async () => {
            if (tries >= 3) {
                dispatch(setStatus(`Too complex for k=${k} clusters. Try reducing the k parameter.`));
                return
            }

            centroids = await initializeCentroids(data, k);
            dispatch(setStatus("Initializing random centroids..."));
            dispatch(setChartData([centroids, data]));


            // Loop over data points, assign clusters and re-calculate new centroid locations until current and new centroids are same.
            while (start) {
                clusters = await assignDataToCentroids(data, centroids);
                dispatch(setStatus("Assigning point to centroids..."));

                for (const cluster of clusters) {
                    if (cluster.length === 0) {
                        dispatch(setStatus("Having difficulties, trying again..."));
                        await kmeansIteration();
                        tries++;
                    }
                }

                dispatch(setChartData([centroids, ...clusters]));

                newCentroids = await calculateNewCentroids(clusters);
                dispatch(setChartData([newCentroids, ...clusters]));
                dispatch(setStatus("Generating new centroids..."));

                if (centroidsEqual(centroids, newCentroids)) {
                    break;
                }

                centroids = newCentroids;
            }
        }

        await kmeansIteration()

    };

    return { kmeans };
};
