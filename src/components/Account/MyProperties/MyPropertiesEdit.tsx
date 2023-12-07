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
import TextField from "@mui/material/TextField";
import Add from "@mui/icons-material/Add";
import { ApartmentOutlined } from "@mui/icons-material";

const PropertiesEdit = (props: any) => {
  const { launchNew } = props;
  console.log("New Edit Renders");
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [properties, setProperties] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [content, setContent] = React.useState<any>(false);
  const [title, setTitle] = React.useState<any>(false);
  const [summary, setSummary] = React.useState<any>(null);
  const [price, setPrice] = React.useState<any>(null);
  const [country, setCountry] = React.useState<any>(null);
  const [state, setState] = React.useState<any>(null);
  const [lga, setLga] = React.useState<any>(null);
  const [town, setTown] = React.useState<any>(null);
  const [address, setAddress] = React.useState<any>(null);
  const [longitude, setLongitude] = React.useState<any>(null);
  const [latitude, setLatitude] = React.useState<any>(null);
  const [id, setId] = React.useState<any>(false);
  const [cat_id, setCatId] = React.useState<any>(false);
  const [preview_image, setPreview] = React.useState<any>(null);
  const [file, setFile] = React.useState<any>(null);
  const [new_file, setNewFile] = React.useState<any>(0);
  const [categories_fetched, setCategoriesFetched] =
    React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<any[]>([]);
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
    content: "",
    id: 0,
    related_articles: [],
  });

  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.MyPropertiesUrl ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchProperties(params.MyPropertiesUrl);
    }
  }, []);

  const fetchProperties = (url: string) => {
    console.log(url);
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("properties", {
      url: url,
      mode: "details",
      is_admin: true,
    })
      .then(
        (result) => {
          setLoading(false);
          console.log(":::", result);
          if (result.status === 1) {
            const res = result.data;
            setContent(res.description);
            setTitle(res.title);
            setSummary(res.summary);
            setPrice(res.price);
            setCountry(res.location_country);
            setState(res.location_state);
            setLga(res.location_lga);
            setTown(res.location_town);
            setAddress(res.location_address);
            setLongitude(res.location_longitude);
            setLatitude(res.location_latitude);
            setCatId(res.category_id);
            setId(res.id);
            setPreview(
              process.env.REACT_APP_SERVER_FILES_DOMAIN + result.data.photo
            );
          }
        },
        (error) => {
          setProperties({});
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
      if (name === "cat_id") {
        setCatId(value);
      } else if (name === "title") {
        setTitle(value);
      }
    },
    [properties]
  );

  const onHtmlChange = (e: any) => {
    setContent(e.target.value);
    console.log(content);
  };

  const onSummaryChange = (e: any) => {
    setSummary(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", content);
    formData.append("mode", "edit");
    formData.append("is_new_file", new_file);
    formData.append("cat_id", cat_id);
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("price", price);
    formData.append("location_country", country);
    formData.append("location_state", state);
    formData.append("location_lga", lga);
    formData.append("location_town", town);
    formData.append("location_address", address);
    formData.append("location_longitude", longitude);
    formData.append("location_latitude", latitude);
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
              navigate(`/account/my-properties/p/${resp.url}`);
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
                    <span>Edit Property</span>
                  </Breadcrumbs>
                  <h2 className="mt20">
                    <ApartmentOutlined /> {title}
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={"Properties Title "}
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
              <div className="input">
                <label>Select Category</label>
                <select
                  name="cat_id"
                  className="form-control"
                  onChange={handleInputChange}
                >
                  <option
                    value={properties.cat_id}
                    defaultValue={properties.cat_id}
                  >
                    {properties.cat_title}
                  </option>
                  {categories.map((item: any, i: number) => (
                    <option
                      selected={cat_id === item.id}
                      value={item.id}
                      key={item.id}
                    >
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input">
                <label>Summary</label>
                <TextField
                  className="form-control"
                  name={"summary"}
                  value={summary}
                  onChange={onSummaryChange}
                />
              </div>
              <div className={loading ? " input iconed " : " input "}>
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={"Property Price"}
                />
              </div>
              <div className={loading ? " input iconed " : " input "}>
                <label>Location Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={"Property Location country"}
                />
              </div>
              <div className={loading ? " input iconed " : " input "}>
                <label>Location State</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder={"Property Location state"}
                />
              </div>
              <div className={loading ? " input iconed " : " input "}>
                <label>Location LGA</label>
                <input
                  type="text"
                  className="form-control"
                  name="lga"
                  value={lga}
                  onChange={(e) => setLga(e.target.value)}
                  placeholder={"Property Location LGA"}
                />
              </div>
              <div className={loading ? " input iconed " : " input "}>
                <label>Location Town</label>
                <input
                  type="text"
                  className="form-control"
                  name="town"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  placeholder={"Property Location Town"}
                />
              </div>
              <div className={loading ? " input iconed " : " input "}>
                <label>Location Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={"Property Location Address"}
                />
              </div>
              <div className="flex flex-row-resp align-items-center">
                <div className={"spacer input pr10"}>
                  <label>Location Latitude</label>
                  <input
                    type="text"
                    className="form-control"
                    name="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder={"Property Location latitude"}
                  />
                </div>
                <div className={"spacer input"}>
                  <label>Longitude</label>
                  <input
                    type="text"
                    className="form-control"
                    name="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder={"Property Location longitude"}
                  />
                </div>
              </div>
              <div className="mb10">
                <DefaultEditor
                  className="form-control"
                  value={content}
                  placeholder="Properties Content"
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
                {loading ? "Working..." : " Edit Properties "}
              </Button>
            </div>
          </Card>
        </div>
      </section>{" "}
      <CustomModal data={toast} />
    </React.Fragment>
  );
};

export default PropertiesEdit;
