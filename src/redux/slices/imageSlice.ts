import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageType } from "../../types";

const initialState: ImageType = {
  img: null,
  k: 0,
  pixel_dataset: [],
  quantizedImg: null,
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<ImageType["img"]>) => {
      state.img = action.payload;
    },
    setK: (state, action: PayloadAction<ImageType["k"]>) => {
      state.k = action.payload;
    },
    setImagePixelDataset: (
      state,
      action: PayloadAction<ImageType["pixel_dataset"]>,
    ) => {
      state.pixel_dataset = action.payload;
    },
    setQuantizedImg: (
      state,
      action: PayloadAction<ImageType["quantizedImg"]>,
    ) => {
      state.quantizedImg = action.payload;
    },
    resetImage: () => {
      return { ...initialState };
    },
  },
});

export const { setImage, setImagePixelDataset, setQuantizedImg, resetImage } =
  imageSlice.actions;
export default imageSlice.reducer;
