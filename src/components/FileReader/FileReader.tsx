import {
  useAppDispatch,
  setTableColumns,
  setTableRows,
  setTableName,
} from "../../redux";
import { Grid, Typography, Divider, Button, TextField } from "@mui/material";
import { DriveFolderUpload, CloudDownload } from "@mui/icons-material";
import { StyledUploadBox } from "./styles";
import { fetchURL } from "../../utils";
import { RowType } from "../../types";
import { read, utils } from "xlsx";
import { FC, useRef } from "react";
import { useSnackbar } from "notistack";

export const FileReader: FC = () => {
  const textURL = useRef<HTMLTextAreaElement>();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const readData = async (
    file: File | undefined,
    url: string | undefined = undefined,
  ) => {
    if (url) {
      file = (await fetchURL(url, "dataset")) as File;

      if (file === null) {
        enqueueSnackbar("URL does not seem to work", { variant: "error" });
        return;
      }
    }

    const dataset = await file?.arrayBuffer();
    const workbook = read(dataset);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const columns = utils.sheet_to_json<string[]>(worksheet, {
      header: 1,
      defval: "",
    })[0];

    const rows = utils.sheet_to_json<RowType>(worksheet);

    dispatch(setTableName(file?.name));
    dispatch(setTableColumns(columns));
    dispatch(setTableRows(rows));
    enqueueSnackbar("You are ready to start!", { variant: "success" });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <Typography variant="h6" sx={{ color: "text.secondary", padding: 2 }}>
          Are you facing challenges in understanding the patterns in your
          spreadsheet?
        </Typography>
        <Divider />
        <Typography variant="body1" sx={{ padding: 2, paddingBottom: 5 }}>
          Cluster.js is pleased to inform you that its common clustering
          algorithms can assist you in categorizing similar data points
          together. By doing so, this system will enable you to identify
          significant patterns, outliers, and concealed relationships.
          Regardless of whether you have to analyze customer behavior, market
          trends, or scientific data. Utilizing cluster.js will provide you with
          the ability to make well informed decisions and acquire valuable
          insights.
        </Typography>
        <Divider />
        <Typography variant="h6" sx={{ padding: 2, color: "text.secondary" }}>
          You can upload your local spreadsheet or use an url to access it
          remotely.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <StyledUploadBox>
              <Button
                variant="contained"
                component="label"
                sx={{ display: "flex", gap: 2 }}
              >
                <DriveFolderUpload /> Local Upload
                <input
                  hidden
                  accept=".csv, .ods, .xlsx"
                  type="file"
                  onChange={(e) => {
                    readData(e.target.files?.[0]);
                  }}
                />
              </Button>
            </StyledUploadBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <StyledUploadBox>
              <TextField
                id="dataset-url"
                name="url"
                label="Enter URL"
                variant="outlined"
                inputRef={textURL}
              />
              <Button
                variant="contained"
                onClick={() => readData(undefined, textURL.current?.value)}
                sx={{ display: "flex", gap: 2 }}
              >
                <CloudDownload /> Pull
              </Button>
            </StyledUploadBox>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <img src="img/Data-report.svg" style={{ width: "100%" }} />
      </Grid>
    </Grid>
  );
};
