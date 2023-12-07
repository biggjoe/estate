import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Slide,
  Toolbar,
  AppBar,
  Divider,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  Dialog,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmModal = (props: any) => {
  const val = props.data;
  console.log(props);
  return (
    <>
      <Dialog
        fullScreen={val.fullwidth || false}
        maxWidth={val.maxwidth || "400px"}
        TransitionComponent={Transition}
        open={val.onopen}
        onClose={val.onclose}
        scroll={"paper"}
        aria-labelledby={"Me"}
      >
        <Toolbar
          sx={{ p: "0 10px 0 20px !important", minHeight: "60px !important" }}
        >
          <IconButton edge="start" color="inherit" aria-label="close">
            <InfoOutlined />
          </IconButton>
          <Typography sx={{ ml: "0px", flex: 1 }} variant="h6" component="div">
            {val.title}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={val.onclose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <DialogContent>
          <section>
            <div
              className="pxy0 txt-lg"
              dangerouslySetInnerHTML={{ __html: val.message }}
            ></div>
            <div className="modal-width"> {val.loading_text}</div>
          </section>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={val.onclose} color="warning">
            Cancel
          </Button>
          <Button
            disabled={val.loading}
            onClick={() => val.onaccept(val)}
            color="primary"
          >
            {val.loading ? "" : "Yes, Proceed"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(ConfirmModal);
