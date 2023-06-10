// export const quantize = (input: File, k: number) => {
//     const reader = new FileReader();

//     reader.onload = function (event) {
//         const img = new Image();

//         img.onload = function () {
//             const canvas = document.createElement('canvas');
//             canvas.width = img.width;
//             canvas.height = img.height;

//             const ctx = canvas.getContext('2d');
//             ctx?.drawImage(img, 0, 0);

//             const imgData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
//             const pixels = imgData?.data;
//             console.log(pixels);
//         };

//         img.src = event.target?.result as string;
//     };

//     reader.readAsDataURL(input);
// };


// const initializeCentroids = (data: number[][], k: number) => {
//     const centroids: number[][] = [];

//     // Choose k random data points as centroids
//     for (let i = 0; i < k; i++) {
//         centroids.push(getRndPoint(data));
//     }


// };

// const assignDataToCentroids = (data: number[][], centroids: number[][]) => {
//     const clusters: Array<AxisType[]> = Array.from({ length: centroids.length }, () => []);

//     // Assign each data point to the nearest centroid
//     for (const point of data) {
//         const distances = centroids.map((centroid) =>
//             euclideanDistance(point, centroid)
//         );
//         const nearestCentroidIndex = distances.indexOf(Math.min(...distances));
//         clusters[nearestCentroidIndex].push(point);
//     }

// };

// const calculateNewCentroids = (clusters: number[][]) => {
//     const newCentroids = clusters.map((cluster) => {
//         const clusterSize = cluster.length;

//         // Calculate the mean of each feature
//         const centroid = cluster.reduce(
//             (accumulator, point) => {
//                 const xAxis = accumulator.x + point.x;
//                 const yAxis = accumulator.y + point.y;

//                 return { x: xAxis, y: yAxis };
//             },
//             { x: 0, y: 0 }
//         );

//         centroid.x = centroid.x / clusterSize;
//         centroid.y = centroid.y / clusterSize;

//         return centroid;
//     });
// };

// const getRndPoint = (data: number[][]) => {
//     const max_X = Math.max(...data.map(axis => axis.x))
//     const max_Y = Math.max(...data.map(axis => axis.y))
//     const min_X = Math.min(...data.map(axis => axis.x))
//     const min_Y = Math.min(...data.map(axis => axis.y))

//     const randX = Math.floor(Math.random() * (max_X - min_X)) + min_X;
//     const randY = Math.floor(Math.random() * (max_Y - min_Y)) + min_Y;

//     return { x: randX, y: randY };
// }

// const euclideanDistance = (pointA: number[], pointB: number[]) => {
//     return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y);
// };

// export const centroidsEqual = (centroidsA: AxisType[], centroidsB: AxisType[]) => {
//     return JSON.stringify(centroidsA) === JSON.stringify(centroidsB);
// };
