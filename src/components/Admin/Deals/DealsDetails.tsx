import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Edit from "@mui/icons-material/Edit";
import PlaceHolder from "../../templates/PlaceHolder";
import * as processHtml from "../../../services/processHtml";
import Currency from "../../../pipes/Currency";
import DatePipe from "../../../pipes/DatePipe";
import ConfirmModal from "../../templates/ConfirmModal";
import { FlagOutlined } from "@mui/icons-material";
import PropertiesListTemplate from "../../templates/PropertiesListTemplate";

export default function DealsDetails(props: any) {
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [deals, setDeals] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [publish_mode, setPublish] = React.useState("publish");
  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.pId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchdeals(params.pId);
    }
  }, [params]);

  const fetchdeals = (id: string) => {
    console.log(id);
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("properties", {
      id: id,
      is_admin: true,
      mode: "deal-details",
    })
      .then(
        (result) => {
          setLoading(false);
          console.log("::|", result);
          if (result) {
            setDeals(result);
          } else {
            const now = new Date().getTime() / 1000;
            setDeals({
              title: "deals does not exist",
              content: `The deals you are looking for does not exist. 
              It might not be published yet, deleted or you typed a wrong deals url.`,
              create_date: now,
            });
          }
        },
        (error) => {
          setDeals({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const launchEdit = (id: any) => {
    return navigate(`/admin/deals/e/${id}`);
  };
  const doPublish = (data: any) => {
    setLoading(true);
    setLoaded(false);
    setConfirm({
      ...confirm,
      onopen: true,
      id: data.id,
      title: `${data.action} deals`,
      loading_text: `${data.action}ing...`,
    });
    const imode = data.action === "delete" ? "delete-deals" : data.action;
    HttpService.post({ id: data.id, mode: imode }, "properties")
      .then(
        (result) => {
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
      title: data.action + " deals",
      loading_text: `Are you sure you want to ${data.action} this deals?`,
    });
  };

  return (
    <React.Fragment>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-content-center"
      >
        <div className="spacer"></div>
        <div>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Tooltip title="Edit deals">
              <Button
                size="small"
                color="primary"
                onClick={() => launchEdit(deals.id)}
              >
                <Edit /> Edit
              </Button>
            </Tooltip>

            <Tooltip title={`Delete deals`}>
              <Button
                size="small"
                color="primary"
                onClick={() => launchAction({ id: deals.id, action: "delete" })}
              >
                <DeleteForeverOutlined /> Delete
              </Button>
            </Tooltip>
          </ButtonGroup>
        </div>
      </div>
      <Divider />

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
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/deals">Deals</Link>
                    <span></span>
                  </Breadcrumbs>
                  <h2>
                    <FlagOutlined /> {deals.title}
                  </h2>
                </div>
              </div>
            </div>
            <Divider />

            <section className="pxy20">
              <div
                style={{
                  minHeight: "100px",
                  backgroundImage: `url(${
                    process.env.REACT_APP_SERVER_FILES_DOMAIN + deals.bg_photo
                  })`,
                }}
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(deals.summary),
                }}
              ></div>
              <Divider />
              {loaded && (
                <PropertiesListTemplate
                  properties={deals.properties}
                  loaded={loaded}
                  loading={loading}
                />
              )}
            </section>
          </Card>
        </div>
      </section>
      <ConfirmModal data={confirm} />
    </React.Fragment>
  );
}
