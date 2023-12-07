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
import HttpService from "../../services/HttpService";
import CustomModal from "./CustomModal";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResendVerify = (props: any) => {
  console.log(props);
  const { modal } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const [book, setBook] = React.useState<any>({
    mode: "resend-verification-code",
    user: "",
  });

  const onToastClose = () => {
    setSnack({ onopen: false });
  };
  const [snack, setSnack] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });

  React.useEffect(() => {
    if (modal.user?.email) {
      setBook({ ...book, user: props.modal.user?.email });
    }
  }, [props.modal]);

  const handleSubmit = () => {
    if (book.user === "") {
      console.log("empty user");
      setSnack({
        onopen: true,
        severity: "error",
        onclose: onToastClose,
        message: "Please try again. Some details not supplied",
      });
      return;
    }

    console.log(book);
    setLoading(true);
    setLoaded(false);
    HttpService.postForm("auth", book)
      .then(
        (resp) => {
          console.log(resp);
          setSnack({ ...snack, onopen: true, message: resp.message });
          if (resp.status === 1) {
            setTimeout(() => {
              setSnack({ ...snack, onopen: false });
              modal.onclose();
            }, 5000);
          }
        },
        (error) => {
          setSnack({ ...snack, onopen: true, message: error.message });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postTicket
  };

  return (
    <>
      <Dialog
        fullScreen={modal.fullwidth || false}
        maxWidth={modal.maxwidth || "400px"}
        TransitionComponent={Transition}
        open={modal.onopen}
        onClose={modal.onclose}
        scroll={"paper"}
        aria-labelledby={"Me"}
      >
        <Toolbar
          sx={{
            flex: 1,
            alignItems: "center",
            p: "0 10px 0 20px !important",
            minHeight: "60px !important",
          }}
        >
          <div className="boldest txt-lg spacer"> Resend Verification Code</div>
          <IconButton color="error" onClick={modal.onclose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <DialogContent sx={{ p: "0", m: "0" }}>
          <section className="modal-width">
            <div className="px20 py10 flex flex-row align-items-center">
              <span className="px10 info-font">
                <i className="fas fa-exclamation-triangle"></i>
              </span>

              <div className="input spacer px10">
                Hi, you have not verified your registration.
                <br />
                You can click on the button below to resend your verification
                code to your email.
              </div>
            </div>
          </section>
        </DialogContent>
        <Divider />
        <DialogActions>
          <span className="spacer"></span>
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
            color="primary"
          >
            {loading ? "sending..." : "Resend Verification Code"}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomModal data={snack} />
    </>
  );
};

export default React.memo(ResendVerify);
