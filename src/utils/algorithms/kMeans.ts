import { AxisType } from "../../types";

export const initializeCentroids = (data: AxisType[], k: number) => {
  return new Promise<AxisType[]>((resolve) => {
    const centroids: AxisType[] = [];

    setTimeout(() => {
      // Choose k random data points as centroids
      for (let i = 0; i < k; i++) {
        centroids.push(getRndPoint(data));
      }

      resolve(centroids);
    }, 1500);
  });
};

export const assignDataToCentroids = (
  data: AxisType[],
  centroids: AxisType[],
) => {
  return new Promise<AxisType[][]>((resolve) => {
    const clusters: Array<AxisType[]> = Array.from(
      { length: centroids.length },
      () => [],
    );

    setTimeout(() => {
      // Assign each data point to the nearest centroid
      for (const point of data) {
        const distances = centroids.map((centroid) =>
          euclideanDistance(point, centroid),
        );
        const nearestCentroidIndex = distances.indexOf(Math.min(...distances));
        clusters[nearestCentroidIndex].push(point);
      }

      resolve(clusters);
    }, 1500);
  });
};

export const calculateNewCentroids = (clusters: AxisType[][]) => {
  return new Promise<AxisType[]>((resolve) => {
    setTimeout(() => {
      const newCentroids = clusters.map((cluster) => {
        const clusterSize = cluster.length;

        // Calculate the mean of each feature
        const centroid = cluster.reduce(
          (accumulator, point) => {
            const xAxis = accumulator.x + point.x;
            const yAxis = accumulator.y + point.y;

            return { x: xAxis, y: yAxis };
          },
          { x: 0, y: 0 },
        );

        centroid.x = centroid.x / clusterSize;
        centroid.y = centroid.y / clusterSize;

        return centroid;
      });

      resolve(newCentroids);
    }, 1500);
  });
};

const getRndPoint = (data: AxisType[]) => {
  const max_X = Math.max(...data.map((axis) => axis.x));
  const max_Y = Math.max(...data.map((axis) => axis.y));
  const min_X = Math.min(...data.map((axis) => axis.x));
  const min_Y = Math.min(...data.map((axis) => axis.y));

  const randX = Math.floor(Math.random() * (max_X - min_X)) + min_X;
  const randY = Math.floor(Math.random() * (max_Y - min_Y)) + min_Y;

  return { x: randX, y: randY };
};

const euclideanDistance = (pointA: AxisType, pointB: AxisType) => {
  return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y);
};

export const centroidsEqual = (
  centroidsA: AxisType[],
  centroidsB: AxisType[],
) => {
  return JSON.stringify(centroidsA) === JSON.stringify(centroidsB);
};
