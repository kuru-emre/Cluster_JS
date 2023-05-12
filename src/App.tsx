import { FC, useContext } from "react";
import {
    Footer,
    Header,
    Quantize,
    ScatterPlot,
    SelectionPanel,
} from "./components/main";
import { ThemeContext } from "./utils";
import "./styles/_main.scss";

export const App: FC = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`theme-container ${theme}`}>
            <Header theme={theme} />

            <SelectionPanel
                titles={["Dataset", "Image"]}
                components={[
                    <ScatterPlot dataset={{}} label={"test"} algorithm={""} />,
                    <Quantize />,
                ]}
            />

            <Footer theme={theme} />
        </div>
    );
};
