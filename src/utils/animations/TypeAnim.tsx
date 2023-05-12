import { FC, useEffect, useRef } from "react";
import Typed from "typed.js";

export const TypeAnim: FC<{ text: string; speed: number }> = ({
    text,
    speed,
}) => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [text],
            typeSpeed: speed,
        });

        return () => {
            typed.destroy();
        };
    }, [speed, text]);

    return (
        <div className="App">
            <span ref={el} />
        </div>
    );
};
