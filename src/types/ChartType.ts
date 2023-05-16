import { AxisType } from "./AxisType";

export type ChartType = {
    title: string;
    x_title: string;
    y_title: string;
    data: AxisType[];
    alg: string;
};
