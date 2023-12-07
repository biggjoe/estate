import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import HttpService from "../../services/HttpService";
import * as processHtml from "../../services/processHtml";
import GalleryCarousel from "./GalleryCarousel";
import DatePipe from "../../pipes/DatePipe";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import Edit from "@mui/icons-material/Edit";
import PublishOutlined from "@mui/icons-material/PublishOutlined";
import ButtonGroup from "@mui/material/ButtonGroup";
import PlaceHolder from "./PlaceHolder";
const GalleryDetailsTemplate = (props: any) => {
  const { base } = props;
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [gallery, setGallery] = React.useState<any>({ related_articles: [] });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [publish_mode, setPublish] = React.useState("publish");
  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.galleryId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchgallery(params.galleryId);
    }
  }, [params]);

  const fetchgallery = (id: any) => {
    console.log(id);
    setLoading(true);
    setLoaded(false);
    HttpService.post({ id: id, mode: "details" }, "gallery")
      .then(
        (result) => {
          setLoading(false);
          console.log("::|", result);
          if (result) {
            setTimeout(() => {
              setLoaded(true);
              setGallery(result);
            }, 100);
            const pub_mode =
              result.is_published === 1 ? "unpublish" : "publish";
            setPublish(pub_mode);
          } else {
            const now = new Date().getTime() / 1000;
            setGallery({
              title: "Gallery does not exist",
              content: `The gallery you are looking for does not exist. 
              It might not be published yet, deleted or you typed a wrong gallery url.`,
              create_date: now,
            });
          }
        },
        (error) => {
          setGallery({});
        }
      )
      .finally(() => {
        setLoading(false);
      }); //fetch
  }; //doAjax

  const launchEdit = (id: any) => {
    return navigate(`${base}/e/${id}`);
  };
  const doPublish = (data: any) => {
    setLoading(true);
    setLoaded(false);
    setConfirm({
      ...confirm,
      onopen: true,
      id: data.id,
      title: `${data.action} gallery`,
      loading_text: `${data.action}ing...`,
    });
    HttpService.post({ id: data.id, mode: data.action }, "gallery")
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          setConfirm({
            ...confirm,
            onopen: true,
            id: data.id,
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
    setConfirm({
      ...confirm,
      onopen: true,
      id: data.id,
      action: data.action,
      title: data.action + " gallery",
      loading_text: `Are you sure you want to ${data.action} this gallery?`,
    });
  };
  return (
    <React.Fragment>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-content-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-gallerypaper"></i>{" "}
          <span>{decodeHtml(gallery.caption)}</span>
        </h3>
        <div className="spacer"></div>
        <div>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Tooltip title="Edit gallery">
              <Button
                size="small"
                color="primary"
                onClick={() => launchEdit(gallery.id)}
              >
                <Edit /> Edit
              </Button>
            </Tooltip>

            <Tooltip title={`${publish_mode} gallery`}>
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  launchAction({ id: gallery.id, action: publish_mode })
                }
              >
                <PublishOutlined /> {publish_mode}
              </Button>
            </Tooltip>

            <Tooltip title={`delete gallery`}>
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  launchAction({ id: gallery.id, action: "delete" })
                }
              >
                <DeleteForeverOutlined /> Delete
              </Button>
            </Tooltip>
          </ButtonGroup>
        </div>
      </div>
      <Divider />

      <section className="page-main"></section>
      <div className="gallery-modal">
        <div className="gallery-carousel-container">
          <div className="carousel-overlay"></div>
          <div className="carousel-base">
            <Link to={`${base}`} className="gallery-close">
              <i className="fas fa-close"></i>
            </Link>
            {loaded && <GalleryCarousel items={gallery.photos} />}
            {loading && <span className="loadex">Loading Gallery....</span>}

            <div className="actions-pane">
              {base === "/admin/gallery" && (
                <>
                  <Tooltip
                    title="Add More Items"
                    sx={{ zIndex: "3000000000000000 !important" }}
                  >
                    <Link to={`${base}/px/${gallery.id}`}>
                      <i className="fas fa-plus"></i>{" "}
                    </Link>
                  </Tooltip>
                  <Tooltip
                    title="Edit Gallery"
                    sx={{ zIndex: "30000000000000000 !important" }}
                  >
                    <Link to={`${base}/e/${gallery.id}`}>
                      <i className="fas fa-edit"></i>{" "}
                    </Link>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="gallery-comments">
          {!loaded && <PlaceHolder type="gallery-content" />}
          {loaded && (
            <div className="gallery-comments-container">
              <h2>{gallery.caption}</h2>
              <div className="date-class">
                <i className="fas fa-clock"></i>{" "}
                <DatePipe value={gallery.create_date * 1000} />
              </div>
              <div
                className="gallery-description"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(gallery.description),
                }}
              />
            </div>
          )}
          <div className="gallery-comments-meta">META</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GalleryDetailsTemplate;
