import { FC, ReactNode, useState } from "react";
import { AppBar, Tabs, Tab, Box, Grid } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { TabPanelType, SelectionPanelType } from "../types";

const TabPanel: FC<TabPanelType> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index: number) => {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
};

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
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {props.titles.map((title: string, index: number) => {
                        return (
                            <Tab
                                key={index}
                                label={title}
                                {...a11yProps(index)}
                            />
                        );
                    })}
                </Tabs>
            </AppBar>
            <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                {props.components.map((component: ReactNode, index: number) => {
                    return (
                        <TabPanel key={index} value={value} index={index}>
                            {component}
                        </TabPanel>
                    );
                })}
            </SwipeableViews>
        </>
    );
};
