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

export default function StaffDetails(props: any) {
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [staff, setStaff] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [publish_mode, setPublish] = React.useState("publish");
  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.staffId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchStaff(params.staffId);
    }
  }, [params]);

  const fetchStaff = (id: string) => {
    console.log(id);
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("staff", { id: id, mode: "details" })
      .then(
        (result) => {
          setLoading(false);
          console.log("::|", result);
          if (result) {
            setStaff(result);
            const pub_mode =
              result.is_published === 1 ? "unpublish" : "publish";
            setPublish(pub_mode);
          } else {
            const now = new Date().getTime() / 1000;
            setStaff({
              title: "staff does not exist",
              content: `The article you are looking for does not exist. 
              It might not be published yet, deleted or you typed a wrong staff url.`,
              create_date: now,
              related_articles: [],
            });
          }
        },
        (error) => {
          setStaff({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  const launchEdit = (id: any) => {
    return navigate(`/admin/staff/e/${id}`);
  };
  const doPublish = (data: any) => {
    setLoading(true);
    setLoaded(false);
    setConfirm({
      ...confirm,
      onopen: true,
      id: data.id,
      title: `${data.action} staff`,
      loading_text: `${data.action}ing...`,
    });
    HttpService.post({ id: data.id, mode: data.action }, "staff")
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
      title: data.action + " staff",
      loading_text: `Are you sure you want to ${data.action} this staff?`,
    });
  };

  return (
    <React.Fragment>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-content-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-user"></i>{" "}
          <span>{`${staff.firstname} ${staff.surname} `}</span>
        </h3>
        <div className="spacer"></div>
        <div>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Tooltip title="Edit programs">
              <Button
                size="small"
                color="primary"
                onClick={() => launchEdit(staff.id)}
              >
                <Edit /> Edit
              </Button>
            </Tooltip>

            <Tooltip title={`${publish_mode} programs`}>
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  launchAction({ id: staff.id, action: publish_mode })
                }
              >
                <PublishOutlined /> {publish_mode}
              </Button>
            </Tooltip>

            <Tooltip title={`delete programs`}>
              <Button
                size="small"
                color="primary"
                onClick={() => launchAction({ id: staff.id, action: "delete" })}
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
          <div className="page-top-cover"></div>
          <div className="container flex align-items-center z-high py20">
            <div className="page-info">
              <h2>{`${staff.firstname} ${staff.surname} `}</h2>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="programs-main">
            <div className="date-class py10">
              <Link to="/admin/staff">Staff</Link> &raquo;&nbsp;
              <span>{`${staff.firstname} ${staff.surname} `}</span>
            </div>
            <div className="date-class">
              <DatePipe value={staff.reg_time * 1000} />
            </div>
            <div className="news-banner">
              <img
                src={process.env.REACT_APP_SERVER_FILES_DOMAIN + staff.avatar}
                alt="news banner"
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(staff.bio),
              }}
            ></div>
          </div>
        </div>
      </section>
      <ConfirmModal data={confirm} />
    </React.Fragment>
  );
}
