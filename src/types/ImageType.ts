export type ImageType = {
    img: File | null;
    k: number;
    pixel_dataset?: number[][];
    quantizedImg?: File | null;
}