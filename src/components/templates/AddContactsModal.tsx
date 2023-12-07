import React from "react";
import {
  Slide,
  Typography,
  IconButton,
  Toolbar,
  Tooltip,
  AppBar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  DialogContent,
  ListItemIcon,
  Dialog,
  Box,
  Tab,
  Tabs,
  Button,
  DialogActions,
  Card,
} from "@mui/material";
import {
  Add,
  Save,
  Close,
  Edit,
  DeleteOutline,
  VerifiedUserOutlined,
  AttachFileOutlined,
  ImportContactsOutlined,
  EditOutlined,
} from "@mui/icons-material";
import HttpService from "../../services/HttpService";
import CustomModal from "./CustomModal";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
          <section>{children}</section>
        </Box>
      )}
    </div>
  );
};

const AddContactsModal = (props: any) => {
  const val = props.data;
  const [value, setValue] = React.useState(0);
  const [form, setForm] = React.useState<any>({
    title: "",
    added_contacts: [],
    action: "create-contact",
  });
  const modalClose = () => {
    setModal({ onopen: false, onclose: modalClose });
  };
  const [modal_data, setModal] = React.useState<any>({
    onopen: false,
    onclose: modalClose,
  });
  const [added_contacts, setAddedContacts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [pasted, setPasted] = React.useState(false);
  const [response, setResponse] = React.useState({});
  const [error, setError] = React.useState("");
  console.log("Add Contact renders");
  const handleTabChange = React.useCallback(
    (event: any, newValue: any) => {
      console.log(newValue);
      setValue(newValue);
      setTabIndex(newValue);
    },
    [tabIndex, value]
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    setLoading(true);
    setLoaded(true);
    console.log(modal_data);

    HttpService.postHeader("referral/contacts/create", form)
      .then(
        (result) => {
          console.log(result);
          setResponse(result);
          setModal({ ...modal_data, message: result.message, onopen: true });
          if (result.status === 1) {
            modalClose();
          }
        },
        (error) => {
          setError(error.message);
          setModal({ ...modal_data, message: error.message, onopen: true });
        }
      )
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      }); //postInvite
  };

  const tabs: any[] = [
    {
      index: 0,
      label: "Enter manually",
      mode: "manual",
      icon: <EditOutlined />,
    },
    {
      index: 1,
      label: " Import From File",
      mode: "import-file",
      icon: <AttachFileOutlined />,
    },
    {
      index: 2,
      label: " Import Contacts",
      mode: "import-contacts",
      icon: <ImportContactsOutlined />,
    },
  ];

  const handleItemChange = React.useCallback(
    (e: any, index: number = 0) => {
      console.log(e, index);
      console.log(e.target.name, e.target.value);
      const copy = { ...form };
      let namex = e.target.name;
      let valex = e.target.value;
      if (index !== 0) {
        copy.added_contacts[index][namex] = valex;
        setAddedContacts({ ...copy });
      } else {
        copy[namex] = valex;
        setForm(copy);
      }
      console.log(form);
    },
    [form, added_contacts]
  );

  const toggleEditContact = (index: number) => {
    const copy = { ...form };
    const contx = form.added_contacts;
    console.log(contx[index]);
    contx[index].is_edit = !contx[index].is_edit;
    console.log(contx[index]);
    setAddedContacts({ ...copy });
    return;
  };

  const spliceList = (index: number) => {
    const copy = { ...form };
    const contx = copy.added_contacts;
    if (index > -1) {
      contx.splice(index, 1);
    }
    setAddedContacts(copy);
  };

  const pushRow = () => {
    const obj: any = { name: "No name", number: "(+000)-000-000-0000" };
    const copy = { ...form };
    copy.added_contacts.push(obj);
    setAddedContacts({ ...copy });
  };

  const handleFormChange = (e: any) => {
    console.log(e);
    setForm({ [e.target.name]: e.target, value });
  };
  return (
    <>
      <Dialog
        fullScreen={true}
        TransitionComponent={Transition}
        open={val.onopen}
        onClose={val.onclose}
        scroll={"paper"}
        aria-labelledby={"Me"}
      >
        {/*    <DialogTitle id={val.id}>{val.title}</DialogTitle> */}
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={val.onclose}
              aria-label="close"
            >
              <Add />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {val.title}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={val.onclose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Divider />
        <DialogContent sx={{ padding: "0px" }}>
          <Box
            sx={{
              padding: "20px",
              maxWidth: { xs: "100%", sm: "100%" },
              bgcolor: "background.paper",
            }}
          >
            <section className="pxy20">
              <div className="input">
                <label>Contact Title</label>
                <input
                  className="form-control"
                  placeholder="Enter contact title"
                  onChange={handleItemChange}
                  name="title"
                />
              </div>
              {form.title === "" ? (
                ""
              ) : (
                <>
                  <Card sx={{ p: "0", m: "0" }}>
                    <>
                      <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
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

                      <div className="flex flex-row justify-content-center align-items-center px20 py10">
                        <h4 className="py0 my0">{tabs[tabIndex].label}</h4>

                        <span></span>
                        <div className="spacer text-right">
                          {tabIndex === 0 ? (
                            <>
                              <Button variant="contained" onClick={pushRow}>
                                ADD ROW
                              </Button>
                            </>
                          ) : tabIndex === 1 ? (
                            <>
                              <Button onClick={pushRow}>BROWSE FILE</Button>
                            </>
                          ) : tabIndex === 2 ? (
                            <>
                              <Button onClick={pushRow}>
                                LAUNCH PHONE BOOK
                              </Button>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <Divider />

                      <List sx={{ p: "0", m: "0" }}>
                        {form.added_contacts.map((item: any, index: number) => (
                          <ListItem
                            disablePadding
                            button
                            sx={{ textDecoration: "" }}
                            key={index}
                            divider={
                              index === form.added_contacts.length - 1
                                ? false
                                : true
                            }
                            secondaryAction={
                              <>
                                <span>
                                  <>
                                    {item.is_edit ? (
                                      <>
                                        <Tooltip title="Save Contact">
                                          <Save
                                            onClick={() =>
                                              toggleEditContact(index)
                                            }
                                            sx={{ marginRight: "5px" }}
                                          />
                                        </Tooltip>
                                      </>
                                    ) : (
                                      <Tooltip title="Modify Contact">
                                        <Edit
                                          onClick={() =>
                                            toggleEditContact(index)
                                          }
                                          sx={{ marginRight: "5px" }}
                                        />
                                      </Tooltip>
                                    )}
                                  </>
                                  <Tooltip title="Delete Contact">
                                    <DeleteOutline
                                      onClick={() => spliceList(index)}
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
                    </>
                  </Card>{" "}
                </>
              )}
            </section>
          </Box>
        </DialogContent>
        {form.added_contacts.length === 0 ? (
          ""
        ) : (
          <>
            <Divider />
            <DialogActions
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alingItems: "center",
              }}
            >
              <Button onClick={val.onclose} color="warning">
                Exit
              </Button>
              <span className="spacer"></span>
              <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                Save Contact
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <CustomModal data={modal_data} />
    </>
  );
};

export default React.memo(AddContactsModal);
