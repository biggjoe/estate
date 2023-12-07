import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Close from "@mui/icons-material/Close";
import CustomModal from "./CustomModal";
import HttpService from "../../services/HttpService";
import { DefaultEditor } from "react-simple-wysiwyg";

const TransitionUp = React.forwardRef(function Transition(
  props: any,
  ref: any
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateDeal(props: any) {
  const modal = props.data;
  const { deals } = modal;
  const severity = modal.severity ? modal.severity : "info";
  console.log(modal);
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

  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [meta, setMeta] = React.useState<any>({});
  const [content, setContent] = React.useState<string>("");
  const handleInputChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setMeta({ ...meta, [name]: value });
  };

  const onToastClose = () => {
    setSnack({ onopen: false });
  };
  const [snack, setSnack] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("mode", "create-deal");
    formData.append("deals", JSON.stringify(deals));
    formData.append("discount", meta.discount);
    formData.append("summary", meta.content);
    formData.append("title", meta.title);
    setLoading(true);
    setLoaded(false);
    HttpService.postFormHeader("properties", formData)
      .then(
        (response) => {
          console.log(response);
          setSnack({
            onopen: true,
            message: response.message,
            onclose: onToastClose,
          });
        },
        (error) => {
          setSnack({
            onopen: true,
            message: error.message,
            onclose: onToastClose,
          });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };

  const onHtmlChange = (e: any) => {
    setContent(e.target.value);
    console.log(content);
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
            <i className="fas fa-info-circle"></i> {"New Deal"}
          </DialogTitle>

          <span className="spacer"></span>
          <IconButton onClick={handleClose} color="warning">
            <Close />
          </IconButton>
        </div>
        <DialogContent sx={{ p: "0 20px 20px 20px", m: "0" }}>
          <section className="modal-width">
            <div className="input">
              <label>Deal Title</label>
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                placeholder="Deal Title"
                className="form-control"
              />
            </div>
            <div className="input">
              <label>Discount rate (%)</label>
              <input
                type="number"
                name="discount"
                onChange={handleInputChange}
                placeholder="Discount rate (%)"
                className="form-control"
              />
            </div>
            <div className="mb10">
              <DefaultEditor
                className="form-control"
                value={content}
                placeholder="Deal Description"
                onChange={onHtmlChange}
              />
            </div>

            <Button
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
              color="primary"
            >
              {loading ? "sending..." : "Submit"}
            </Button>
          </section>
        </DialogContent>
      </Dialog>
      <CustomModal data={snack} />
    </>
  );
}
