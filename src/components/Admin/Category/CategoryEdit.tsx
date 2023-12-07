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

const CategoryEdit = (props: any) => {
  const { launchNew } = props;
  console.log("Category Edit Renders");
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [details, setDetails] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [summary, setSummary] = React.useState<any>(false);
  const [title, setTitle] = React.useState<any>(false);
  const [id, setId] = React.useState<any>(false);
  const [authors, setAuthors] = React.useState<any[]>([]);
  const [preview_image, setPreview] = React.useState<any>(null);
  const [file, setFile] = React.useState<any>(null);
  const [new_file, setNewFile] = React.useState<any>(0);
  const onToastClose = () => {
    setToast({ onopen: false, onclose: onToastClose });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });
  const [meta, setMeta] = React.useState<any>({
    summary: "",
    id: 0,
  });

  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.categoryId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchdetails(params.categoryId);
    }
  }, []);

  const fetchdetails = (id: string) => {
    console.log(id);
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("properties", {
      id: id,
      is_admin: true,
      mode: "category-details",
    })
      .then(
        (result) => {
          setLoading(false);
          console.log(":::", result);
          if (!summary) {
            setSummary(result.summary);
            setTitle(result.title);
            setId(result.id);
            setPreview(process.env.REACT_APP_SERVER_DOMAIN + result.bg_photo);
          }
        },
        (error) => {
          setDetails({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  const handleFileChange = (e: any) => {
    const formData = new FormData();
    let fname = e.target.name;
    let flx = e.target.files[0];
    formData.append("file", flx);
    console.log(flx, formData);
    setFile(flx);
    console.log(flx);
    setPreview(URL.createObjectURL(flx)); // Would see a path?
    setNewFile(1);
  };

  const handleInputChange = React.useCallback(
    (event: any) => {
      const targ = event.target;
      const name = targ.name;
      const value = targ.value;
      if (name === "title") {
        setTitle(value);
      }
    },
    [details]
  );

  const onHtmlChange = (e: any) => {
    setSummary(e.target.value);
    console.log(summary);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("summary", summary);
    formData.append("mode", "category-edit");
    formData.append("is_new_file", new_file);
    formData.append("file", file);
    formData.append("title", title);
    formData.append("id", id);
    setLoading(true);
    setLoaded(false);
    HttpService.postForm("properties", formData)
      .then(
        (resp) => {
          console.log(resp);
          setToast({ ...toast, onopen: true, message: resp.mess });
          if (resp.status === 1) {
            setTimeout(() => {
              setToast({ ...toast, onopen: false });
              navigate(`/admin/categories/p/${resp.id}`);
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
      justify-summary-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-user-tie"></i> Edit category
        </h3>
        <div className="spacer"></div>
        <div>
          <Tooltip title="Edit category">
            <Button
              onClick={launchNew}
              size="small"
              variant="contained"
              color="primary"
            >
              <Add /> Add category
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
        <Link to="/admin/categories">category</Link>

        <Link to={`/admin/categories/p/${details.id}`}>{details.summary}</Link>
      </Breadcrumbs>
      <div className="px10 pb10">
        <Card sx={{ p: "0", m: "0" }}>
          <div style={{ padding: "20px" }}>
            <div className={loading ? " input iconed " : " input "}>
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Title "}
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
            />
            <div className="banner-section">
              {preview_image && (
                <div className="image_preview">
                  <img className="" src={preview_image} alt="preview Image" />
                </div>
              )}
              <div className={loading ? " input iconed " : " input "}>
                <label>Change Banner Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={handleFileChange}
                  placeholder={"Property Title "}
                />
              </div>
            </div>
            <div className="mb10">
              <DefaultEditor
                className="form-control"
                value={summary}
                placeholder="summary"
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
              {loading ? "Working..." : " Edit Category "}
            </Button>
            {/**/}{" "}
          </div>
        </Card>
      </div>

      <CustomModal data={toast} />
    </>
  );
};

export default CategoryEdit;
