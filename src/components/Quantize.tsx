import { ChangeEvent, FC, useState } from "react";

export const Quantize: FC = () => {
    const [image, setImage] = useState<File | null>(null);

    return (
        <div>
            {image && (
                <div>
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(image)}
                    />
                    <br />
                    <button onClick={() => setImage(null)}>Remove</button>
                </div>
            )}

            <div className="background">
                <input
                    type="file"
                    name="myImage"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (event.target.files != null) {
                            setImage(event.target.files[0]);
                        }
                    }}
                />
            </div>
        </div>
    );
};
