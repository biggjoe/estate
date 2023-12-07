import React from "react";
import {
  Outlet,
  useLocation,
  useParams,
  NavLink,
  Link,
} from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import Tooltip from "@mui/material/Tooltip";
import Add from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import {
  ApartmentOutlined,
  CheckCircleOutline,
  Home,
  Pending,
} from "@mui/icons-material";

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

const PropertiesList = (props: any) => {
  console.log(props);
  const { launchNew } = props;
  console.log(" properties page Renders");
  let val = props.data;
  const [properties, setProperties] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  let params = useParams();
  const location = useLocation();
  const pageName = location.pathname;
  const [offset, setOffset] = React.useState<number>(0);
  const [isParam, setParam] = React.useState(false);
  const [ticket_modal_open, setNewModalOpen] = React.useState(false);
  const parts = location.pathname.split("/");
  const base = "/" + parts[1] + "/";
  React.useEffect(() => {
    const isParam = params.ticketId ? true : false;
    console.log("IS PARAM::: ", isParam);
    console.log("pageName::: ", pageName);
    setParam(isParam);
    if (
      (!isParam && pageName === "/admin/properties") ||
      (!isParam && pageName === "/admin/properties")
    ) {
      doAjax(offset);
    }
  }, [params]); //componentDidMount

  const doAjax = (offset: number) => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("properties", {
      offset: offset,
      limit: 20,
      mode: "all",
      is_admin: true,
    })
      .then(
        (result) => {
          console.log(result);
          if (Array.isArray(result)) {
            let newRes = [...properties, ...result];
            setProperties(newRes);
          } else {
            setProperties([]);
          }
        },
        (error) => {
          setError(error.message);
          setProperties([]);
        }
      )
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      }); //fetch
  }; //doAjax

  const loadMore = () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    doAjax(newOffset);
  };

  const launchNewModal = () => {
    setNewModalOpen(true);
  };

  const newModalClose = (data: any = false) => {
    setNewModalOpen(false);
    if (data) {
      properties.unshift(data);
    }
  };

  const [tabIndex, setTabIndex] = React.useState(1);
  const tabChange = React.useCallback(
    (event: any, newValue: any) => {
      console.log(newValue);
      setTabIndex(newValue);
    },
    [tabIndex]
  );

  const { published, unpublished } = { published: [], unpublished: [] };

  const tabs: any[] = [
    {
      is_published: 1,
      label: `Unpublished`,
      icon: <Pending />,
    },
    {
      is_published: 0,
      label: `Published`,
      icon: <CheckCircleOutline />,
    },
  ];

  const [checked, setChecked] = React.useState<any[]>([]);

  const handleToggle = (value: any) => () => {
    console.log(value);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <React.Fragment>
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
                    <span> All Properties</span>
                  </Breadcrumbs>
                  <h2>
                    <ApartmentOutlined /> All Properties
                  </h2>
                </div>
              </div>
            </div>
            <Divider />

            <div className="flex pxy10 align-items-center">
              <span className="spacer"></span>
              <span className="">
                <Tooltip title="Create New">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={launchNew}
                  >
                    <Add />
                    <span className="sm-hide-inline"> Add New</span>
                  </Button>
                </Tooltip>
              </span>
            </div>
            <Divider />
            <div className="pxy0">
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

              <List
                sx={{
                  p: "0",
                  m: "0",
                  // selected and (selected + hover) states
                  "&& .Mui-selected, && .Mui-selected:hover": {
                    bgcolor: "#ddd",
                    "&, & .MuiListItemIcon-root": {
                      color: "#000",
                    },
                  },
                  // hover states
                  "& .MuiListItemButton-root a:hover": {
                    "&, & .MuiListItemIcon-root": {
                      color: "#b7080d",
                      textTransform: "underline",
                    },
                  },
                  // a states
                  "& .MuiListItemButton-root a": {
                    color: "#444",
                    "&, & .MuiListItemIcon-root": {
                      color: "#444",
                    },
                  },
                }}
              >
                {properties.map((item: any, index: number) => {
                  const labelId = `checkbox-list-label-${item.id}`;
                  return (
                    <div key={item.id}>
                      {item.is_published === tabIndex && (
                        <ListItem
                          divider
                          disablePadding
                          /*  secondaryAction={
                            <Checkbox
                              edge="start"
                              onClick={handleToggle(item.id)}
                              checked={checked.indexOf(item.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          } */
                        >
                          <ListItemButton
                            role={undefined} /* 
                            onClick={handleToggle(item.id)} */
                            dense
                            selected={checked.indexOf(item.id) !== -1}
                          >
                            <ListItemAvatar>
                              <Avatar
                                variant="square"
                                sx={{
                                  height: "50px",
                                  width: "50px",
                                  borderRadius: "4px",
                                  mr: "5px",
                                }}
                                alt={`Avatar n°${item.id + 1}`}
                                src={
                                  item.thumb
                                    ? process.env
                                        .REACT_APP_SERVER_FILES_DOMAIN +
                                      item.thumb
                                    : "{`/images/logo.png`}"
                                }
                              />
                            </ListItemAvatar>

                            <ListItemText
                              id={labelId}
                              primary={
                                <h3>
                                  <Link to={`/admin/properties/p/${item.url}`}>
                                    {item.title}
                                  </Link>
                                </h3>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      )}
                    </div>
                  );
                })}
              </List>
              {loaded && properties.length === 0 && (
                <div className="result-error">
                  <span>
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h3> No Properties found!</h3>
                </div>
              )}
              {loading && (
                <div className="pxy10">
                  <Card sx={{ m: "0", p: "0" }}>
                    <PlaceHolder type="list" />
                    <Divider />
                    <PlaceHolder type="list" />
                    <Divider />
                    <PlaceHolder type="list" />
                    <Divider />
                    <PlaceHolder type="list" />
                    <Divider />
                    <PlaceHolder type="list" />
                    <Divider />
                    <PlaceHolder type="list" />
                  </Card>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default PropertiesList;
