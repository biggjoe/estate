import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import PublishOutlined from "@mui/icons-material/PublishOutlined";
import Edit from "@mui/icons-material/Edit";
import PlaceHolder from "../../templates/PlaceHolder";
import * as processHtml from "../../../services/processHtml";
import Currency from "../../../pipes/Currency";
import DatePipe from "../../../pipes/DatePipe";
import ConfirmModal from "../../templates/ConfirmModal";

export default function CategoryDetails(props: any) {
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [category, setCategory] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [publish_mode, setPublish] = React.useState("publish");
  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.categoryId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchcategory(params.categoryId);
    }
  }, [params]);

  const fetchcategory = (id: string) => {
    console.log(id);
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("properties", {
      id: id,
      is_admin: true,
      mode: "category-details",
    })
      .then(
        (result) => {
          setLoading(false);
          console.log("::|", result);
          if (result) {
            setCategory(result);
            const pub_mode =
              result.is_published === 1 ? "unpublish" : "publish";
            setPublish(pub_mode);
          } else {
            const now = new Date().getTime() / 1000;
            setCategory({
              title: "category does not exist",
              content: `The category you are looking for does not exist. 
              It might not be published yet, deleted or you typed a wrong category url.`,
              create_date: now,
            });
          }
        },
        (error) => {
          setCategory({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  const launchEdit = (id: any) => {
    return navigate(`/admin/categories/e/${id}`);
  };
  const doPublish = (data: any) => {
    setLoading(true);
    setLoaded(false);
    setConfirm({
      ...confirm,
      onopen: true,
      id: data.id,
      title: `${data.action} category`,
      loading_text: `${data.action}ing...`,
    });
    const imode = data.action === "delete" ? "delete-category" : data.action;
    HttpService.post({ id: data.id, mode: imode }, "properties")
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
      title: data.action + " category",
      loading_text: `Are you sure you want to ${data.action} this category?`,
    });
  };

  return (
    <React.Fragment>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-content-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-user"></i> <span>{`${category.title} `}</span>
        </h3>
        <div className="spacer"></div>
        <div>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Tooltip title="Edit Category">
              <Button
                size="small"
                color="primary"
                onClick={() => launchEdit(category.id)}
              >
                <Edit /> Edit
              </Button>
            </Tooltip>

            <Tooltip title={`Delete Category`}>
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  launchAction({ id: category.id, action: "delete" })
                }
              >
                <DeleteForeverOutlined /> Delete
              </Button>
            </Tooltip>
          </ButtonGroup>
        </div>
      </div>
      <Divider />

      <section className="page-main">
        <section className="page-top">
          <div className="page-info">
            <h2>{`${category.title} `}</h2>
          </div>
        </section>
        <div className="container">
          <div className="programs-main">
            <div className="date-class py10">
              <Link to="/admin/categories">Category</Link> &raquo;&nbsp;
              <span>{`${category.title} `}</span>
            </div>
            <div className="date-class">--</div>

            <div
              style={{
                minHeight: "400px",
                backgroundImage: `url(${
                  process.env.REACT_APP_SERVER_FILES_DOMAIN + category.bg_photo
                })`,
              }}
              dangerouslySetInnerHTML={{
                __html: decodeHtml(category.summary),
              }}
            ></div>
          </div>
        </div>
      </section>
      <ConfirmModal data={confirm} />
    </React.Fragment>
  );
}
