import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { DefaultEditor } from "react-simple-wysiwyg";
import HttpService from "../../../../services/HttpService";
import CustomModal from "../../../templates/CustomModal";
import * as processHtml from "../../../../services/processHtml";

const SiteEdit = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  //const { field, value } = state;
  const { decodeHtml, truncateWord } = processHtml;

  let [meta, setMeta] = React.useState<any>({
    field: state.field,
    value: state.value,
  });
  let [col, setCol] = React.useState<any>("");
  let [loading, setLoading] = React.useState<any>(false);
  let [loaded, setLoaded] = React.useState<any>(false);
  React.useEffect(() => {
    //setMeta({ ...meta, field: state.field, value: state.value });
    if (col === "") {
      setCol(state.value);
    }
  }, []);

  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
    title: "Edit page",
  });

  const [detail, setDetail] = React.useState<any>("");

  const onHtmlChange = (e: any) => {
    setDetail(e.target.value);
    console.log(detail);
  };

  const handleSubmit = () => {
    console.log("SUBMITTING");
    const load = { field: state.field, value: col, mode: "edit-settings" };
    console.log(load);
    HttpService.postHeader("general", load)
      .then((resp) => {
        console.log(resp);
        setModal({ ...modal, onopen: true, message: resp.message });
      })
      .catch((err) => {
        setModal({ ...modal, onopen: true, message: err.message });
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setModal({ ...modal, onopen: false });
        }, 6000);
      });
  };
  const handleInputChange = React.useCallback(
    (e: any) => {
      console.log(e.taget);
      const name = e.target.name;
      setMeta({ ...meta, [name]: e.target.value });
      console.log(meta); /* */
    },
    [state]
  );

  const html = [
    "signup_message",
    "signup_message_subject",
    "low_credit_limit_message",
    "low_credit_limit_message_subject",
    "low_credit_limit_announcement",
  ];

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
                    <Link to="/admin/settings/site">Site Settings</Link>
                    <span>{state.field}</span>
                  </Breadcrumbs>
                  <h2>Edit Site</h2>
                </div>
              </div>
            </div>

            <div className="py30 px20">
              {!html.includes(state.field) && (
                <>
                  <div className={loading ? " input iconed " : " input "}>
                    <label>{state.field}</label>
                    <input
                      type="text"
                      className="form-control"
                      name="column"
                      value={col}
                      onChange={(e) => setCol(e.target.value)}
                      placeholder={"Enter Value"}
                    />
                  </div>
                </>
              )}
              {html.includes(state.field) && (
                <>
                  <div className="mb10">
                    <DefaultEditor
                      className="form-control"
                      value={decodeHtml(state.value)}
                      placeholder="Page Detail"
                      onChange={onHtmlChange}
                    />
                  </div>
                </>
              )}
              <Button
                type="submit"
                size="large"
                variant="contained"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Working..." : " Edit page "}
              </Button>
            </div>
          </Card>
        </div>
      </section>
      <CustomModal data={modal} />
    </React.Fragment>
  );
};

export default SiteEdit;
