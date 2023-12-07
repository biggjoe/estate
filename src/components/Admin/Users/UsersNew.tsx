import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";
import { DefaultEditor } from "react-simple-wysiwyg";
import RegisterForm from "../../public/Register/RegisterForm";

const UsersNew = (props: any) => {
  console.log("New News Renders");
  let val = props.data;

  let navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [users_fetched, setUsersFetched] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [bio, setBio] = React.useState<string>("");
  const [loading_text, setText] = React.useState<string>("Save Now");
  const [new_file, setNewFile] = React.useState<any>(0);
  const onToastClose = () => {
    setToast({ onopen: false, onclose: onToastClose });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });
  const [meta, setMeta] = React.useState<any>(new FormData());

  React.useEffect(() => {}, []);

  const handleInputChange = React.useCallback(
    (event: any) => {
      const targ = event.target;
      const name = targ.name;
      const value = targ.value;
      console.log(name, value);
      setMeta({ ...meta, [name]: value });
      console.log(meta);
    },
    [meta]
  );

  const onHtmlChange = (e: any) => {
    setBio(e.target.value);
    console.log(bio);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("mode", "create");
    formData.append("file", file);
    formData.append("is_new_file", new_file);
    formData.append("email", meta.email);
    formData.append("password", meta.password);
    formData.append("password2", meta.password2);
    formData.append("phone", meta.phone);
    formData.append("is_admin", meta.is_admin);
    formData.append("firstname", meta.firstname);
    formData.append("surname", meta.surname);
    setLoading(true);
    setLoaded(false);
    HttpService.postFormHeader("users", formData)
      .then(
        (resp) => {
          console.log(resp);
          setToast({ ...toast, onopen: true, message: resp.message });
          if (resp.status === 1) {
            setTimeout(() => {
              setToast({ ...toast, onopen: false });
              navigate(`/admin/users/p/${resp.uid}`);
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

  const [file, setFile] = React.useState<any>(null);
  const [preview_image, setPreview] = React.useState<any>(null);
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
  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py10">
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
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/users">Users</Link>
                  </Breadcrumbs>
                  <h2>
                    <i className="fas fa-user-plus"></i> New User
                  </h2>
                </div>
              </div>
            </div>
            <Divider />

            <div className="flex flex-col flex-column justify-content-center align-items-center py20">
              <div className="login-pane">
                <RegisterForm ref_data={{ is_ref: false }} />
              </div>
              {/* 
              <Card sx={{ p: "0", m: "0" }}>
                <div style={{ padding: "20px" }}>
                  <div className={loading ? " input iconed " : " input "}>
                    <label>Firstname</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstname"
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      placeholder={"Surname "}
                    />
                    {loading && (
                      <span className="input-icon">
                        <i className="fas fa-refresh fa-spin"></i>
                      </span>
                    )}
                  </div>
                  <div className={loading ? " input iconed " : " input "}>
                    <label>Email Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      onChange={handleInputChange}
                      placeholder={"Email Address "}
                    />
                    {loading && (
                      <span className="input-icon">
                        <i className="fas fa-refresh fa-spin"></i>
                      </span>
                    )}
                  </div>
                  <div className={loading ? " input iconed " : " input "}>
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      onChange={handleInputChange}
                      placeholder={"Phone "}
                    />
                    {loading && (
                      <span className="input-icon">
                        <i className="fas fa-refresh fa-spin"></i>
                      </span>
                    )}
                  </div>
                  <div className="input">
                    <label>Select Admin Status</label>
                    <select
                      name="is_admin"
                      className="form-control"
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      <option value={1}>User is an Admin</option>
                      <option value={0}>User is not an Admin</option>
                    </select>
                  </div>
                  <div className={loading ? " input iconed " : " input "}>
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={handleInputChange}
                      placeholder={"Password"}
                    />
                    {loading && (
                      <span className="input-icon">
                        <i className="fas fa-refresh fa-spin"></i>
                      </span>
                    )}
                  </div>
                  <div className={loading ? " input iconed " : " input "}>
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password2"
                      onChange={handleInputChange}
                      placeholder={"Confirm Password"}
                    />
                    {loading && (
                      <span className="input-icon">
                        <i className="fas fa-refresh fa-spin"></i>
                      </span>
                    )}
                  </div>
                  <div className="banner-section">
                    {preview_image && (
                      <div className="image_preview">
                        <img
                          className=""
                          src={preview_image}
                          alt="preview Image"
                        />
                      </div>
                    )}
                    <div className={loading ? " input iconed " : " input "}>
                      <label>Attach Picture</label>
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
                    {loading ? "Working..." : " Add Users "}
                  </Button>
               
                </div>
              </Card> */}
            </div>

            <CustomModal data={toast} />
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default UsersNew;
