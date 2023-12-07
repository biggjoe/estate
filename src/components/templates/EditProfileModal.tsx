import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import AutoForm from "./AutoForm";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  Add,
  Email,
  PersonOffOutlined,
  PersonOutlined,
  ReplyAllOutlined,
  Sms,
  WhatsApp,
} from "@mui/icons-material";
import HttpService from "../../services/HttpService";
import CustomToast from "./CustomToast";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditProfileModal = React.memo((props: any) => {
  let val = props.data;
  console.log(val);
  const [profile_data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  React.useEffect(() => {
    setData(val.data);
  }, []);

  const onToastClose = () => {
    setSnack({ onopen: false });
  };
  const [snack, setSnack] = useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });

  const handleSubmit = (data: any) => {
    data.mode = "update_profile";
    console.log(data);
    setLoading(true);
    setLoading(false);
    HttpService.postHeader("general", data)
      .then(
        (resp) => {
          console.log(resp);
          const sev = resp.status === 1 ? "success" : "error";
          setSnack({ onopen: true, message: resp.message, severity: sev });
          if (resp.status === 1) {
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(resp.user_data));
          }
        },
        (error) => {
          setSnack({ onopen: true, message: error.message });
        }
      )
      .finally(() => {
        setSnack({ onopen: false, onclose: onToastClose });
        setTimeout(() => {
          setLoading(false);
          setLoading(true);
          val.onclose();
        }, 4000);
      }); //postTicket
  };

  return (
    <>
      <Dialog
        fullScreen={true}
        TransitionComponent={Transition}
        open={val.onopen}
        onClose={val.onclose}
        scroll={"paper"}
        aria-labelledby={"Me"}
      >
        {/*    <DialogTitle id={val.id}>{val.title}</DialogTitle> */}
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={val.onclose}
              aria-label="close"
            >
              <PersonOutlined />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
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
        </AppBar>
        <Divider />
        <DialogContent sx={{ padding: "0px" }}>
          <Box
            sx={{
              padding: "20px",
              maxWidth: { xs: "100%", sm: "100%" },
              bgcolor: "background.paper",
            }}
          >
            <section className="pxy20">
              <AutoForm meta={val.form_data} submitHandler={handleSubmit} />
            </section>
          </Box>
        </DialogContent>
      </Dialog>
      <CustomToast data={snack} />
    </>
  );
});

export default React.memo(EditProfileModal);
