import { FC, useContext } from "react";
import styles from "./Header.module.scss";
import { ThemeContext } from "../../../utils";
import { ThemeSwitcher } from "../../system";

export const Header: FC<{ theme: string }> = ({ theme }) => {
    const { toggle } = useContext(ThemeContext);

    return (
        <div className={styles.nav}>
            <div className={styles.waves}>
                <img src="img/waves.svg" alt="Waves" />
            </div>

            <h1 className={styles.title}>Cluster.js</h1>

            <ThemeSwitcher
                onClick={() => toggle(theme === "light" ? "dark" : "light")}
            />
        </div>
    );
};
