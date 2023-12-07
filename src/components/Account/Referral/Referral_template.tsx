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

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: "0" }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

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
            setLists({
              invitations: result.invitations.data,
              downlines: result.downlines.data,
              contacts: result.contacts.data,
            });
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

  const setLists = useCallback(
    (data: any) => {
      setDownlines(data.downlines);
      setInvitations(data.invitations);
      setContacts(data.contacts);
    },
    [downlines, contacts, invitations]
  );

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

  const AddContactsModalClose = () => {
    setAddContactsModalOpen(false);
  };

  const [tabIndex, setTabIndex] = React.useState(0);
  const tabChange = React.useCallback(
    (event: any, newValue: any) => {
      console.log(newValue);
      setTabIndex(newValue);
    },
    [tabIndex]
  );
  const tabs: any[] = [
    { label: `Downlines [${downlines.length}]`, icon: <Home /> },
    { label: `Invitation [${invitations.length}]`, icon: <MessageOutlined /> },
    {
      label: `Contacts [${contacts.length}]`,
      icon: <i className="fas fa-address-book"></i>,
    },
  ];

  const toggleEditContact = React.useCallback(
    (index: number) => {
      const copy = [...contacts];
      console.log(copy[index]);
      copy[index].is_edit = !copy[index].is_edit;
      console.log(copy[index]);
      setContacts([...copy]);
      return;
    },
    [contacts]
  );

  const closeEditContactModal = () => {
    setEditContacts({ ...contacts_edit_data, onopen: false });
  };
  const [contacts_edit_data, setEditContacts] = React.useState<any>({
    onpen: false,
    data: {},
    onclose: closeEditContactModal,
  });
  const lauchEditContact = React.useCallback(
    (item: any) => {
      setEditContacts({
        ...contacts_edit_data,
        onopen: true,
        data: { ...item, name: item.title, added_contacts: item.contacts },
      });
    },
    [contacts_edit_data]
  );

  const doMod = (mode: string, item: any, index: number) => {
    const act: string =
      mode === "delete"
        ? "delete-contact"
        : mode === "edit"
        ? "edit-contact"
        : "-";

    const obj: any = {
      action: act,
    };

    const data: any = { ...obj, ...item };
    console.log(item, data);
    HttpService.postHeader("referral", data)
      .then(
        (resp) => {
          console.log(resp);
          if (resp.status === 1) {
            setToast({ onopen: true, message: resp.message });
            if (mode === "edit") {
              toggleEditContact(index);
            } else if (mode === "delete") {
              spliceList(index);
            }
            setTimeout(() => {
              setToast({ onopen: false });
            }, 3000);
          }
        },
        (error) => {
          console.log(error);
          setToast({ onopen: true, message: error.message });
          if (mode === "edit") {
            toggleEditContact(index);
          }
          setTimeout(() => {
            setToast({ onopen: false });
          }, 3000);
        }
      )
      .finally(() => {});
  };

  const deleteContact = (item: any, index: number) => {
    doMod("delete", item, index);
  };

  const deleteInvitation = (item: any, index: number) => {
    doMod("delete", item, index);
  };

  const saveContactEdit = (item: any, index: number) => {
    doMod("edit", item, index);
  };
  const handleItemChange = React.useCallback(
    (e: any, index: number) => {
      ///setContacts(e.target.value);
      const copy = [...contacts];
      console.log(copy[index]);
      copy[index][e.target.name] = e.target.value;
      console.log(copy[index]);
      setContacts([...copy]);
    },
    [contacts]
  );

  const spliceList = React.useCallback(
    (index: number) => {
      if (index > -1) {
        contacts.splice(index, 1);
      }
    },
    [contacts]
  );
  return (
    <>
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
                  <h3>{`${usr.referee.firstname} ${usr.referee.surname}`}</h3>
                </div>
                <div className="text-right">
                  Wallet Balance
                  <h3>
                    <Currency value={usr.balance} />
                  </h3>
                  {usr.can_widthdraw && (
                    <Button size="small" variant="contained" color="primary">
                      Widthdraw
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {!loading && (
              <>
                <div className="py0">
                  <Tabs
                    value={tabIndex}
                    onChange={tabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                    aria-label="scrollable auto tabs example"
                  >
                    {tabs.map((itm: any, ind: number) => (
                      <Tab
                        key={ind}
                        icon={itm.icon}
                        iconPosition="start"
                        label={itm.label}
                      />
                    ))}
                  </Tabs>
                  {tabs.map((item: any, index: number) => (
                    <TabPanel
                      component="section"
                      sx={{ lineHeight: "1.1", p: "0" }}
                      value={tabIndex}
                      index={index}
                      key={index}
                    >
                      <section style={{ padding: "0px" }}>
                        {tabIndex === 0 && (
                          <>
                            <Divider />
                            <List sx={{ p: "0", m: "0" }}>
                              {downlines.map((item: any, index: number) => (
                                <ListItem
                                  disablePadding
                                  button
                                  sx={{ textDecoration: "" }}
                                  key={item.id}
                                  divider={
                                    index === downlines.length - 1
                                      ? false
                                      : true
                                  }
                                  onClick={() => launchUser(item)}
                                  secondaryAction={
                                    <>
                                      <span>
                                        <DatePipe value={item.reg_time} />
                                      </span>
                                    </>
                                  }
                                >
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <VerifiedUserOutlined />
                                    </ListItemIcon>
                                    <ListItemText>
                                      <Typography component={"h2"}>
                                        {item.firstname + " " + item.surname}
                                      </Typography>{" "}
                                    </ListItemText>
                                  </ListItemButton>
                                </ListItem>
                              ))}
                            </List>
                            {loaded && downlines.length === 0 && (
                              <div className="result-error">
                                <span>
                                  <i className="fas fa-exclamation-triangle"></i>
                                </span>
                                <h3> No Downline found!</h3>
                              </div>
                            )}
                          </>
                        )}
                        {/*tabIndex===0 */}
                        {tabIndex === 1 && (
                          <>
                            <div
                              className="page-top-intro flex px20 py10 align-items-center 
      justify-content-center"
                            >
                              <div className="px10">
                                <h3 className="py0 my0 px0 mx0">
                                  <i className="fas fa-users"></i> Invite
                                </h3>
                              </div>
                              <div className="spacer"></div>
                              <div>
                                <Tooltip title="Invite new referrals">
                                  <IconButton
                                    onClick={() => launchModal("invite")}
                                  >
                                    <Add />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </div>
                            <Divider />
                            <List
                              sx={{ paddingTop: "0px", paddingBotom: "0px" }}
                            >
                              {invitations.map((item: any, index: number) => (
                                <ListItem
                                  disablePadding
                                  button
                                  sx={{ textDecoration: "" }}
                                  key={index}
                                  divider={true}
                                  secondaryAction={
                                    <>
                                      <span>
                                        {item.status === 1 ? (
                                          <Tooltip title="Approved and sent">
                                            <DoneAll color="primary" />
                                          </Tooltip>
                                        ) : item.status === 0 ? (
                                          <Tooltip title="Waiting approval">
                                            <Done />
                                          </Tooltip>
                                        ) : (
                                          ""
                                        )}
                                      </span>
                                    </>
                                  }
                                >
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <VerifiedUserOutlined />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={item.receipients}
                                      secondary={item.message}
                                    ></ListItemText>
                                  </ListItemButton>
                                </ListItem>
                              ))}
                            </List>

                            {loaded && invitations.length === 0 && (
                              <div className="result-error">
                                <span>
                                  <i className="fas fa-exclamation-triangle"></i>
                                </span>
                                <h3> No Invitations found!</h3>
                              </div>
                            )}
                          </>
                        )}
                        {/*tabIndex===1 */}

                        {tabIndex === 2 && (
                          <>
                            <div
                              className="page-top-intro flex px20 py10 align-items-center 
      justify-content-center"
                            >
                              <div className="px10">
                                <h3 className="py0 my0 px0 mx0">
                                  <i className="fas fa-address-book"></i>{" "}
                                  Contacts
                                </h3>
                              </div>
                              <div className="spacer"></div>
                              <div>
                                <Tooltip title="Invite new referrals">
                                  <IconButton
                                    onClick={() => launchModal("add-contact")}
                                  >
                                    <Add />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </div>
                            <Divider />
                            <List
                              sx={{ paddingTop: "0px", paddingBotom: "0px" }}
                            >
                              {contacts.map((item: any, index: number) => (
                                <ListItem
                                  disablePadding
                                  button
                                  sx={{ textDecoration: "" }}
                                  key={index}
                                  divider={true}
                                  secondaryAction={
                                    <>
                                      <span>
                                        <>
                                          <Tooltip title="Modify Contact">
                                            <Edit
                                              onClick={() =>
                                                lauchEditContact(item)
                                              }
                                              sx={{ marginRight: "5px" }}
                                            />
                                          </Tooltip>
                                        </>
                                        <Tooltip title="Delete Contact">
                                          <DeleteOutline
                                            onClick={() =>
                                              deleteContact(item, index)
                                            }
                                          />
                                        </Tooltip>
                                      </span>
                                    </>
                                  }
                                >
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <VerifiedUserOutlined />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        item.is_edit ? (
                                          <>
                                            <input
                                              name="number"
                                              className="form-sm"
                                              type="text"
                                              onChange={(e) =>
                                                handleItemChange(e, index)
                                              }
                                              value={item.number}
                                            />
                                          </>
                                        ) : (
                                          item.number
                                        )
                                      }
                                      secondary={
                                        item.is_edit ? (
                                          <>
                                            <input
                                              name="name"
                                              className="form-sm"
                                              onChange={(e) =>
                                                handleItemChange(e, index)
                                              }
                                              type="text"
                                              value={item.name}
                                            />
                                          </>
                                        ) : (
                                          item.name
                                        )
                                      }
                                    ></ListItemText>
                                  </ListItemButton>
                                </ListItem>
                              ))}
                            </List>

                            {loaded && contacts.length === 0 && (
                              <div className="result-error">
                                <span>
                                  <i className="fas fa-exclamation-triangle"></i>
                                </span>
                                <h3> No Contacts found!</h3>
                              </div>
                            )}
                          </>
                        )}
                      </section>
                    </TabPanel>
                  ))}
                </div>
              </>
            )}

            {loaded && (
              <>
                <UserModal
                  data={{
                    maxwidth: "100%",
                    title: selected_user.name,
                    onopen: user_modal_open,
                    onclose: userModalClose,
                    user: selected_user,
                  }}
                />
                <InviteModal
                  data={{
                    maxwidth: "100%",
                    title: "Referral Invitation",
                    onopen: invite_modal_open,
                    username: usr.username,
                    onclose: inviteModalClose,
                  }}
                />
                <AddContactsModal
                  data={{
                    maxwidth: "100%",
                    title: "Add New Contacts",
                    onopen: add_contacts_modal_open,
                    username: usr.username,
                    onclose: AddContactsModalClose,
                  }}
                />
                <EditContactsModal data={contacts_edit_data} />
                <CustomToast
                  data={{
                    onclose: closeToast,
                    onopen: toast.onopen,
                    message: toast.message,
                  }}
                />
              </>
            )}
            {loading && (
              <>
                <div className="pxy20">
                  <Card className="pxy20">
                    <PlaceHolder type="list" />
                    <Divider />
                    <PlaceHolder type="list" />
                  </Card>
                </div>
              </>
            )}
          </Card>
        </div>
      </section>
    </>
  );
};

export default Referral;
