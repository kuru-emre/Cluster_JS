// Takes an <img> as input. Returns a quantized data URL.
export const quantize = (img: HTMLImageElement, colors: Array<number>) => {
    const width = img.width;
    const height = img.height;
    const source_canvas = document.createElement("canvas");
    source_canvas.width = width;
    source_canvas.height = height;
    const source_context = source_canvas.getContext("2d");
    source_context?.drawImage(img, 0, 0, width, height);

    // flattened_*_data = [R, G, B, a, R, G, B, a, ...] where
    // (R, G, B, a) groups each correspond to a single pixel, and they are
    // column-major ordered.
    const flattened_source_data = source_context?.getImageData(
        0,
        0,
        width,
        height
    ).data;
    const n_pixels = width * height;
    const n_channels = flattened_source_data?.length / n_pixels;

    const flattened_quantized_data = new Uint8ClampedArray(
        flattened_source_data.length
    );

    // Set each pixel to its nearest color.
    const current_pixel = new Uint8ClampedArray(n_channels);
    for (let i = 0; i < flattened_source_data.length; i += n_channels) {
        // This for loop approach is faster than using Array.slice().
        for (let j = 0; j < n_channels; ++j) {
            current_pixel[j] = flattened_source_data[i + j];
        }
        const nearest_color_index = nearest_neighbor(current_pixel, colors);
        const nearest_color = centroids[nearest_color_index];
        for (let j = 0; j < nearest_color.length; ++j) {
            flattened_quantized_data[i + j] = nearest_color[j];
        }
    }

    const quantized_canvas = document.createElement("canvas");
    quantized_canvas.width = width;
    quantized_canvas.height = height;
    const quantized_context = quantized_canvas.getContext("2d");

    const image = quantized_context.createImageData(width, height);
    image.data.set(flattened_quantized_data);
    quantized_context.putImageData(image, 0, 0);
    const data_url = quantized_canvas.toDataURL();
    return data_url;
};
