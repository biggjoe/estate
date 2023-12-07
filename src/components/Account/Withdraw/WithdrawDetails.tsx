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
import Currency from "../../../pipes/Currency";
const WithdrawDetails = (props: any) => {
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [withdrawals, setWithdraw] = React.useState<any | null>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [approve_mode, setApprove] = React.useState("approve");
  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.wId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchwithdrawals(params.wId);
    }
  }, [params]);

  const fetchwithdrawals = (id: string) => {
    console.log(id);
    setLoading(true);
    setLoaded(false);
    const load = { id: id, mode: "withdraw-request-details" };
    console.log(load);
    HttpService.postHeader("general", load)
      .then(
        (result) => {
          setLoading(false);
          console.log("::|", result);
          if (result.status === 1) {
            setWithdraw(result.data);
          } else {
            setWithdraw({});
          }
        },
        (error) => {
          setWithdraw({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax
  const Pending = () => {
    return (
      <>
        <i className="fas fa-hourglass"></i>{" "}
        <span className="pl10"> Pending</span>
      </>
    );
  };
  const Approved = () => {
    return (
      <>
        <i className="fas fa-check-double success"></i>{" "}
        <span className="pl10"> Approved</span>
      </>
    );
  };
  const Cancelled = () => {
    return (
      <>
        <i className="fas fa-ban error"></i>{" "}
        <span className="pl10"> Cancelled</span>
      </>
    );
  };
  if (withdrawals) {
    return (
      <React.Fragment>
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
                      <Link to="/account/dashboard">Dashboard</Link>
                      <Link to="/account/withdrawals">withdrawals</Link>
                    </Breadcrumbs>
                    <h2 className="mt20">
                      Request to withdraw:
                      <Currency value={withdrawals.amount} />
                    </h2>
                  </div>
                </div>
              </div>

              <section className="home-table">
                <div className="table-cover">
                  <div className="t-row">
                    <div className="feature-span">
                      <span>User</span>
                    </div>
                    <div className="grader">
                      <div className="spacer"></div>
                      <div>{withdrawals.user}</div>
                    </div>
                  </div>
                  {/*row ends */}
                  <div className="t-row">
                    <div className="feature-span">
                      <span>Amount</span>
                    </div>
                    <div className="grader">
                      <div className="spacer"></div>
                      <div>
                        <Currency value={withdrawals.amount} />
                      </div>
                    </div>
                  </div>
                  {/*row ends */}
                  <div className="t-row">
                    <div className="feature-span">
                      <span>Request Date</span>
                    </div>
                    <div className="grader">
                      <div className="spacer"></div>
                      <div>
                        <DatePipe value={withdrawals.request_date * 1000} />
                      </div>
                    </div>
                  </div>
                  {/*row ends */}
                  <div className="t-row">
                    <div className="feature-span">
                      <span>Request Status</span>
                    </div>
                    <div className="grader">
                      <div className="spacer"></div>
                      <div>
                        {withdrawals.status === 1 ? (
                          <Approved />
                        ) : withdrawals.status === 0 ? (
                          <Pending />
                        ) : withdrawals.status === -1 ? (
                          <Cancelled />
                        ) : (
                          "Unknown"
                        )}
                      </div>
                    </div>
                  </div>
                  {/*row ends */}
                  {withdrawals.status !== 0 && (
                    <div className="t-row">
                      <div className="feature-span">
                        <span>Processed On</span>
                      </div>
                      <div className="grader">
                        <div className="spacer"></div>
                        <div>
                          <DatePipe value={withdrawals.process_date * 1000} />
                        </div>
                      </div>
                    </div>
                  )}
                  {/*row ends */}
                </div>
              </section>
            </Card>
          </div>
        </section>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>Error Loading withdrawals</div>
      </React.Fragment>
    );
  }
};

export default WithdrawDetails;
