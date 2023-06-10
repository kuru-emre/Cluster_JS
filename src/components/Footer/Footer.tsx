import { Divider, Typography, Box } from "@mui/material";
import { Copyright } from '@mui/icons-material';
import { StyledFooterBox } from "./styles";
import { StyledTitle } from "../Header";
import { FC } from "react";

export const Footer: FC = () => {
    return (
        <StyledFooterBox>
            <StyledTitle size={20}>Cluster.js</StyledTitle>
            <Divider sx={{ flexGrow: 1 }} />
            <Box display={'flex'} alignItems={'center'}>
                <Copyright sx={{ color: "text.secondary", margin: 1 }} />
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                >
                    2023 Cluster.js. All rights reserved.
                </Typography>
            </Box>
        </StyledFooterBox>
    )
};
