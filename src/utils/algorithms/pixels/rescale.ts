// Given width w and height h, rescale the dimensions to satisfy
// the specified number of pixels.
export const rescale_dimensions = (w: number, h: number, pixels: number) => {
    const rescaled_w = Math.floor((w / h) * Math.sqrt(pixels / (w / h)));
    const rescaled_h = Math.floor(Math.sqrt(pixels / (w / h)));
    return [rescaled_w, rescaled_h];
};
