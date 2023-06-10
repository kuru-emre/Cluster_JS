import { FC } from "react";
import { Footer, Header, Quantize, Cluster, SelectionPanel } from ".";
import { Box, Grid, SxProps, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(4),
    height: "100vh",
    width: '75%',
    flexDirection: "column",
    margin: "auto",
    [theme.breakpoints.down('sm')]: { width: '100%' }
}));

const mainGrid: SxProps = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
}

export const App: FC = () => {
    return (
        <StyledBox>
            <Grid item>
                <Header />
            </Grid>
            <Grid item sx={mainGrid}>
                <SelectionPanel
                    titles={["Dataset", "Image"]}
                    components={[<Cluster />, <Quantize />]}
                />
            </Grid>
            <Grid item>
                <Footer />
            </Grid>
        </StyledBox>
    );
};
