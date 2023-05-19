import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartType } from "../../types";

const initialState: ChartType = {
    title: "",
    x_title: "",
    y_title: "",
    data: [],
    alg: {
        name: "",
        props: [],
    },
};

export const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers: {
        setChartTitle: (state, action: PayloadAction<ChartType["title"]>) => {
            state.title = action.payload;
        },
        setChartXTitle: (state,action: PayloadAction<ChartType["x_title"]>) => {
            state.x_title = action.payload;
        },
        setChartYTitle: (state,action: PayloadAction<ChartType["y_title"]>) => {
            state.y_title = action.payload;
        },
        setChartData: (state, action: PayloadAction<ChartType["data"]>) => {
            state.data = action.payload;
        },
        setChartAlgName: (state, action: PayloadAction<ChartType["alg"]["name"]>) => {
            state.alg.name = action.payload;
            state.alg.props = []
        },
        setChartAlgProps: (state, action: PayloadAction<ChartType["alg"]["props"]>) => {
            state.alg.props[action.payload[0]] = action.payload[1] 
        },
        resetChart: () => {
            return initialState;
        },
    },
});

export const {
    setChartTitle,
    setChartXTitle,
    setChartYTitle,
    setChartData,
    setChartAlgName,
    setChartAlgProps,
    resetChart,
} = chartSlice.actions;
export default chartSlice.reducer;
