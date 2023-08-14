import {
  useAppSelector,
  useAppDispatch,
  setChartData,
  setChartYTitle,
  setChartXTitle,
  setChartAlgName,
  setChartAlgProps,
  resetChart,
} from "../redux";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { algorithms, useAlgorithms } from "../utils";
import { useSnackbar } from "notistack";

export const Options: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [preventCallback, setPreventCallback] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const chart = useAppSelector((state) => state.chart);
  const table = useAppSelector((state) => state.table);
  const dispatch = useAppDispatch();
  const { kmeans } = useAlgorithms();

  const startCluster = async () => {
    if (chart.alg.props.every((item) => item <= 0 || item > 5)) {
      enqueueSnackbar(
        `Cluster.js does not support ${chart.alg.props} clusters.`,
        { variant: "error" },
      );
      return;
    }

    if (chart.alg.name == "" && preventCallback) {
      enqueueSnackbar("Make sure to select your algorithm", {
        variant: "error",
      });
      return;
    }

    setPreventCallback(true);

    switch (chart.alg.name) {
      case "kmeans":
        try {
          setIsLoading(true);
          await kmeans();
          break;
        } catch (error) {
          console.log(error);
          break;
        }
      default:
        break;
    }

    setIsLoading(false);
    setShowResult(true);
    enqueueSnackbar("Clustering finished successfully!", {
      variant: "success",
    });
  };

  const resetCluster = () => {
    if (!isLoading) {
      setPreventCallback(false);
      setShowResult(false);
      dispatch(resetChart());
      enqueueSnackbar("Clustering has been reset", { variant: "success" });
    }
  };

  useEffect(() => {
    const data = table.rows?.map((dataPoint) => ({
      x: dataPoint[chart.x_title],
      y: dataPoint[chart.y_title],
    }));

    dispatch(setChartData([data]));
  }, [chart.x_title, chart.y_title]);

  return (
    <Grid container spacing={3}>
      {isLoading ? (
        <Grid item sm={12}>
          <Typography>{chart.status}</Typography>
          <LinearProgress />
        </Grid>
      ) : showResult ? (
        <Grid item sm={12}>
          <Alert severity="success" action={<Button>Download as Image</Button>}>
            Clustering finished successfully!
          </Alert>
        </Grid>
      ) : null}

      <Grid item xs={12} lg={4}>
        <FormControl sx={{ width: 1 }}>
          <InputLabel id="x-axis">X-Axis</InputLabel>
          <Select
            labelId="x-axis-label"
            id="x-axis"
            value={chart.x_title}
            label="x-Axis"
            onChange={(e) => dispatch(setChartXTitle(e.target.value))}
          >
            {table.columns.map((column, index) => {
              const isNumber = typeof table.rows[index][column] === "number";

              if (column !== chart.y_title && isNumber) {
                return (
                  <MenuItem key={`x-${index}`} value={column}>
                    {column}
                  </MenuItem>
                );
              }

              return null;
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={4}>
        <FormControl sx={{ width: 1 }}>
          <InputLabel id="y-axis">Y-Axis</InputLabel>
          <Select
            labelId="y-axis-label"
            id="y-axis"
            value={chart.y_title}
            label="y-Axis"
            onChange={(e) => dispatch(setChartYTitle(e.target.value))}
          >
            {table.columns.map((column, index) => {
              const isNumber = typeof table.rows[index][column] === "number";

              if (column !== chart.x_title && isNumber) {
                return (
                  <MenuItem key={`y-${index}`} value={column}>
                    {column}
                  </MenuItem>
                );
              }

              return null;
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={4}>
        <FormControl sx={{ width: 1 }}>
          <InputLabel id="algorithm">Algorithm</InputLabel>
          <Select
            labelId="algorithm-label"
            id="algorithm"
            value={chart.alg.name}
            label="Algorithm"
            onChange={(e) => dispatch(setChartAlgName(e.target.value))}
          >
            {Object.keys(algorithms).map((alg, index) => (
              <MenuItem key={`alg-${index}`} value={alg}>
                {alg}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {chart.alg.name !== "" &&
        algorithms[chart.alg.name]?.map((prop, index) => (
          <Grid item xs={12} lg={4} key={index}>
            <TextField
              key={`${chart.alg.name}-${prop}`}
              sx={{ width: 1 }}
              id="chart-title"
              label={prop}
              type="number"
              variant="outlined"
              onChange={(e) =>
                dispatch(setChartAlgProps([index, Number(e.target.value)]))
              }
              value={chart.alg.props[index] ?? 0}
            />
          </Grid>
        ))}

      {chart.alg.props.length > 0 && (
        <Grid item xs={12} lg>
          <Button
            sx={{ width: 1, height: 1 }}
            variant="contained"
            onClick={() => (preventCallback ? resetCluster() : startCluster())}
          >
            {preventCallback ? (
              <Typography>Reset Cluster</Typography>
            ) : (
              <Typography>Start Cluster</Typography>
            )}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
