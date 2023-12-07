import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import * as processHtml from "../../../../services/processHtml";
import Edit from "@mui/icons-material/Edit";
import HttpService from "../../../../services/HttpService";
import PlaceHolder from "../../../templates/PlaceHolder";
import { Search } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Close from "@mui/icons-material/Close";

const TransitionUp = React.forwardRef(function Transition(
  props: any,
  ref: any
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PagesList() {
  console.log("PagesList renders");
  const navigate = useNavigate();
  const { decodeHtml, truncateWord } = processHtml;
  const [pages, setPages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  /*  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data]; */

  React.useEffect(() => {
    listPages();
  }, []);

  const listPages = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post({ mode: "all-pages" }, "pages")
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (Array.isArray(result)) {
            setPages(result);
          } else {
            setPages([]);
          }
        },
        (error) => {
          setPages([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax
  const togEdit = (i: any) => {
    return navigate(`/admin/settings/pages/e/${i.id}`);
  };

  const closePreview = () => {
    setPreview({ ...preview, onopen: false });
  };
  const [preview, setPreview] = React.useState<any>({
    onopen: false,
    onclose: closePreview,
  });

  const launchPreview = (i: any) => {
    /*    console.log("itxm:: ", i);
      setPreview({ ...preview, onopen: true, data: i });
      console.log(preview); */
    navigate(`/admin/settings/pages/view`, {
      state: i,
    });
  };
  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py30">
          {" "}
          <Card sx={{ borderRadius: "0" }}>
            <div className="page-head bg-grax">
              <div className="flex flex-row-resp">
                <div className="inline-block pxy20">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Link to="/admin/settings">Settings</Link>
                    <Link to="/admin/settings/pages">Pages</Link>
                  </Breadcrumbs>
                  <h2>All Pages</h2>
                </div>
              </div>
            </div>
            {pages.map((item: any, index: number) => (
              <ListItem
                disablePadding
                key={index}
                divider={index < pages.length - 1 ? true : false}
                component={"div"}
                secondaryAction={
                  <>
                    <Tooltip title="Edit Page">
                      <IconButton onClick={() => togEdit(item)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Preview Page">
                      <IconButton onClick={() => launchPreview(item)}>
                        <Search />
                      </IconButton>
                    </Tooltip>
                  </>
                }
              >
                <ListItemButton>
                  <ListItemText
                    primary={<h4 style={{ lineHeight: "1.2" }}>{item.name}</h4>}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            {loading && (
              <>
                <div className="px0 flex flex-column">
                  <PlaceHolder type="list" />
                  <Divider />
                </div>
              </>
            )}{" "}
          </Card>
        </div>
      </section>
      {preview.onopen && (
        <>
          <Dialog
            open={true}
            aria-labelledby={"Me"}
            id={"md-" + preview.data.id}
            TransitionComponent={TransitionUp}
          >
            <div className="flex flex-row align-items-center px10">
              <DialogTitle id={"label100"} sx={{ p: "10px" }}>
                <i className="fas fa-info-circle"></i> {preview.title || "Info"}
              </DialogTitle>

              <span className="spacer"></span>
              <IconButton onClick={preview.onclose()} color="warning">
                <Close />
              </IconButton>
            </div>
            <DialogContent sx={{ p: "0 20px 20px 20px", m: "0" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(preview.data.message),
                }}
              ></div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </React.Fragment>
  );
}
