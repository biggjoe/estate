import React from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import * as processHtml from "../../../services/processHtml";
import DatePipe from "../../../pipes/DatePipe";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import Edit from "@mui/icons-material/Edit";
import PublishOutlined from "@mui/icons-material/PublishOutlined";
import ButtonGroup from "@mui/material/ButtonGroup";
import ConfirmModal from "../../templates/ConfirmModal";
import Card from "@mui/material/Card";
import GalleryCarousel from "../../templates/GalleryCarousel";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { PinDropOutlined, PinOutlined } from "@mui/icons-material";
import MarkSold from "../../templates/MarkSold";
import EditPropertyPictures from "../../templates/EditPropertyPictures";
const PropertiesDetails = (props: any) => {
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [properties, setProperties] = React.useState<any | null>({
    related_properties: [],
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [publish_mode, setPublish] = React.useState("publish");
  const [feature_mode, setFeature] = React.useState("feature");
  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.propertiesUrl ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchProperties(params.propertiesUrl);
    }
  }, [params]);

  const fetchProperties = (url: string) => {
    console.log(url);
    setLoading(true);
    setLoaded(false);
    const load = { url: url, mode: "details", is_admin: true };
    console.log(load);
    HttpService.postHeader("properties", load)
      .then(
        (result) => {
          setLoading(false);
          console.log("::|", result);
          if (result.status === 1) {
            setProperties(result.data);
            const pub_mode =
              result.data.is_published === 1 ? "unpublish" : "publish";
            const feat_mode =
              result.data.is_featured === 1 ? "unfeature" : "feature";
            setPublish(pub_mode);
            setFeature(feat_mode);
          } else {
            const now = new Date().getTime() / 1000;
            setProperties(null);
          }
        },
        (error) => {
          setProperties(null);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const launchEdit = (url: any) => {
    return navigate(`/admin/properties/e/${url}`);
  };
  const doPublish = (data: any) => {
    setLoading(true);
    setLoaded(false);
    setConfirm({
      ...confirm,
      onopen: true,
      id: data.id,
      title: `${data.action} property`,
      loading_text: `${data.action}ing...`,
    });
    HttpService.post({ id: data.id, mode: data.action }, "properties")
      .then(
        (result) => {
          console.log(result);
          setConfirm({
            ...confirm,
            onopen: true,
            id: data.id,
            title: " Property",
            loading_text: result.message,
            onclose: closeConfirm,
          });

          setTimeout(() => {
            setConfirm({
              ...confirm,
              onopen: false,
              onclose: closeConfirm,
            });
          }, 5000);
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  };
  const closeConfirm = () => {
    setConfirm({ ...confirm, onopen: false });
  };
  const [confirm, setConfirm] = React.useState<any>({
    onopen: false,
    onaccept: doPublish,
    onclose: closeConfirm,
    loading_text: "",
    title: "",
    id: "",
    action: "",
  });
  const closePicEdit = () => {
    setPicEdit({ ...pic_edit, onopen: false });
  };
  const [pic_edit, setPicEdit] = React.useState<any>({
    onopen: false,
    onclose: closePicEdit,
  });
  const launchAction = (data: any) => {
    console.log(data);
    if (data === "edit_pic") {
      return navigate("/admin/properties/po/" + properties.url);
    } else {
      setConfirm({
        ...confirm,
        onopen: true,
        id: data.id,
        action: data.action,
        onclose: closeConfirm,
        title: data.action + " property",
        loading_text: `Are you sure you want to ${data.action} this property?`,
      });
    }
  };

  if (properties) {
    return (
      <React.Fragment>
        <div
          className="page-top-intro flex px10 py10 align-items-center 
      justify-content-center"
        >
          <div className="spacer"></div>
          <div>
            <div>
              <MarkSold {...properties} />
              <Tooltip title="Edit Property">
                <Button
                  size="small"
                  color="primary"
                  onClick={() => launchEdit(properties.url)}
                >
                  <Edit />
                  <span className="sm-hide-inline"> Edit</span>
                </Button>
              </Tooltip>
              <Tooltip title="Edit Property">
                <Button
                  size="small"
                  color="primary"
                  onClick={() => launchAction("edit_pic")}
                >
                  <Edit />
                  <span className="sm-hide-inline"> Add/Edit Pictures</span>
                </Button>
              </Tooltip>

              <Tooltip title={`${publish_mode} Property`}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    launchAction({ id: properties.id, action: publish_mode })
                  }
                >
                  <PublishOutlined />
                  <span className="sm-hide-inline"> {publish_mode}</span>
                </Button>
              </Tooltip>

              <Tooltip title={`${properties.highlight_mode} Property`}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    launchAction({
                      id: properties.id,
                      action: properties.highlight_mode,
                    })
                  }
                >
                  <PinDropOutlined />
                  <span className="sm-hide-inline">
                    {properties.highlight_mode}
                  </span>
                </Button>
              </Tooltip>

              <Tooltip title={`${feature_mode} Property`}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    launchAction({ id: properties.id, action: feature_mode })
                  }
                >
                  <PinOutlined />
                  <span className="sm-hide-inline"> {feature_mode}</span>
                </Button>
              </Tooltip>

              <Tooltip title={`Delete Property`}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    launchAction({ id: properties.id, action: "delete" })
                  }
                >
                  <DeleteForeverOutlined />
                  <span className="sm-hide-inline"> Delete</span>
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        <Divider />

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
                      <Link to="/admin/properties">Properties</Link>
                    </Breadcrumbs>
                    <h2 className="mt20">{properties.title}</h2>
                  </div>
                </div>
              </div>

              <div className="pxy20">
                {loaded && properties.property_files.length > 0 && (
                  <GalleryCarousel items={properties.property_files} />
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(properties.description),
                  }}
                ></div>
              </div>
            </Card>
          </div>
        </section>
        <ConfirmModal data={confirm} />
        {pic_edit.onopen && <EditPropertyPictures data={pic_edit} />}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>Error Loading properties</div>
      </React.Fragment>
    );
  }
};

export default PropertiesDetails;
