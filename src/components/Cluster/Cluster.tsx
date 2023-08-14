import {
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { FileReader, DataTable, Options } from "../index";
import { useAppSelector } from "../../redux";
import { Scatter } from "react-chartjs-2";
import { chartConfig } from "../../utils";
import { Grid, Grow } from "@mui/material";
import { StyledBox, StyledScatterGrid } from "./styles";
import { FC } from "react";

Chart.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const Cluster: FC = () => {
  const table = useAppSelector((state) => state.table);
  const chart = useAppSelector((state) => state.chart);
  const loaded = table.columns.length > 0 ?? false;

  return (
    <StyledBox>
      {!loaded ? (
        <FileReader />
      ) : (
        <Grow in={loaded}>
          <Grid container spacing={5}>
            <Grid item xs lg={5}>
              <DataTable columns={table.columns} rows={table.rows} />
            </Grid>
            <Grid item container xs lg={7}>
              <StyledScatterGrid item xs={12}>
                <Scatter {...chartConfig(chart)} />
              </StyledScatterGrid>
              <Grid item xs>
                <Options />
              </Grid>
            </Grid>
          </Grid>
        </Grow>
      )}
    </StyledBox>
  );
};
