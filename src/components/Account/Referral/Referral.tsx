import React, { useCallback } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  Divider,
  Tooltip,
  ListItemText,
  ListItem,
  ListItemIcon,
  ListItemButton,
  List,
  Tab,
  Tabs,
  Typography,
  IconButton,
  Card,
  Button,
  Avatar,
  Breadcrumbs,
  Box,
} from "@mui/material";

import {
  Add,
  ContactsOutlined,
  VerifiedUserOutlined,
  DeleteOutline,
  Edit,
  Home,
  MessageOutlined,
  Done,
  DoneAll,
  AccountBox,
} from "@mui/icons-material";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import PlaceHolder from "../../templates/PlaceHolder";
import AuthService from "../../../services/AuthService";
import CopyText from "../../../services/CopyText";
import CustomToast from "../../templates/CustomToast";
import UserModal from "../../templates/UserModal";
import EditContactsModal from "../../templates/EditContactsModal";
import AddContactsModal from "../../templates/AddContactsModal";
import InviteModal from "../../templates/InviteModal";
import Currency from "../../../pipes/Currency";
import WithdrawFund from "../../templates/WithdrawFund";

const Referral = (props: any) => {
  const [downlines, setDownlines] = React.useState<any[]>([]);
  const [invitations, setInvitations] = React.useState<any[]>([]);
  const [contacts, setContacts] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [invite_modal_open, setInviteModalOpen] = React.useState(false);
  const [add_contacts_modal_open, setAddContactsModalOpen] =
    React.useState(false);
  const [user_modal_open, setUserModalOpen] = React.useState(false);
  const [selected_user, setSelectedUser] = React.useState<any>({});
  const closeToast = () => {
    setToast({ onopen: false });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: closeToast,
  });
  let params = useParams();
  const location = useLocation();
  const pageName = location.pathname;
  let usr = AuthService.getCurrentUser();

  React.useEffect(() => {
    doAjax();
  }, []); //componentDidMount

  const doAjax = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("referral", {
      mode: "alldetails",
    })
      .then(
        (result) => {
          console.log(result);
          console.log("Type os Result::", typeof result);
          if (typeof result === "object") {
            setDownlines(result.downlines.data);
          } else {
            setDownlines([]);
          }
        },
        (error) => {
          setError(error.message);
        }
      )
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      }); //fetch
  }; //doAjax

  const launchModal = React.useCallback(
    (type: string) => {
      return type === "invite"
        ? setInviteModalOpen(true)
        : type === "add-contact"
        ? setAddContactsModalOpen(true)
        : null;
    },
    [invite_modal_open, add_contacts_modal_open]
  );

  const launchUser = React.useCallback(
    (user: any) => {
      user.name = user.firstname + " " + user.surname;
      setSelectedUser({ ...selected_user, ...user });
      setUserModalOpen(true);
    },
    [selected_user, user_modal_open]
  );

  const userModalClose = () => {
    setUserModalOpen(false);
  };

  const inviteModalClose = () => {
    setInviteModalOpen(false);
  };

  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py10">
          <Card className="px0 py0">
            <div className="page-head bg-grax">
              <div className="px20 pt20">
                <Breadcrumbs
                  aria-label="breadcrumb"
                  sx={{
                    width: "100%",
                  }}
                >
                  <Link to="/account/dashboard">Dashboard</Link>
                  <span>Referral</span>
                </Breadcrumbs>
                <div className="flex flex-row-resp align-items-center py20">
                  <div className="inline-block">
                    <h2>Referral</h2>
                  </div>
                  <span className="spacer"></span>
                  <div className="text-right">
                    <div>Referral Link</div>
                    <CopyText
                      text={
                        process.env.REACT_APP_SERVER_DOMAIN +
                        "r/" +
                        usr.username
                      }
                    />
                  </div>
                </div>
              </div>

              <Divider />

              <div className="flex flex-row-resp align-items-center pxy20">
                <div className="spacer">
                  Referee
                  {usr.referee === 0 ? (
                    <h3>No Referee</h3>
                  ) : (
                    <h3>{`${usr.referee_details.firstname}
                   ${usr.referee_details.surname}`}</h3>
                  )}
                </div>
                <div className="text-right">
                  Wallet Balance
                  <h3>
                    <Currency value={usr.balance} />
                  </h3>
                  {usr.can_widthdraw && <WithdrawFund user={usr.email} />}
                </div>
              </div>
            </div>
            {!loading && (
              <section style={{ padding: "0px" }}>
                <div className="pxy10">
                  <h3>
                    <i className="fas fa-users"></i> Downlines
                  </h3>
                </div>
                <Divider />
                <List sx={{ p: "0", m: "0" }}>
                  {downlines.map((item: any, index: number) => (
                    <ListItem
                      disablePadding
                      sx={{ textDecoration: "" }}
                      key={item.id}
                      divider={index === downlines.length - 1 ? false : true}
                      onClick={() => launchUser(item)}
                      secondaryAction={
                        <div className="px20">
                          {item.is_verified ? (
                            <Tooltip title="User is verified">
                              <i className="fas fa-check-double"></i>
                            </Tooltip>
                          ) : (
                            <Tooltip title="User is not yet verified">
                              <i className="fas fa-hourglass"></i>
                            </Tooltip>
                          )}
                        </div>
                      }
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <AccountBox />
                        </ListItemIcon>
                        <ListItemText>
                          <h3>{item.firstname + " " + item.surname}</h3>
                          <div className="date-span">
                            Registered on:
                            <span className="bolder">
                              <DatePipe value={item.reg_time} />
                            </span>
                          </div>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}

                  {loading && (
                    <Card className="pxy20">
                      <PlaceHolder type="list" />
                      <Divider />
                      <PlaceHolder type="list" />
                    </Card>
                  )}
                </List>
                {loaded && downlines.length === 0 && (
                  <div className="result-error">
                    <span>
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <h3> No Downline found!</h3>
                  </div>
                )}
              </section>
            )}
          </Card>
        </div>
      </section>

      {loaded && (
        <UserModal
          data={{
            maxwidth: "100%",
            title: selected_user.name,
            onopen: user_modal_open,
            onclose: userModalClose,
            user: selected_user,
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Referral;
