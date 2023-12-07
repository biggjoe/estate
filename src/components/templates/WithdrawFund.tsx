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

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import HttpService from "../../services/HttpService";
import CustomModal from "./CustomModal";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WithdrawFund = (props: any) => {
  console.log(props);
  const { user } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const CloseModal = () => {
    setVal({ ...val, onopen: false });
  };
  const [val, setVal] = React.useState<any>({
    onopen: false,
    onclose: CloseModal,
  });
  const [book, setBook] = React.useState<any>({
    user: "",
    amount: 0,
    mode: "request-widthdraw-fund",
  });

  React.useEffect(() => {
    setBook({ ...book, user: user });
  }, [user]);

  const onToastClose = () => {
    setSnack({ onopen: false });
  };
  const [snack, setSnack] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });

  const handleSubmit = () => {
    console.log(book);
    if (book.user === "" || book.amount === "") {
      setSnack({
        onopen: true,
        severity: "error",
        onclose: onToastClose,
        message: "Please supply yamount to withdraw",
      });
      return;
    }

    setLoading(true);
    setLoaded(false);
    HttpService.postForm("general", book)
      .then(
        (resp) => {
          console.log(resp);
          setSnack({
            ...snack,
            onopen: true,
            message: resp.message,
            onclose: onToastClose,
          });
          if (resp.status === 1) {
            HttpService.refreshUser();
            setTimeout(() => {
              setSnack({ ...snack, onopen: false, onclose: onToastClose });
              val.onclose();
            }, 5000);
          }
        },
        (error) => {
          setSnack({
            ...snack,
            onopen: true,
            message: error.message,
            onclose: onToastClose,
          });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postTicket
  };

  const handleInputChange = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setBook({ ...book, [name]: value });
    console.log(book);
  };
  const dts = new Date();

  const launchForm = () => {
    setVal({ ...val, onopen: true });
  };
  return (
    <>
      <Button
        onClick={launchForm}
        size="small"
        variant="contained"
        color="primary"
      >
        Withdraw<span className="sm-hide-inline">&nbsp; FUNDS</span>
      </Button>
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
          <div className="boldest txt-lg"> Withdraw Funds</div>
        </Toolbar>
        <Divider />
        <DialogContent sx={{ p: "0", m: "0" }}>
          <section className="modal-width">
            <div className="px10 pt20 pb0 ">
              <div className="input">
                <label>Amount to withdraw</label>
                <input
                  type="number"
                  name="amount"
                  onChange={handleInputChange}
                  placeholder="Amount to withdraw"
                  className="form-control"
                />
              </div>
            </div>
          </section>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button color="error" onClick={val.onclose} aria-label="close">
            <CloseIcon /> Exit
          </Button>
          <span className="spacer"></span>
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
            color="primary"
          >
            {loading ? "sending..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomModal data={snack} />
    </>
  );
};

export default React.memo(WithdrawFund);
