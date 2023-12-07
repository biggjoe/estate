import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import HttpService from "../../services/HttpService";
import ResponseAlert from "./ResponseAlert";
import CustomModal from "./CustomModal";

const TransitionUp = React.forwardRef(function Transition(
  props: any,
  ref: any
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const EditPropertyPictures = (props: any) => {
  console.log(props);
  const val = props.data;
  const [res_status, setResStatus] = React.useState(-1);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    message: "",
    onclose: closeModal,
  });
  const [loaded, setLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loading_message, setLoadingMessage] = React.useState("Upload Files");
  const [attached, setAttached] = React.useState<any[]>([]);
  const [showUploadBar, setShowUploadBar] = React.useState<boolean>(true);

  const handleFileInputChange = (event: any) => {
    //console.log("index:: ", index);
    const target_type = event.target.type;
    console.log(target_type);
    const target = event.target;
    let fname = target.name;
    let flx = target.files;

    let filesArr = Array.prototype.slice.call(event.target.files);
    console.log(filesArr);
    /*   const formData = new FormData();
    let arx: any = [];
    for (let i = 0; i < flx.length; i++) {
      formData.append("files[]", flx[i]);
    }
    console.log(formData);
    return; */
    const new_files: any[] = [...attached, ...filesArr];
    setAttached(new_files);
    console.log(attached);
    setShowUploadBar(false);
    /**
     *     console.log("changed::: ", e, index);
    let glx = { ...gallery };
    let fname = e.target.name;
    let flx = e.target.files[0];
    flx.item_id = glx["photos"][index]["id"];
    flx.gallery_id = gallery.id;
    glx["photos"][index]["form_data"] = flx;
    glx["photos"][index]["new_file"] = true;
    glx["photos"][index].preview_file = URL.createObjectURL(flx); // Would see a path?
    setGallery({ ...glx });
    console.log(glx);
     */
  };

  const uploadFiles = () => {
    setLoading(true);
    setLoaded(false);
    setResStatus(-1);
    setModal({
      ...modal,
      message: "Uploading files...",
      onopen: true,
      onClose: closeModal,
    });
    console.log(attached);
    let formData = new FormData();
    for (let i = 0; i < attached.length; i++) {
      formData.append("files[]", attached[i]);
      console.log(attached[i]);
    }
    formData.append("property_id", val.propertyId);
    formData.append("mode", "modify-files");
    console.log(formData);
    HttpService.postForm("properties", formData)
      .then(
        (response) => {
          setResStatus(response.status);
          setModal({
            ...modal,
            message: response.message,
            onopen: true,
            onClose: closeModal,
          });
          setTimeout(() => {
            val.onclose();
            setModal({
              ...modal,
              onopen: false,
              onClose: closeModal,
            });
          }, 6000);
          console.log(response);
        },
        (error) => {
          setModal({
            ...modal,
            message: error.message,
            onopen: false,
            onClose: closeModal,
          });
          setResStatus(0);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };
  return (
    <>
      <Dialog
        open={val.onopen}
        aria-labelledby={"Me"}
        id={"md-"}
        TransitionComponent={TransitionUp}
      >
        <div className="pxy20">{val.title}</div>
        <Divider />
        <DialogContent>
          <section className="modal-width">
            {showUploadBar && (
              <Slide
                direction="up"
                in={showUploadBar}
                mountOnEnter
                unmountOnExit
              >
                <div className="multi-input-file mb10">
                  <input
                    type="file"
                    className="hidden-field"
                    multiple
                    onChange={handleFileInputChange}
                  />
                  <div className="hidden-field-label">
                    <p>
                      <i className="fa fa-paperclip"></i> DROP FILES HERE{" "}
                    </p>
                    <span>(.jpeg, .png, .mp4 )</span>
                  </div>
                </div>
              </Slide>
            )}

            <Divider />
            {attached.length > 0 && (
              <div className="py10 border-bottom mb10 flex flex-row justify-content-center align-items-center">
                <div className="spacer">
                  <span className="txt-lg boldest">
                    {attached.length} files attached
                  </span>
                  <span className="px5">
                    {!showUploadBar && (
                      <a
                        href="#"
                        onClick={() => setShowUploadBar(!showUploadBar)}
                      >
                        ADD MORE
                      </a>
                    )}
                  </span>
                </div>
                <span className="px5">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={uploadFiles}
                    disabled={loading}
                  >
                    {loading_message || "UPLOAD FILES"}
                  </Button>
                </span>
              </div>
            )}

            {loaded && (
              <div className="py20">
                <ResponseAlert
                  data={{ status: res_status, message: loading_message }}
                />
              </div>
            )}
            {!loaded && (
              <List sx={{ paddingTop: "0px", marginTop: "0px" }}>
                {attached.map((itm: any, i: number) => (
                  <ListItem
                    key={i}
                    disablePadding
                    button
                    divider={true}
                    secondaryAction={
                      <>
                        <span>{(itm.size / 1024).toFixed(2) + "Kb"}</span>
                      </>
                    }
                  >
                    <div className="prev-item border-bottom">
                      <img src={itm.name} />
                    </div>
                  </ListItem>
                ))}
              </List>
            )}
          </section>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={val.onclose} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>
      <CustomModal data={modal} />
    </>
  );
};

export default React.memo(EditPropertyPictures);
