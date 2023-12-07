import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Close from "@mui/icons-material/Close";
import DatePipe from "../../pipes/DatePipe";

const TransitionUp = React.forwardRef(function Transition(
  props: any,
  ref: any
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HtmlModal(props: any) {
  const { modal, data } = props;
  const Component = data;
  console.log(modal);
  console.log(data);
  const hider = modal.hideduration ? modal.hideduration : 3000;
  setTimeout(() => {
    //modal.onclose();
  }, hider);
  const tmx = new Date().getTime();
  const createMarkup = (text: any) => {
    return { __html: text };
  };
  const handleClose = () => {
    modal.onclose();
  };
  return (
    <>
      <Dialog
        open={modal.onopen}
        aria-labelledby={"Me"}
        id={"md-" + tmx}
        TransitionComponent={TransitionUp}
      >
        <div className="flex flex-row align-items-center px10">
          <DialogTitle id={"label100"} sx={{ p: "10px" }}>
            <i className="fas fa-info-circle"></i> {modal.title || "Info"}
          </DialogTitle>

          <span className="spacer"></span>
          <IconButton onClick={handleClose} color="warning">
            <Close />
          </IconButton>
        </div>
        <DialogContent sx={{ p: "0 20px 20px 20px", m: "0" }}>
          <section className="modal-width">{<Component />}</section>
        </DialogContent>
      </Dialog>
    </>
  );
}
