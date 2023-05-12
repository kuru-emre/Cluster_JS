import { FC } from "react";
import styles from "./Footer.module.scss";

export const Footer: FC<{ theme: string }> = ({ theme }) => {
    return <div className={theme}>Footer: FC</div>;
};
