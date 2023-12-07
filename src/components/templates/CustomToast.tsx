import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
const TransitionUp = React.forwardRef(function Transition(
  props: any,
  ref: any
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomToast(props: any) {
  const val = props.data;
  const hider = val.hideduration ? val.hideduration : 3000;

  return (
    <>
      <Snackbar
        open={val.onopen}
        onClose={val.onclose}
        autoHideDuration={hider}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionUp}
        key={""}
      >
        <Alert
          onClose={val.onclose}
          severity={val.severity}
          sx={{ width: "100%" }}
        >
          <div className="py50 px10 txt-lg">{val.message}</div>
        </Alert>
      </Snackbar>
    </>
  );
}
