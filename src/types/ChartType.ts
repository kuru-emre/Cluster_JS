import { AlgorithmType, AxisType } from ".";

export type ChartType = {
  x_title: string;
  y_title: string;
  data: AxisType[][];
  alg: AlgorithmType;
  status?: string;
};
