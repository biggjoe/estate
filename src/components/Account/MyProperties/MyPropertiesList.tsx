import React from "react";
import { Link, NavLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import Add from "@mui/icons-material/Add";
import {
  ApartmentOutlined,
  CheckBox,
  CheckCircleOutline,
  Home,
  Pending,
} from "@mui/icons-material";
import CreateDeal from "../../templates/CreateDeal";

const PropertiesList = (props: any) => {
  console.log(props);
  const { launchNew } = props;
  console.log(" properties page Renders");
  const [properties, setProperties] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [offset, setOffset] = React.useState<number>(0);
  const closeSet = () => {
    setSet({ ...set, onopen: false });
  };
  const [set, setSet] = React.useState<any>({
    onopen: false,
    onclose: closeSet,
  });
  React.useEffect(() => {
    doAjax(offset);
  }, []); //componentDidMount

  const doAjax = (offset: number) => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("properties", {
      offset: offset,
      limit: 20,
      mode: "user-properties",
    })
      .then(
        (result) => {
          console.log(result);
          if (Array.isArray(result)) {
            setProperties(result);
          } else {
            setProperties([]);
          }
        },
        (error) => {
          setProperties([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const [tabIndex, setTabIndex] = React.useState(1);
  const tabChange = React.useCallback(
    (event: any, newValue: any) => {
      console.log(newValue);
      setTabIndex(newValue);
    },
    [tabIndex]
  );

  const tabs: any[] = [
    {
      is_published: 0,
      label: `Unpublished`,
      icon: <Pending />,
    },
    {
      is_published: 1,
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

  const launchNewDeal = () => {
    setSet({ ...set, deals: checked, onopen: true, onclose: closeSet });
    console.log("SET:: ", set);
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
                    <Link to="/account/dashboard">Dashboard</Link>
                    <span> My Properties</span>
                  </Breadcrumbs>
                  <h2>
                    <ApartmentOutlined /> My Properties
                  </h2>
                </div>
              </div>
            </div>
            <Divider />

            <div className="flex pxy10 align-items-center">
              <div className="spacer"></div>
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
            {/*        {checked.length > 0 && (
              <>
                <Divider />
                <div className="py10">
                  <span className="px10">
                    {checked.length} properties selected
                  </span>{" "}
                  <Tooltip title="Create New Deal">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={launchNewDeal}
                    >
                      <Add />
                      <span className="sm-hide-inline"> Create New Deal</span>
                    </Button>
                  </Tooltip>
                </div>
              </>
            )} */}
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
                          disablePadding /*
                          secondaryAction={
                            {
                               <Checkbox
                              edge="start"
                              onClick={handleToggle(item.id)}
                              checked={checked.indexOf(item.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            /> 
                            }
                          }*/
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
                                  <Link
                                    to={`/account/my-properties/p/${item.url}`}
                                  >
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
      {set.onopen && <CreateDeal data={set} />}
    </React.Fragment>
  );
};

export default PropertiesList;
