import { FC } from "react";
import {
    Footer,
    Header,
    Quantize,
    Cluster,
    SelectionPanel,
} from "./components";
import { Grid } from "@mui/material";

export const App: FC = () => {
    return (
        <Grid container margin={"auto"} xs={12} lg={8}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <SelectionPanel
                    titles={["Dataset", "Image"]}
                    components={[<Cluster />, <Quantize />]}
                />
            </Grid>
            <Grid item xs={12}>
                <Footer />
            </Grid>
        </Grid>
    );
};
