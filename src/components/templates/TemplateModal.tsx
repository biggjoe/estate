import React, { Component, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { handleBreakpoints } from "@mui/system";
import Button from "@mui/material/Button";

const TemplateModal = (props: any) => {
  const [title, setTitle] = React.useState(props.title);
  const [body, setBody] = React.useState(props.body);
  const [isOpen, setIsOpen] = React.useState(props.isopen);
  const [closehandle, setClosehandle] = React.useState(props.closehandle);

  useEffect(() => {}, []);
  let closer = props.closehandle;
  const closerHandle = () => {
    console.log("this is closer handler");
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const createMarkup = (text: any) => {
    return { __html: text };
  };
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby={"Me"}>
        <DialogTitle id={"label100"}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" color="initial">
              <div dangerouslySetInnerHTML={createMarkup(body)} />
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TemplateModal;
