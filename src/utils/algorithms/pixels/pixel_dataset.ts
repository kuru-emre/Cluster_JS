import { rescale_dimensions } from "./rescale";

// Given an Image, return a dataset with pixel colors.
// If resized_pixels > 0, image will be resized prior to building
// the dataset.
// return: [[R,G,B,a], [R,G,B,a], [R,G,B,a], ...]
export const get_pixel_dataset = (
    img: HTMLImageElement,
    resized_pixels: number
) => {
    if (resized_pixels === undefined) resized_pixels = -1;
    // Get pixel colors from a <canvas> with the image
    const canvas = document.createElement("canvas");
    const img_n_pixels = img.width * img.height;
    let canvas_width = img.width;
    let canvas_height = img.height;
    if (resized_pixels > 0 && img_n_pixels > resized_pixels) {
        const rescaled = rescale_dimensions(
            img.width,
            img.height,
            resized_pixels
        );
        canvas_width = rescaled[0];
        canvas_height = rescaled[1];
    }
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    const canvas_n_pixels = canvas_width * canvas_height;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, canvas_width, canvas_height);
    const flattened_dataset = context.getImageData(
        0,
        0,
        canvas_width,
        canvas_height
    ).data;
    const n_channels = flattened_dataset.length / canvas_n_pixels;
    const dataset = [];
    for (let i = 0; i < flattened_dataset.length; i += n_channels) {
        dataset.push(flattened_dataset.slice(i, i + n_channels));
    }
    return dataset;
};
