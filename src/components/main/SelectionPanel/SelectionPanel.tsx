import { FC, ReactNode, useState } from "react";
import { AppBar, Tabs, Tab, Typography, Box, useTheme } from "@mui/material";
import SwipeableViews from "react-swipeable-views";

interface TabPanelProps {
    children?: ReactNode;
    dir?: string;
    index: number;
    value: number;
}

interface TabPanelSetup {
    titles: string[];
    components: ReactNode[];
}

const TabPanel: FC<TabPanelProps> = (props) => {
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
                    <Typography>{children}</Typography>
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

export const SelectionPanel: FC<TabPanelSetup> = (props) => {
    const { titles, components } = props;
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                width: "65%",
                height: "100%",
                margin: "auto",
            }}
        >
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {titles.map((title: string, index: number) => {
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
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {components.map((component: ReactNode, index: number) => {
                    return (
                        <TabPanel
                            value={value}
                            index={index}
                            dir={theme.direction}
                        >
                            {component}
                        </TabPanel>
                    );
                })}
            </SwipeableViews>
        </Box>
    );
};
