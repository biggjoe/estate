import React from "react";
import { Link, NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AccountBox from "@mui/icons-material/AccountBox";
import { IconButton } from "@mui/material";

const UsersList = (props: any) => {
  console.log(" users list page Renders");
  const { launchNew } = props;
  const [users, setUsers] = React.useState<any[]>([]);
  const [result_loaded, setResultLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  React.useEffect(() => {
    doAjax();
  }, []); //componentDidMount

  const doAjax = () => {
    setLoading(true);
    setResultLoaded(false);
    HttpService.postHeader("users", { offset: 0, limit: 10, mode: "all" }).then(
      (result) => {
        setLoading(false);
        console.log(result);
        if (Array.isArray(result)) {
          setUsers(result);
        } else {
          setUsers([]);
        }
        setResultLoaded(true);
      },
      (error) => {
        setLoading(false);
        setError(error.message);
        setUsers([]);
        setResultLoaded(true);
      }
    ); //fetch
  }; //doAjax

  const launchReferee = (email: any) => {
    alert(email);
  };

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
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <span> All Users</span>
                  </Breadcrumbs>
                  <h2>
                    <i className="fas fa-user-group"></i> All Users
                  </h2>
                </div>
              </div>
            </div>
            <Divider />
            <div className="pxy10 flex flex-row align-items-center">
              <span className="spacer"></span>
              <span>
                <Tooltip title="Create New">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={launchNew}
                  >
                    <Add />
                    <span className="sm-hide-inline"> Add user</span>
                  </Button>
                </Tooltip>
              </span>
            </div>

            <Divider />
            {!loading && (
              <div className="pxy0">
                {users.map((item: any, index: number) => (
                  <ListItem
                    key={item.id}
                    disablePadding
                    divider={true}
                    component={NavLink}
                    to={`/admin/users/p/${item.id}`}
                    secondaryAction={
                      item.has_referee ? (
                        <span className="px10">
                          <Tooltip
                            title={`${item.firstname} has a referee, open profile to view`}
                          >
                            <AccountBox />
                          </Tooltip>
                        </span>
                      ) : (
                        ""
                      )
                    }
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ width: 40, height: 40, mr: "7px" }}
                          alt={`${item.firstname} ${item.surname} `}
                          src={
                            item.avatar
                              ? process.env.REACT_APP_SERVER_FILES_DOMAIN +
                                item.avatar
                              : `/images/logo.png`
                          }
                        />
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <h4>{`${item.firstname} ${item.surname} `}</h4>
                        }
                        secondary={
                          <>
                            Reg. on:
                            <DatePipe value={item.reg_time * 1000} />
                          </>
                        }
                      ></ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
                {result_loaded && users.length === 0 && (
                  <div className="result-error">
                    <span>
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <h3> No user found!</h3>
                  </div>
                )}
              </div>
            )}
            {loading && (
              <>
                <div className="pxy20">
                  <Card className="pxy20">
                    <PlaceHolder type="users" />
                    <Divider />
                    <PlaceHolder type="users" />
                    <Divider />
                    <PlaceHolder type="users" />
                    <Divider />
                    <PlaceHolder type="users" />
                    <Divider />
                    <PlaceHolder type="users" />
                    <Divider />
                    <PlaceHolder type="users" />
                  </Card>
                </div>
              </>
            )}
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default UsersList;
