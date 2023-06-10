import { StyledAppBar, StyledTabs, StyledSwipeableViews } from "./styles";
import { SelectionPanelType } from "../../types";
import { FC, ReactNode, useState } from "react";
import { Box, Tab } from "@mui/material";

export const SelectionPanel: FC<SelectionPanelType> = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <>
            <StyledAppBar position="static">
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                >
                    {props.titles.map((title: string, index: number) => {
                        return <Tab key={index} label={title} />;
                    })}
                </StyledTabs>
            </StyledAppBar>

            <StyledSwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                {props.components.map((component: ReactNode, index: number) => {
                    return <Box key={index}>{component}</Box>;
                })}
            </StyledSwipeableViews>
        </>
    );
};
