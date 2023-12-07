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

const CommentsEdit = (props: any) => {
  const { launchNew } = props;
  console.log("Comments Edit Renders");
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [news, setNews] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [comment, setComment] = React.useState<any>(false);
  const [name, setName] = React.useState<any>(false);
  const [email, setEmail] = React.useState<any>(false);
  const [id, setId] = React.useState<any>(false);
  const onToastClose = () => {
    setToast({ onopen: false, onclose: onToastClose });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });
  const [meta, setMeta] = React.useState<any>({
    name: "",
    comment: "",
    email: "",
    id: 0,
  });

  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.cId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchComment(params.cId);
    }
  }, []);

  const fetchComment = (id: any) => {
    console.log(id);
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("news", { id: id, mode: "comment-details" })
      .then(
        (result) => {
          setLoading(false);
          console.log(":::", result);
          if (!name) {
            setComment(result.comment);
            setName(result.name);
            setEmail(result.email);
            setId(result.id);
          }
        },
        (error) => {
          setNews({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  const handleInputChange = React.useCallback(
    (event: any) => {
      const targ = event.target;
      const name = targ.name;
      const value = targ.value;
      if (name === "name") {
        setName(value);
      }
    },
    [news]
  );

  const onHtmlChange = (e: any) => {
    setComment(e.target.value);
    console.log(comment);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("mode", "edit-comment");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("id", id);
    setLoading(true);
    setLoaded(false);
    HttpService.postForm("news", formData)
      .then(
        (resp) => {
          console.log(resp);
          setToast({ ...toast, onopen: true, message: resp.mess });
          if (resp.status === 1) {
            setTimeout(() => {
              setToast({ ...toast, onopen: false });
              navigate(`/admin/comments/p/${resp.url}`);
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
      justify-comment-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-newspaper"></i> Edit Comment
        </h3>
        <div className="spacer"></div>
        <div>-</div>
      </div>
      <Divider />

      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          padding: "10px",
          width: "100%",
        }}
      >
        <Link to="/admin/comments">Comments</Link>
      </Breadcrumbs>
      <div className="px10 pb10">
        <Card sx={{ p: "0", m: "0" }}>
          <div style={{ padding: "20px" }}>
            <div className={loading ? " input iconed " : " input "}>
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Name "}
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
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={"Email "}
              />
              {loading && (
                <span className="input-icon">
                  <i className="fas fa-refresh fa-spin"></i>
                </span>
              )}
            </div>
            <input
              type="hidden"
              className="form-control"
              name="id"
              value={id}
              onChange={handleInputChange}
            />
            <div className="mb10">
              <DefaultEditor
                className="form-control"
                value={comment}
                placeholder="Comment"
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
              {loading ? "Working..." : " Edit Comment "}
            </Button>
            {/**/}{" "}
          </div>
        </Card>
      </div>

      <CustomModal data={toast} />
    </>
  );
};

export default CommentsEdit;
