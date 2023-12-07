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
import useFetchAdvertDetails from "../../../hooks/useFetchAdvertDetails";

export default function AdvertsDetails() {
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  console.log(params);
  const aid = params.advertId ? params.advertId : null;
  const { adverts, loading_advert_details, loaded_advert_details } =
    useFetchAdvertDetails({ id: aid });

  const launchEdit = (id: any) => {
    return navigate(`/admin/adverts/e/${id}`);
  };
  const doApprove = (data: any) => {
    setLoading(true);
    setLoaded(false);
    setConfirm({
      ...confirm,
      onopen: true,
      id: data.id,
      title: `${data.action} advert`,
      loading_text: `${data.action}ing...`,
    });
    HttpService.postHeader("adverts", { id: data.id, mode: data.action })
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
        setLoaded(true);
      }); //fetch
  };
  const closeConfirm = () => {
    setConfirm({ ...confirm, onopen: false });
  };
  const [confirm, setConfirm] = React.useState<any>({
    onopen: false,
    onaccept: doApprove,
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
      title: data.action + " adverts",
      loading_text: `Are you sure you want to ${data.action} this advert?`,
    });
  };
  /**/
  return (
    <React.Fragment>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-content-center"
      >
        <div className="spacer"></div>
        <div>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Tooltip title="Edit programs">
              <Button
                size="small"
                color="primary"
                onClick={() => launchEdit(adverts.id)}
              >
                <Edit /> Edit
              </Button>
            </Tooltip>

            <Tooltip title={`${adverts.approve_mode} advert`}>
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  launchAction({ id: adverts.id, action: adverts.approve_mode })
                }
              >
                <PublishOutlined /> {adverts.approve_mode}
              </Button>
            </Tooltip>

            <Tooltip title={`delete programs`}>
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  launchAction({ id: adverts.id, action: "delete" })
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
          <div className="container">
            <div className="page-info">
              <h2>{`${adverts.title} `}</h2>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="programs-main">
            <div className="date-class py10">
              <Link to="/admin/adverts">Adverts</Link> &raquo;&nbsp;
              <span>{`${adverts.title} `}</span>
            </div>
            <div className="date-class">
              <DatePipe value={adverts.create_date * 1000} />
            </div>
            <div className="news-banner">
              <img
                src={process.env.REACT_APP_SERVER_FILES_DOMAIN + adverts.file}
                alt="advert banner"
              />
            </div>
          </div>
        </div>
      </section>
      <ConfirmModal data={confirm} /> {/**/}
    </React.Fragment>
  );
}
