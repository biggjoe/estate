import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as processHtml from "../../../services/processHtml";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";
import { DefaultEditor } from "react-simple-wysiwyg";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Add from "@mui/icons-material/Add";

const DealsEdit = (props: any) => {
  const { launchNew } = props;
  console.log("New Edit Renders");
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [deals, setDeals] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [content, setContent] = React.useState<any>(false);
  const [title, setTitle] = React.useState<any>(false);
  const [id, setId] = React.useState<any>(false);
  const [discount, setDiscount] = React.useState<any>(false);
  const onToastClose = () => {
    setToast({ onopen: false, onclose: onToastClose });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });
  const [meta, setMeta] = React.useState<any>({
    title: "",
    summary: "",
    discount: "",
    id: 0,
    properties: [],
  });

  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.pId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchdeals(params.pId);
    }
  }, []);

  const fetchdeals = (id: string) => {
    console.log(id);
    setLoading(true);
    setLoaded(false);
    HttpService.post({ id: id, mode: "deal-details" }, "properties")
      .then(
        (result) => {
          console.log(":::", result);
          if (!title) {
            setContent(result.summary);
            setTitle(result.title);
            setDiscount(result.discount);
            setId(result.id);
          }
        },
        (error) => {
          setDeals({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const handleInputChange = React.useCallback(
    (event: any) => {
      const targ = event.target;
      const name = targ.name;
      const value = targ.value;
      if (name === "title") {
        setTitle(value);
      }
    },
    [deals]
  );

  const onHtmlChange = (e: any) => {
    setContent(e.target.value);
    console.log(content);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("summary", content);
    formData.append("mode", "edit-deals");
    formData.append("title", title);
    formData.append("discount", discount);
    formData.append("id", id);
    setLoading(true);
    setLoaded(false);
    HttpService.postForm("deals", formData)
      .then(
        (resp) => {
          console.log(resp);
          setToast({ ...toast, onopen: true, message: resp.mess });
          if (resp.status === 1) {
            setTimeout(() => {
              setToast({ ...toast, onopen: false });
              navigate(`/admin/deals/p/${resp.id}`);
            }, 3000);
          }
        },
        (error) => {
          setToast({ ...toast, onopen: true, message: error.message });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postTicket
  };

  return (
    <>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-content-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-dealspaper"></i> Edit Deal
        </h3>
        <div className="spacer"></div>
        <div>
          <Tooltip title="Edit deals">
            <Button
              onClick={launchNew}
              size="small"
              variant="contained"
              color="primary"
            >
              <Add /> Add Deal
            </Button>
          </Tooltip>
        </div>
      </div>
      <Divider />

      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          padding: "10px",
          width: "100%",
        }}
      >
        <Link to="/admin/deals">Deals</Link>

        <Link to={`/admin/deals/p/${deals.url}`}>{deals.title}</Link>
      </Breadcrumbs>
      <div className="px10 pb10">
        <Card sx={{ p: "0", m: "0" }}>
          <div style={{ padding: "20px" }}>
            <div className={loading ? " input iconed " : " input "}>
              <label>Deal Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"deals Title "}
              />
              <input
                type="hidden"
                className="form-control"
                name="id"
                value={id}
                onChange={handleInputChange}
              />
              {loading && (
                <span className="input-icon">
                  <i className="fas fa-refresh fa-spin"></i>
                </span>
              )}
            </div>
            <div className={loading ? " input iconed " : " input "}>
              <label>Deal Discount %</label>
              <input
                type="text"
                className="form-control"
                name="Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder={"Discount % "}
              />
              {loading && (
                <span className="input-icon">
                  <i className="fas fa-refresh fa-spin"></i>
                </span>
              )}
            </div>
            <div className="mb10">
              <DefaultEditor
                className="form-control"
                value={content}
                placeholder="Deals Summary"
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
              {loading ? "Working..." : " Edit deals "}
            </Button>
            {/**/}{" "}
          </div>
        </Card>
      </div>

      <CustomModal data={toast} />
    </>
  );
};

export default DealsEdit;
