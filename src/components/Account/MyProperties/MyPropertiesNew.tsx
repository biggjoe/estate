import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Add from "@mui/icons-material/Add";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";
import { DefaultEditor } from "react-simple-wysiwyg";
import AuthService from "../../../services/AuthService";
import { ApartmentOutlined } from "@mui/icons-material";

const PropertiesNew = (props: any) => {
  console.log("New Properties Renders");

  let navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categories_fetched, setCategoriesFetched] =
    React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<string>("");
  const [loading_text, setText] = React.useState<string>("Save Now");
  const onToastClose = () => {
    setToast({ onopen: false, onclose: onToastClose });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });
  const [meta, setMeta] = React.useState<any>(new FormData());

  React.useEffect(() => {
    if (!categories_fetched) {
      fetchCats();
    }
  }, []);

  const fetchCats = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("properties", { mode: "list-categories" })
      .then(
        (resp) => {
          console.log(resp);
          if (Array.isArray(resp)) {
            setCategories(resp);
            setCategoriesFetched(true);
          } else {
            setCategories([]);
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
    setContent(e.target.value);
    console.log(content);
  };
  const usr = AuthService.getCurrentUser();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const obj: any = {
      ...meta,
      owner_user: usr.email,
      description: content,
      mode: "create",
    };
    console.log(obj);
    setLoading(true);
    setLoaded(false);
    HttpService.postFormHeader("properties", obj)
      .then(
        (resp) => {
          console.log(resp);
          setToast({ ...toast, onopen: true, message: resp.message });
          if (resp.status === 1) {
            setTimeout(() => {
              setToast({ ...toast, onopen: false });
              navigate(`/account/my-properties/p/${resp.data.url}`);
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
    //setMeta({ ...meta, file: formData });
    setFile(flx);
    console.log(flx);
    //var reader = new FileReader();
    //var url = reader.readAsDataURL(flx);
    setPreview(URL.createObjectURL(flx)); // Would see a path?
  };
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
                    <Link to="/account/dashboard">Dashboard</Link>
                    <Link to="/account/my-properties">My Properties</Link>
                  </Breadcrumbs>
                  <h2>
                    <ApartmentOutlined /> New Property
                  </h2>
                </div>
              </div>
            </div>
            <Divider />

            <div style={{ padding: "20px" }}>
              <div className={loading ? " input iconed " : " input "}>
                <label>Property Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={handleInputChange}
                  placeholder={"Properties Title "}
                />
                {loading && (
                  <span className="input-icon">
                    <i className="fas fa-refresh fa-spin"></i>
                  </span>
                )}
              </div>
              <div className="flex flex-row-resp align-items-center">
                <div className="input spacer pr10">
                  <label>Select Category</label>
                  <select
                    name="cat_id"
                    className="form-control"
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((item: any, i: number) => (
                      <option value={item.id} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={" input spacer"}>
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    onChange={handleInputChange}
                    placeholder={"Property Price"}
                  />
                </div>
              </div>
              <div className="input">
                <label>Summary</label>
                <textarea
                  className="form-control"
                  name={"summary"}
                  onChange={handleInputChange}
                  rows={1}
                ></textarea>
              </div>

              <div className="flex flex-row-resp align-items-center">
                <div className={" input spacer pr10"}>
                  <label>Location Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location_country"
                    onChange={handleInputChange}
                    placeholder={"Property Location country"}
                  />
                </div>
                <div className={" input spacer"}>
                  <label>Location State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location_state"
                    onChange={handleInputChange}
                    placeholder={"Property Location state"}
                  />
                </div>
              </div>

              <div className="flex flex-row-resp align-items-center">
                <div className={" input spacer pr10"}>
                  <label>Location LGA</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location_lga"
                    onChange={handleInputChange}
                    placeholder={"Property Location LGA"}
                  />
                </div>
                <div className={" input spacer"}>
                  <label>Location Town</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location_town"
                    onChange={handleInputChange}
                    placeholder={"Property Location Town"}
                  />
                </div>
              </div>
              <div className={loading ? " input iconed " : " input "}>
                <label>Location Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="location_address"
                  onChange={handleInputChange}
                  placeholder={"Property Location Address"}
                />
              </div>
              <div className="flex flex-row-resp align-items-center">
                <div className={"spacer input pr10"}>
                  <label>Location Latitude</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location_latitude"
                    onChange={handleInputChange}
                    placeholder={"Property Location latitude"}
                  />
                </div>
                <div className={"spacer input"}>
                  <label>Longitude</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location_longitude"
                    onChange={handleInputChange}
                    placeholder={"Property Location longitude"}
                  />
                </div>
              </div>
              <div className="mb10">
                <DefaultEditor
                  className="form-control"
                  value={content}
                  placeholder="Full Property Description"
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
                {loading ? "Working..." : " Save "}
              </Button>
            </div>
          </Card>
        </div>
      </section>
      <CustomModal data={toast} />
    </React.Fragment>
  );
};

export default PropertiesNew;
