import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const ResponseAlert = (props: any) => {
  const val = props.data;

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {val.status === 0 && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {val.message}
        </Alert>
      )}

      {val.status === 10000 && (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          {val.message}
        </Alert>
      )}

      {val.status !== 1 && val.status !== 0 && (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          {val.message}
        </Alert>
      )}

      {val.status === 1 && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {val.message}
        </Alert>
      )}
    </Stack>
  );
};

export default React.memo(ResponseAlert);
