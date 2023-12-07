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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PinDropOutlined, PinOutlined } from "@mui/icons-material";
import PropertyComments from "../../public/Properties/PropertiesComments";
const CommentsDetails = (props: any) => {
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [properties, setProperty] = React.useState<any>({
    related_articles: [],
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
      fetchProperty(params.propertiesUrl);
    }
  }, [params]);

  const fetchProperty = (url: string) => {
    console.log(url);
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("properties", { url: url, mode: "details" })
      .then(
        (result) => {
          setLoading(false);
          console.log("::|", result);
          if (result) {
            setProperty(result);
            const pub_mode =
              result.is_published === 1 ? "unpublish" : "publish";
            const feat_mode =
              result.is_featured === 1 ? "unfeature" : "feature";
            setPublish(pub_mode);
            setFeature(feat_mode);
          } else {
            const now = new Date().getTime() / 1000;
            setProperty({
              title: "Property does not exist",
              content: `The article you are looking for does not exist. 
              It might not be published yet, deleted or you typed a wrong properties url.`,
              create_date: now,
              related_articles: [],
            });
          }
        },
        (error) => {
          setProperty({ related_articles: [] });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  const launchEdit = (id: any) => {
    return navigate(`/admin/comments/e/${id}`);
  };
  const doPublish = (data: any) => {
    console.log("data: ", data);
    setLoading(true);
    setLoaded(false);
    setConfirm({
      ...confirm,
      onopen: true,
      id: data.id,
      title: `${data.action} comment`,
      loading_text: `${data.action}ing...`,
    });
    HttpService.post({ id: data.id, mode: data.action }, "properties")
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          setConfirm({
            ...confirm,
            onopen: true,
            id: data.id,
            title: " Comment",
            loading_text: result.message,
          });
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
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
  const launchAction = (data: any) => {
    console.log(data);
    const act = data.action === "delete" ? "delete-comment" : "";
    setConfirm({
      ...confirm,
      onopen: true,
      id: data.id,
      action: act,
      title: data.action + " comment",
      loading_text: `Are you sure you want to ${data.action} this comment?`,
    });
  };
  return (
    <React.Fragment>
      <section className="pxy10">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="txt-xlg">
              <i className="fas fa-propertiespaper"></i>{" "}
              <span>{decodeHtml(properties.title)}</span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="container">
              <div className="properties-main">
                <div className="date-class">
                  <DatePipe value={properties.create_date * 1000} />
                </div>
                <div className="properties-banner">
                  <img
                    src={
                      process.env.REACT_APP_SERVER_FILES_DOMAIN +
                      properties.photo
                    }
                    alt="properties banner"
                  />
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(properties.content),
                  }}
                ></div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </section>
      <div className="pxy0">
        {properties.comments && (
          <PropertyComments
            data={properties.comments}
            is_admin={true}
            delete_action={launchAction}
            edit_action={launchEdit}
          />
        )}
      </div>
      <ConfirmModal data={confirm} />
    </React.Fragment>
  );
};

export default CommentsDetails;
