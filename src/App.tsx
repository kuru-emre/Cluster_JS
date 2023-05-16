import { FC } from "react";
import {
    Footer,
    Header,
    Quantize,
    Cluster,
    SelectionPanel,
} from "./components";

export const App: FC = () => {
    return (
        <div>
            <Header />

            <SelectionPanel
                titles={["Dataset", "Image"]}
                components={[<Cluster />, <Quantize />]}
            />

            <Footer />
        </div>
    );
};
