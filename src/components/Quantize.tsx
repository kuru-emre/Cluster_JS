import { ChangeEvent, FC } from "react";
import { useAppDispatch, useAppSelector, setImage } from "../redux";

export const Quantize: FC = () => {
  const dispatch = useAppDispatch();
  // const { quantizer } = useAlgorithms();
  const input = useAppSelector((state) => state.image);

  return (
    <div>
      {input.img && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(input.img)}
          />
          <br />
          <button onClick={() => dispatch(setImage(null))}>Remove</button>
        </div>
      )}

      <div className="background">
        <input
          type="file"
          accept="image/*"
          name="myImage"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.files != null) {
              dispatch(setImage(event.target.files[0]));
            }
          }}
        />
      </div>
    </div>
  );
};
