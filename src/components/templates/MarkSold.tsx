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
  Tooltip,
  Typography,
  Dialog,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Edit from "@mui/icons-material/Edit";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import HttpService from "../../services/HttpService";
import CustomModal from "./CustomModal";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MarkSold = (props: any) => {
  const { id, title } = props;
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
    sale_date: "",
    mode: "mark-sold",
  });

  React.useEffect(() => {
    setBook({ ...book, property_id: props.id });
  }, [props]);

  const onToastClose = () => {
    setSnack({ ...snack, onopen: false });
  };
  const [snack, setSnack] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
  });

  const handleSubmit = () => {
    console.log(book);
    if (book.email === "" || book.sale_date === "") {
      setSnack({
        onopen: true,
        message: "Please supply seller email and sale date",
        onclose: onToastClose,
      });
      setTimeout(() => {
        onToastClose();
      }, 5000);
      return;
    }

    setLoading(true);
    setLoaded(false);
    console.log(book);
    HttpService.postFormHeader("properties", book)
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
            setTimeout(() => {
              onToastClose();
              CloseModal();
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
  React.useEffect(() => {
    setBook({ ...book, sale_date: dts });
  }, []);

  const launchMark = () => {
    setVal({ ...val, onopen: true, onclose: CloseModal });
  };
  return (
    <>
      <Tooltip title="Mark property as sold">
        <Button
          size="small"
          color="warning"
          variant="contained"
          onClick={() => launchMark()}
        >
          <Edit />
          <span className="sm-hide-inline"> Mark Sold</span>
        </Button>
      </Tooltip>
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
          <Typography sx={{ ml: "0px", flex: 1 }} variant="h6" component="div">
            Mark property sold
          </Typography>
        </Toolbar>
        <Divider />
        <DialogContent sx={{ p: "0", m: "0" }}>
          <section className="modal-width">
            <div className="border-bottom pxy20 mb20 txt-lg">{title}</div>
            <div className="px20 py10 ">
              <div className="input">
                <label>Price Sold</label>
                <input
                  type="number"
                  name="price"
                  onChange={handleInputChange}
                  placeholder="Price Sold"
                  className="form-control"
                />
              </div>
              <div className="input">
                <label>Seller's User Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Seller's User Email"
                  className="form-control"
                />
              </div>

              <div className="input">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3} sx={{ width: "100%" }}>
                    <DesktopDatePicker
                      label="Sale Date"
                      inputFormat="MM/dd/yyyy"
                      value={book.sale_date}
                      onChange={(newValue) =>
                        setBook({ ...book, sale_date: newValue })
                      }
                      renderInput={(params: any) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
            </div>
          </section>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={val.onclose}
            aria-label="close"
          >
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

export default React.memo(MarkSold);
