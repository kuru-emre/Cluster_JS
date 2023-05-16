export const kMeans = (data, props) => {
    const { k } = props;
    // Step 1: Initialize centroids randomly
    let centroids = initializeCentroids(data, k);

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        // Step 2: Assign each data point to the nearest centroid
        const clusters = assignDataToCentroids(data, centroids);

        // Step 3: Recalculate the centroids
        const newCentroids = calculateNewCentroids(clusters);

        // Step 4: Check convergence
        if (centroidsEqual(centroids, newCentroids)) {
            break;
        }

        centroids = newCentroids;
    }

    return {
        clusters,
        centroids,
    };
};

export const initializeCentroids = (data, k) => {
    const centroids = [];

    // Choose k random data points as centroids
    for (let i = 0; i < k; i++) {
        const randomX = Math.floor(Math.random() * data.length);
        const randomY = Math.floor(Math.random() * data.length);
        centroids.push({ x: randomX, y: randomY });
    }

    return centroids;
};

export const assignDataToCentroids = (data, centroids) => {
    const clusters = new Array(centroids.length).fill().map(() => []);

    // Assign each data point to the nearest centroid
    for (const point of data) {
        const distances = centroids.map((centroid) =>
            euclideanDistance(point, centroid)
        );
        const nearestCentroidIndex = distances.indexOf(Math.min(...distances));
        clusters[nearestCentroidIndex].push(point);
    }

    return clusters;
};

export const calculateNewCentroids = (clusters) => {
    return clusters.map((cluster) => {
        const clusterSize = cluster.length;

        // Calculate the mean of each feature
        const centroid = cluster.reduce((accumulator, point) => {
            return accumulator.map((value, i) => value + point[i]);
        }, new Array(cluster[0].length).fill(0));

        return centroid.map((value) => value / clusterSize);
    });
};

const euclideanDistance = (pointA, pointB) => {
    return Math.sqrt(
        pointA.reduce(
            (accumulator, value, i) =>
                accumulator + Math.pow(value - pointB[i], 2),
            0
        )
    );
};

export const centroidsEqual = (centroidsA, centroidsB) => {
    return JSON.stringify(centroidsA) === JSON.stringify(centroidsB);
};
