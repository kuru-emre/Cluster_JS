import { styled, useMediaQuery } from "@mui/material";

type TitleProps = {
  size: number;
  strokeColor?: string;
};

export const StyledTitle = styled("div")<TitleProps>(({
  theme,
  size,
  strokeColor,
}) => {
  const ifMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (ifMobile) {
    size = size / 2;
  }

  const shadow = size / 10;
  const step = shadow / 12;
  const textShadowConfig = `${shadow}px ${shadow}px ${
    theme.palette.primary.main
  }, 
                              ${shadow + step}px ${shadow + step}px ${
                                theme.palette.secondary.main
                              }, 
                              ${shadow + step * 10}px ${shadow + step * 10}px ${
                                theme.palette.secondary.main
                              }`;

  return {
    padding: theme.spacing(2),
    textAlign: "center",
    WebkitTextStroke: `${size * 0.05}px`,
    WebkitTextStrokeColor: strokeColor ?? `white`,
    fontSize: `${size}px`,
    fontWeight: 800,
    textTransform: "uppercase",
    fontStyle: "italic",
    color: "transparent",
    whiteSpace: "nowrap",
    textShadow: textShadowConfig,
  };
});
