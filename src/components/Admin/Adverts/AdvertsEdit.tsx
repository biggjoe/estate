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

const AdvertsEdit = (props: any) => {
  const { launchNew } = props;
  console.log("Staff Edit Renders");
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [details, setDetails] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [bio, setBio] = React.useState<any>(false);
  const [stage_name, setStageName] = React.useState<any>(false);
  const [firstname, setFirstname] = React.useState<any>(false);
  const [surname, setSurname] = React.useState<any>(false);
  const [username, setUsername] = React.useState<any>(false);
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
    firstname: "",
    bio: "",
    id: 0,
    related_articles: [],
  });

  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.staffId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchdetails(params.staffId);
    }
  }, []);

  const fetchdetails = (id: string) => {
    console.log(id);
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("adverts", { id: id, mode: "details" })
      .then(
        (result) => {
          setLoading(false);
          console.log(":::", result);
          if (!firstname) {
            setBio(result.bio);
            setFirstname(result.firstname);
            setSurname(result.surname);
            setId(result.id);
            setUsername(result.username);
            setPreview(
              process.env.REACT_APP_SERVER_FILES_DOMAIN + result.picture
            );
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
      if (name === "firstname") {
        setFirstname(value);
      }
    },
    [details]
  );

  const onHtmlChange = (e: any) => {
    setBio(e.target.value);
    console.log(bio);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("mode", "edit");
    formData.append("is_new_file", new_file);
    formData.append("file", file);
    formData.append("firstname", firstname);
    formData.append("surname", surname);
    formData.append("username", username);
    formData.append("id", id);
    setLoading(true);
    setLoaded(false);
    HttpService.postForm("staff", formData)
      .then(
        (resp) => {
          console.log(resp);
          setToast({ ...toast, onopen: true, message: resp.mess });
          if (resp.status === 1) {
            setTimeout(() => {
              setToast({ ...toast, onopen: false });
              navigate(`/admin/staff/p/${resp.id}`);
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
      justify-bio-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-user-tie"></i> Edit Staff
        </h3>
        <div className="spacer"></div>
        <div>
          <Tooltip title="Edit Staff">
            <Button
              onClick={launchNew}
              size="small"
              variant="contained"
              color="primary"
            >
              <Add /> Add Staff
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
        <Link to="/admin/staff">Staff</Link>

        <Link to={`/admin/staff/p/${details.id}`}>{details.firstname}</Link>
      </Breadcrumbs>
      <div className="px10 pb10">
        <Card sx={{ p: "0", m: "0" }}>
          <div style={{ padding: "20px" }}>
            <div className={loading ? " input iconed " : " input "}>
              <label>Firstname</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder={"Firstname "}
              />
              {loading && (
                <span className="input-icon">
                  <i className="fas fa-refresh fa-spin"></i>
                </span>
              )}
            </div>
            <div className={loading ? " input iconed " : " input "}>
              <label>Surname</label>
              <input
                type="text"
                className="form-control"
                name="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder={"Firstname "}
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
            <input
              type="hidden"
              className="form-control"
              name="username"
              value={username}
            />
            <div className="banner-section">
              {preview_image && (
                <div className="image_preview">
                  <img className="" src={preview_image} alt="preview Image" />
                </div>
              )}
              <div className={loading ? " input iconed " : " input "}>
                <label>Change Picture</label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={handleFileChange}
                  placeholder={"details firstname "}
                />
              </div>
            </div>
            <div className="mb10">
              <DefaultEditor
                className="form-control"
                value={bio}
                placeholder="Biography"
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
              {loading ? "Working..." : " Edit details "}
            </Button>
            {/**/}{" "}
          </div>
        </Card>
      </div>

      <CustomModal data={toast} />
    </>
  );
};

export default AdvertsEdit;
