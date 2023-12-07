import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";

const MyPropertiesPopulate = (props: any) => {
  console.log("populate details Renders");
  let val = props.data;
  let navigate = useNavigate();
  let params: any = useParams();
  const [properties, setProperties] = React.useState<any>({});
  const [gallery, setGallery] = React.useState<any>({ photos: [] });
  const [isParam, setParam] = React.useState<any>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [caption, setCaption] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [id, setId] = React.useState<any>(false);
  const [banner_id, setBannerId] = React.useState<any>(false);
  const [loading_text, setText] = React.useState<string>("Save Now");
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
  const [meta, setMeta] = React.useState<any>(new FormData());
  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.propertyUrl ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchPiks(params.propertyUrl);
    }
  }, []);

  const fetchPiks = (url: any) => {
    console.log(url);
    setLoading(true);
    setLoaded(false);
    HttpService.postFormHeader("properties", {
      url: url,
      mode: "property-files",
    })
      .then(
        (result) => {
          console.log(result);
          setProperties(result.data);
          let pix: any[] = [];
          for (let i = 0; i < result.photos.length; i++) {
            let fa = result.photos[i];
            fa.is_file_changed = false;
            fa.new_file = false;
            fa.fresh = false;
            fa.preview_file =
              process.env.REACT_APP_SERVER_FILES_DOMAIN +
              result.photos[i].thumb;
            const formData = new FormData();
            fa.form_data = formData;
            pix.push(fa);
          }
          let newOb = { ...result, photos: pix };
          console.log(newOb);
          setGallery(newOb);
          if (!caption) {
            setDescription(result.description);
            setCaption(result.caption);
            setId(result.id);
            setBannerId(result.photos[0].id);
            setPreview(
              process.env.REACT_APP_SERVER_DOMAIN + result.photos[0].src
            );
          }
          setLoaded(true);
          console.log("gallery:::", gallery);
        },
        (error) => {
          setGallery({ photos: [] });
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
        setCaption(value);
      }
    },
    [gallery]
  );

  const onHtmlChange = (e: any) => {
    setDescription(e.target.value);
    console.log(description);
  };

  const handleSubmit = (e: any) => {
    //e.preventDefault();
    let formData = new FormData();
    for (let i = 0; i < gallery.photos.length; i++) {
      if (gallery.photos[i]["new_file"]) {
        formData.append("files[]", gallery.photos[i]["form_data"]);
        formData.append("ids[]", gallery.photos[i]["id"]);
        formData.append("property_id", properties.id);
        console.log(gallery.photos[i]["form_data"]);
      }
    }
    formData.append("mode", "populate_property_files");
    formData.append("id", properties.id);

    console.log(formData);

    setLoading(true);
    setLoaded(false);
    setToast({
      ...toast,
      onopen: true,
      message: "Uploading pictures...",
      onclose: onToastClose,
    });
    HttpService.postFormHeader("properties", formData)
      .then(
        (resp) => {
          console.log(resp);
          setToast({
            ...toast,
            onopen: true,
            message: resp.message,
            onclose: onToastClose,
          });
          if (resp.status === 1) {
            setTimeout(() => {
              return navigate(`/account/my-properties/p/${params.propertyUrl}`);
            }, 3000);
          }
        },
        (error) => {
          setToast({
            ...toast,
            onopen: true,
            message: error.message,
            onclose: onToastClose,
          });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postTicket
  };

  const handleFileChange = (e: any, index: number) => {
    let glx = { ...gallery };
    let fname = e.target.name;
    let flx = e.target.files[0];
    flx.item_id = glx["photos"][index]["id"];
    flx.gallery_id = gallery.id;
    glx["photos"][index]["form_data"] = flx;
    glx["photos"][index]["new_file"] = true;
    glx["photos"][index]["is_file_changed"] = true;
    glx["photos"][index].preview_file = URL.createObjectURL(flx); // Would see a path?
    setGallery({ ...glx });
  };

  const addMore = () => {
    let glx = { ...gallery };
    const formData = new FormData();
    glx["photos"].push({
      id: 0,
      preview_image: "",
      new_file: false,
      is_file_changed: false,
      form_data: formData,
      fresh: true,
    });
    setGallery({ ...glx });
  };
  return (
    <>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-caption-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-gallery"></i> Add/Edit Pictures
        </h3>
        <div className="spacer"></div>
        <div></div>
      </div>
      <Divider />

      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          padding: "10px",
          width: "100%",
        }}
      >
        <Link to={`/account/my-properties`}>My Properties</Link>
        <Link to={`/account/my-properties/p/${properties.url}`}>
          {properties.title}
        </Link>
      </Breadcrumbs>
      <div className="px10 pb10">
        {loaded && (
          <Card sx={{ p: "20px", m: "0" }}>
            <div className="gallery-grid z-high">
              {gallery.photos.map((item: any, index: number) => (
                <div className="gal-pop" key={index}>
                  <img src={item.preview_file} alt={`Pic ${index}`} />
                  <div className="pic-sel">
                    <input
                      type="file"
                      name={`pic_num[${index}]`}
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </div>
                </div>
              ))}

              <div className="gal-pop">
                <Button size="large" onClick={addMore}>
                  ADD MORE
                </Button>
              </div>
            </div>

            <div className="pxy10">
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
        )}
      </div>

      <CustomModal data={toast} />
    </>
  );
};

export default MyPropertiesPopulate;
