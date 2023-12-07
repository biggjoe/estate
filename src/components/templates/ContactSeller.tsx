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
import { DefaultEditor } from "react-simple-wysiwyg";

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

const ContactSeller = (props: any) => {
  console.log(props);
  const { id, url, title } = props;
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
    name: "",
    phone: "",
    id: id,
    mode: "contact-seller",
  });

  React.useEffect(() => {
    setBook({ ...book, id: id });
  }, [id]);
  const [content, setContent] = React.useState("");
  const onHtmlChange = (e: any) => {
    setContent(e.target.value);
    console.log(content);
  };
  React.useEffect(() => {
    setBook({ ...book, message: content });
  }, [content]);

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
    if (book.name === "" || book.phone === "" || book.message === "") {
      console.log("empty name");
      setSnack({
        onopen: true,
        severity: "error",
        message: `Please supply your name, phone number 
        and your message before submitting`,
        onclose: onToastClose,
      });
      return;
    }

    setLoading(true);
    setLoaded(false);
    ///setBook({ ...book, message: content });
    console.log("Book:: ", book);
    HttpService.postForm("properties", book)
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
            setContent("");
            setTimeout(() => {
              setSnack({ ...snack, onopen: false, onclose: onToastClose });
            }, 3000);
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
        color="primary"
        variant="contained"
        size="large"
        fullWidth
      >
        CONTACT SELLER
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
          <div className="boldest txt-lg">Contact Seller</div>
        </Toolbar>
        <Divider />
        <DialogContent sx={{ p: "0", m: "0" }}>
          <section className="modal-width">
            <div className="border-bottom pxy20 mb20 txt-lg">{title}</div>
            <div className="px20 py10 ">
              <div className="input">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="form-control"
                />
              </div>
              <div className="input">
                <label>Your Phone</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleInputChange}
                  placeholder="Your Phone"
                  className="form-control"
                />
              </div>

              <div className="mb10">
                <DefaultEditor
                  className="form-control"
                  value={content}
                  placeholder="Write your message here..."
                  onChange={onHtmlChange}
                />
              </div>
            </div>
          </section>
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
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
            {loading ? "sending..." : "Send Message"}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomModal data={snack} />
    </>
  );
};

export default React.memo(ContactSeller);
