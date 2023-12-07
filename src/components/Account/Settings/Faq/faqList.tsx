import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { DefaultEditor } from "react-simple-wysiwyg";
import * as processHtml from "../../../../services/processHtml";
import Edit from "@mui/icons-material/Edit";
import HttpService from "../../../../services/HttpService";
import PlaceHolder from "../../../templates/PlaceHolder";
import { ButtonGroup, Collapse } from "@mui/material";
import HtmlModal from "../../../templates/HtmlModal";
import CustomModal from "../../../templates/CustomModal";
import { Delete } from "@mui/icons-material";

export default function FaqList() {
  let navigate = useNavigate();
  const { decodeHtml, truncateWord } = processHtml;
  const [faqs, setFaq] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "Edit Faq",
  });

  /*  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data]; */

  React.useEffect(() => {
    listfaqs();
  }, []);

  const listfaqs = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post({ mode: "all-faqs" }, "pages")
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (Array.isArray(result)) {
            setFaq(result);
          } else {
            setFaq([]);
          }
        },
        (error) => {
          setFaq([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  const togView = (index: number, state: boolean) => {
    console.log(index, state);
    const mutd = [...faqs];
    const item = (mutd[index]["is_togged"] = !mutd[index]["is_togged"]);
    setFaq(mutd);
  };

  const togEdit = (i: any) => {
    return navigate(`/admin/settings/faq/e/${i.id}`);
  };

  const launchNew = (i: any) => {
    return navigate(`/admin/settings/faq/a/new`);
  };
  const launchDelete = (item: any) => {};
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
                    <span>FAQS</span>
                  </Breadcrumbs>
                  <div className="flex flex-row align-items-center">
                    <h2>All FAQs</h2>
                    <span className="spacer"></span>
                    <span>--</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row border-bottom align-items-center pxy10">
              <span className="spacer"></span>
              <span>
                <Button variant="outlined" size="small" onClick={launchNew}>
                  New
                </Button>
              </span>
            </div>
            {faqs.map((item: any, index: number) => (
              <ListItem
                disablePadding
                key={index}
                divider={index < faqs.length - 1 ? true : false}
                component={"div"}
              >
                <ListItemButton>
                  <ListItemText
                    primary={
                      <div className="flex flex-row">
                        <h3 style={{ lineHeight: "1.3" }}>{item.question}</h3>
                        <span className="spacer"></span>
                        <Tooltip
                          title={`${item.is_togged ? "Hide" : "Show"}  Answer`}
                        >
                          <IconButton
                            size="small"
                            onClick={() => togView(index, !item.is_togged)}
                          >
                            {item.is_togged ? (
                              <i className="fas fa-chevron-up"></i>
                            ) : (
                              <i className="fas fa-chevron-down"></i>
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    }
                    secondary={
                      <Collapse in={item.is_togged}>
                        <div className="flex flex-row border-bottom align-items-center pxy10">
                          <span className="spacer"></span>
                          <span>
                            <ButtonGroup>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => togEdit(item)}
                              >
                                <Edit />
                                Edit
                              </Button>
                              <Button
                                color="warning"
                                variant="outlined"
                                size="small"
                                onClick={() => launchDelete(item)}
                              >
                                <Delete />
                                Delete
                              </Button>
                            </ButtonGroup>
                          </span>
                        </div>

                        <div
                          className="properties-summary"
                          dangerouslySetInnerHTML={{
                            __html: decodeHtml(item.answer),
                          }}
                        ></div>
                      </Collapse>
                    }
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
      <CustomModal data={modal} />
    </React.Fragment>
  );
}
