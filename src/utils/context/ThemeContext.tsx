import {
    createContext,
    useState,
    FC,
    PropsWithChildren,
    SetStateAction,
    Dispatch,
} from "react";

type ThemeContextType = {
    theme: string;
    toggle: Dispatch<SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggle: () => {
        null;
    },
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{ theme: theme, toggle: setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
