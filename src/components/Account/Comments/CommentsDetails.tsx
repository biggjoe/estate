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
import NewsComments from "../../public/Properties/PropertiesComments";
const CommentsDetails = (props: any) => {
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [news, setNews] = React.useState<any>({ related_articles: [] });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [publish_mode, setPublish] = React.useState("publish");
  const [feature_mode, setFeature] = React.useState("feature");
  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.newsUrl ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchNews(params.newsUrl);
    }
  }, [params]);

  const fetchNews = (url: string) => {
    console.log(url);
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("news", { url: url, mode: "details" })
      .then(
        (result) => {
          setLoading(false);
          console.log("::|", result);
          if (result) {
            setNews(result);
            const pub_mode =
              result.is_published === 1 ? "unpublish" : "publish";
            const feat_mode =
              result.is_featured === 1 ? "unfeature" : "feature";
            setPublish(pub_mode);
            setFeature(feat_mode);
          } else {
            const now = new Date().getTime() / 1000;
            setNews({
              title: "News does not exist",
              content: `The article you are looking for does not exist. 
              It might not be published yet, deleted or you typed a wrong news url.`,
              create_date: now,
              related_articles: [],
            });
          }
        },
        (error) => {
          setNews({ related_articles: [] });
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
    HttpService.post({ id: data.id, mode: data.action }, "news")
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
              <i className="fas fa-newspaper"></i>{" "}
              <span>{decodeHtml(news.title)}</span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="container">
              <div className="news-main">
                <div className="date-class">
                  <DatePipe value={news.create_date * 1000} />
                </div>
                <div className="news-banner">
                  <img
                    src={process.env.REACT_APP_SERVER_FILES_DOMAIN + news.photo}
                    alt="news banner"
                  />
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(news.content),
                  }}
                ></div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </section>
      <div className="px10">
        {news.comments && (
          <NewsComments
            data={news.comments}
            is_admin={false}
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
