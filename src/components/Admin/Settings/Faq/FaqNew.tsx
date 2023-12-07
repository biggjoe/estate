import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Collapse } from "@mui/material";
import HtmlModal from "../../../templates/HtmlModal";
import useFetchFaqDetails from "../../../../hooks/useFetchFaqDetails";
import CustomModal from "../../../templates/CustomModal";

const FaqNew = () => {
  let navigate = useNavigate();
  let [faq, setFaq] = React.useState<any>({});
  let [answer, setAnswer] = React.useState<any>("");
  let [loading, setLoading] = React.useState<any>(false);
  let [loaded, setLoaded] = React.useState<any>(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "New Faq",
  });

  React.useEffect(() => {}, []);

  const onHtmlChange = (e: any) => {
    setAnswer(e.target.value);
    console.log(answer);
  };

  const handleSubmit = () => {
    console.log("SUBMITTING");
    HttpService.postHeader("pages", {
      question: faq.question,
      answer: answer,
      mode: "add-faq",
    })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 1) {
          setModal({ ...modal, onopen: true, message: resp.message });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleInputChange = React.useCallback(
    (e: any) => {
      console.log(e.target);
      const name = e.target.name;
      setFaq({ ...faq, [name]: e.target.value });
    },
    [faq]
  );

  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py30">
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
                    <Link to="/admin/settings/faq">FAQS</Link>
                    <span>{faq.question}</span>
                  </Breadcrumbs>
                  <h2>Add FAQ</h2>
                </div>
              </div>
            </div>

            <div className="py30 px20">
              <div className={loading ? " input iconed " : " input "}>
                <label>Question</label>
                <input
                  type="text"
                  className="form-control"
                  name="question"
                  onChange={handleInputChange}
                  placeholder={"FAQ Question "}
                />
              </div>

              <div className="mb10">
                <DefaultEditor
                  className="form-control"
                  placeholder="FAQ Answer"
                  value={answer}
                  onChange={onHtmlChange}
                />
              </div>
              <Button
                type="submit"
                size="large"
                variant="contained"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Working..." : " Add FAQ "}
              </Button>
            </div>
          </Card>
        </div>
      </section>
      <CustomModal data={modal} />
    </React.Fragment>
  );
};

export default FaqNew;
