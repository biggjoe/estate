import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import HttpService from "../../../services/HttpService";
import * as processHtml from "../../../services/processHtml";
import DatePipe from "../../../pipes/DatePipe";
import PlaceHolder from "../../templates/PlaceHolder";
import Four0Four from "../Four0Four/Four0Four";
import PropertiesComments from "./PropertiesComments";
import { DefaultEditor } from "react-simple-wysiwyg";
import RelatedPropertiesListTemplate from "../../templates/RelatedPropertiesListTemplate";
import SeoModule from "../../../services/SeoModule";
import PropertiesLikeTemplate from "../../templates/PropertiesLikeTemplate";
import PropertiesShareTemplate from "../../templates/PropertiesShareTemplate";
import GalleryCarousel from "../../templates/GalleryCarousel";
import Currency from "../../../services/Currency";
import { Breadcrumbs } from "@mui/material";
import RequestInspection from "../../templates/RequestInspection";
import ContactSeller from "../../templates/ContactSeller";
import MapLauncher from "../../templates/MapLauncher";

const PropertiesDetail = () => {
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [properties, setProperties] = React.useState<any>({
    related_properties: [],
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<any>(false);
  const [isParam, setParam] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    console.log("::params::", params);
    const isParam = params.url ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchProperties(params.url);
    }
  }, [params]);

  const fetchProperties = (url: string) => {
    setLoading(true);
    setLoaded(false);
    HttpService.post({ url: url, mode: "details" }, "properties")
      .then(
        (result) => {
          setLoading(false);
          console.log("PROP DETAILS PAGE:: ", result);
          if (result.status === 1) {
            document.title = result.data.title + "";
            setProperties(result.data);
          } else {
            const now = new Date().getTime() / 1000;
            document.title = "Article not found";
            setProperties({
              id: 1,
              title: "Properties does not exist",
              content: `The article you are looking for does not exist. 
              It might not be published yet, deleted or you typed a wrong properties url.`,
              create_date: now,
              related_properties: [],
            });
          }
        },
        (error) => {
          setProperties({ related_properties: [] });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const onToastClose = () => {
    setToast({ onopen: false, onclose: onToastClose });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });

  const [meta, setMeta] = React.useState<any>({});
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
    setMessage(e.target.value);
    console.log(message);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", message);
    formData.append("mode", "save-comment");
    formData.append("name", meta.name);
    formData.append("property_id", properties.id);
    formData.append("email", meta.email);
    console.log(formData);
    setLoading(true);
    setLoaded(false);
    HttpService.postFormHeader("properties", formData)
      .then(
        (resp) => {
          console.log(resp);
          setToast({ ...toast, onopen: true, message: resp.message });
          if (resp.status === 1) {
            setTimeout(() => {
              setToast({ ...toast, onopen: false });
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

  const [show_comment, setShow] = React.useState<boolean>(false);

  const togComment = (): void => {
    setShow(!show_comment);
  };
  return (
    <React.Fragment>
      <SeoModule
        title={properties.title}
        description={properties.summary}
        name={"Joevic Choice  Properties"}
        page_image={
          process.env.REACT_APP_SERVER_FILES_DOMAIN + properties.photo
        }
        page_url={process.env.REACT_APP_SERVER_DOMAIN + properties.url}
        type="Article"
      />
      <Breadcrumbs
        sx={{
          margin: "20px 20px 0 20px",
          backgroundColor: "transparent !important",
        }}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/properties"}>Properties</Link>
        <span>{properties?.title}</span>
      </Breadcrumbs>
      <section className="page-main">
        <Grid
          container
          rowSpacing={0}
          columnSpacing={{ xs: 0, sm: 2, md: 2 }}
          sx={{
            display: "flex",
            padding: "20px 20px 0 20px",
            backgroundColor: "#fafafa",
          }}
        >
          <Grid item xs={12} sm={12} md={8}>
            <Card sx={{ p: "0", borderRadius: "0", flexGrow: "1" }}>
              {loading && (
                <div className="pxy20">
                  <Skeleton
                    sx={{ borderRadius: "1px", display: "block" }}
                    variant="rectangular"
                    height={"400px"}
                    width={"100%"}
                  />
                </div>
              )}
              {loaded && properties && (
                <>
                  <div className="pxy10 border-bottom">
                    <h2>{properties.title}</h2>
                  </div>
                  <GalleryCarousel items={properties.property_files} />
                </>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ borderRadius: "0", flex: "0 1" }}>
              <div className="py10 px20">
                <div className="meta-bar">
                  <div className="meta-item">
                    <span className="meta-label">Address</span>
                    <div className="meta-value">
                      {properties.location_address}
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Town</span>
                    <div className="meta-value">{properties.location_town}</div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">LGA</span>
                    <div className="meta-value">{properties.location_lga}</div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">State</span>
                    <div className="meta-value">
                      {properties.location_state}
                    </div>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Price</span>
                    <div className="currency-span color-primary">
                      <Currency value={properties.price} />
                    </div>
                  </div>
                </div>
                {properties.sale_status === 0 && (
                  <>
                    <div className="py10 flex">
                      <span className="sm-hide spacer"></span>
                      <ContactSeller {...properties} />
                    </div>
                    <Divider />
                    <div className="py10 flex">
                      <span className="sm-hide spacer"></span>
                      <RequestInspection {...properties} />
                    </div>
                  </>
                )}
              </div>
            </Card>
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={0}
          columnSpacing={{ xs: 0, sm: 2, md: 2 }}
          sx={{
            display: "flex",
            padding: "0 20px 20px 20px",
            backgroundColor: "#fafafa",
          }}
        >
          <Grid item xs={12} sm={12} md={8}>
            <Card sx={{ p: "0", borderRadius: "0", flexGrow: "1" }}>
              <div className="pxy20">
                <div className="main-react-span">
                  <PropertiesShareTemplate
                    properties={properties}
                    position={"bottom"}
                  />
                  <span className="spacer"></span>
                  <span>
                    <MapLauncher {...properties} />
                  </span>
                </div>

                <h2>Property Description</h2>

                <div
                  className="py10"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(properties.description),
                  }}
                ></div>
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <RelatedPropertiesListTemplate
              title="Similar Properties"
              properties={properties.related_properties}
              loading={loading}
              loaded={loaded}
            />
          </Grid>
        </Grid>
      </section>
    </React.Fragment>
  );
};

export default PropertiesDetail;
