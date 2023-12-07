import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import PublishOutlined from "@mui/icons-material/PublishOutlined";
import Edit from "@mui/icons-material/Edit";
import PlaceHolder from "../../templates/PlaceHolder";
import * as processHtml from "../../../services/processHtml";
import DatePipe from "../../../pipes/DatePipe";
import ConfirmModal from "../../templates/ConfirmModal";
import { VerifiedUserOutlined } from "@mui/icons-material";

export default function UsersDetails(props: any) {
  let navigate = useNavigate();
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [users, setUsers] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState<any>(false);
  const [publish_mode, setPublish] = React.useState("publish");
  React.useEffect(() => {
    console.log("::params::", params);
    const isParam = params.userId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchusers(params.userId);
    }
  }, [params]);

  const fetchusers = (id: string) => {
    console.log(id);
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("users", { id: id, mode: "details" })
      .then(
        (result) => {
          setLoading(false);
          console.log("::|", result);
          if (result) {
            setUsers(result);
            const pub_mode = result.is_verified === 1 ? "unverify" : "verify";
            setPublish(pub_mode);
          } else {
            const now = new Date().getTime() / 1000;
            setUsers({
              title: "users does not exist",
              content: `The user you are looking for does not exist. 
             You might have typed a wrong users id in the address bar.`,
              create_date: now,
              related_articles: [],
            });
          }
        },
        (error) => {
          setUsers({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  const launchEdit = (id: any) => {
    return navigate(`/admin/users/e/${id}`);
  };
  const doPublish = (data: any) => {
    setLoading(true);
    setLoaded(false);
    setConfirm({
      ...confirm,
      onopen: true,
      id: data.id,
      title: `${data.action} user`,
      loading_text: `${data.action}ing...`,
    });
    HttpService.postFormHeader("users", { id: data.id, mode: data.action })
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
      title: data.action + " user",
      loading_text: `Are you sure you want to ${data.action} this user?`,
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
            <Tooltip title="Edit programs">
              <Button
                size="small"
                color="primary"
                onClick={() => launchEdit(users.id)}
              >
                <Edit /> Edit
              </Button>
            </Tooltip>

            <Tooltip title={`${publish_mode} user`}>
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  launchAction({ id: users.id, action: publish_mode })
                }
              >
                {users.is_verified === 1 ? (
                  <i className="fas fa-ban mr5"></i>
                ) : (
                  <VerifiedUserOutlined />
                )}
                {publish_mode}
              </Button>
            </Tooltip>

            <Tooltip title={`delete user`}>
              <Button
                size="small"
                color="primary"
                onClick={() => launchAction({ id: users.id, action: "delete" })}
              >
                <DeleteForeverOutlined /> Delete
              </Button>
            </Tooltip>
          </ButtonGroup>
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
                    <Link to="/admin/users">All Users</Link>
                  </Breadcrumbs>
                  <h2 className="mt20">
                    <i className="fas fa-user"></i>{" "}
                    {users.firstname + " " + users.surname}
                  </h2>
                </div>
              </div>
            </div>
            <Divider />

            <section className="home-table">
              <div className="table-cover">
                <div className="t-row">
                  <div className="feature-span">
                    <h3>Personal Details</h3>
                  </div>
                </div>

                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <span>Name</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.firstname + " " + users.surname}</div>
                  </div>
                </div>
                {/*row ends */}
                <div className="t-row">
                  <div className="feature-span">
                    <span>Username</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.username}</div>
                  </div>
                </div>
                {/*row ends */}
                <div className="t-row">
                  <div className="feature-span">
                    <span>Email</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.email}</div>
                  </div>
                </div>
                {/*row ends */}
                <div className="t-row">
                  <div className="feature-span">
                    <span>Phone</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.phone}</div>
                  </div>
                </div>
                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <span>Gender</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.gender}</div>
                  </div>
                </div>
                {/*row ends */}
                <div className="t-row">
                  <div className="feature-span">
                    <span>Marital Status</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.marital_status}</div>
                  </div>
                </div>
                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <h3>Next-of-Kin Details</h3>
                  </div>
                </div>

                <div className="t-row">
                  <div className="feature-span">
                    <span>Next-of-Kin Name</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.nok_firstname + " " + users.nok_surname}</div>
                  </div>
                </div>
                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <span>Next-of-Kin Email</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.nok_email}</div>
                  </div>
                </div>
                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <span>Next-of-Kin Phone</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.nok_phone}</div>
                  </div>
                </div>
                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <span>Next-of-Kin Relationship</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.nok_relationship}</div>
                  </div>
                </div>
                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <h3>Bank Details</h3>
                  </div>
                </div>

                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <span>Bank</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.bank_name}</div>
                  </div>
                </div>

                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <span>Account Name</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.account_name}</div>
                  </div>
                </div>

                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <span>Account No:</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.account_number}</div>
                  </div>
                </div>

                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <span>Account Type</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{users.account_type}</div>
                  </div>
                </div>

                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <h3>Account Info</h3>
                  </div>
                </div>

                {/*row ends */}
                <div className="t-row">
                  <div className="feature-span">
                    <span>Verification Status</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>
                      {users.is_verified === 1 ? "Verified" : "Not verified"}
                    </div>
                  </div>
                </div>
                {/*row ends */}

                <div className="t-row">
                  <div className="feature-span">
                    <span>Last Seen</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>
                      <DatePipe value={users.last_seen * 1000} />
                    </div>
                  </div>
                </div>
                {/*row ends */}
                <div className="t-row">
                  <div className="feature-span">
                    <span>Registerd</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>
                      <DatePipe value={users.reg_time * 1000} />
                    </div>
                  </div>
                </div>
                {/*row ends */}
                {users.has_referee && (
                  <>
                    <div className="t-row">
                      <div className="feature-span">
                        <h3>Referee Info</h3>
                      </div>
                    </div>

                    {/*row ends */}
                    <div className="t-row">
                      <div className="feature-span">
                        <span>Referee Name</span>
                      </div>
                      <div className="grader">
                        <div className="spacer"></div>
                        <div>
                          {users.referee_details.firstname +
                            " " +
                            users.referee_details.surname}
                        </div>
                      </div>
                    </div>
                    {/*row ends */}
                    <div className="t-row">
                      <div className="feature-span">
                        <span>Referee Email</span>
                      </div>
                      <div className="grader">
                        <div className="spacer"></div>
                        <div>{users.referee_details.email}</div>
                      </div>
                    </div>
                    {/*row ends */}
                    <div className="t-row">
                      <div className="feature-span">
                        <span>Referee Phone</span>
                      </div>
                      <div className="grader">
                        <div className="spacer"></div>
                        <div>{users.referee_details.phone}</div>
                      </div>
                    </div>
                    {/*row ends */}
                  </>
                )}
              </div>
            </section>
          </Card>
        </div>
      </section>

      <ConfirmModal data={confirm} />
    </React.Fragment>
  );
}
