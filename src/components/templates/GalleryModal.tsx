import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Close from "@mui/icons-material/Close";

const TransitionUp = React.forwardRef(function Transition(
  props: any,
  ref: any
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GalleryModal(props: any) {
  const { onopen, onclose, data } = props;

  const createMarkup = (text: any) => {
    return { __html: text };
  };
  const handleClose = () => {
    onclose();
  };
  return (
    <>
      <Dialog
        className="gallery-modal"
        open={onopen}
        aria-labelledby={"Me"}
        id={"md-"}
        sx={{ background: "transparent" }}
        TransitionComponent={TransitionUp}
      >
        <div className="flex flex-row align-items-center px10">
          <span className="spacer"></span>
          <IconButton onClick={handleClose} color="warning">
            <Close />
          </IconButton>
        </div>

        <DialogContent sx={{ p: "0 20px 20px 20px", m: "0" }}>
          <section className="gallery-modal-width">
            {JSON.stringify(data)}
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
