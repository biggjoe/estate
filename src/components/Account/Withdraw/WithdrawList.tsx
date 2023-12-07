import React from "react";
import { Link, useLocation, useParams, NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import Tooltip from "@mui/material/Tooltip";
import Add from "@mui/icons-material/Add";
import {
  CheckCircleOutline,
  CreditCard,
  DoneAllOutlined,
  DoneOutlineOutlined,
  Home,
  HomeMaxOutlined,
  HourglassDisabledOutlined,
  HourglassEmptyOutlined,
  HourglassEmptyTwoTone,
  Pending,
} from "@mui/icons-material";
import { ListItemIcon } from "@mui/material";
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

const WithdrawList = () => {
  console.log(" withdrawals page Renders");

  const [withdrawals, setWithdrawal] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [offset, setOffset] = React.useState<number>(0);

  React.useEffect(() => {
    doAjax(offset);
  }, []); //componentDidMount

  const doAjax = (offset: number) => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("general", {
      offset: offset,
      limit: 200,
      mode: "user-widthdraw-requests",
    })
      .then(
        (result) => {
          console.log(result);
          if (Array.isArray(result)) {
            setWithdrawal(result);
          } else {
            setWithdrawal([]);
          }
          setLoaded(true);
        },
        (error) => {}
      )
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      }); //fetch
  }; //doAjax

  const tabs: any[] = [
    {
      is_approved: 1,
      label: `Unapproved`,
      icon: <Pending />,
    },
    {
      is_approved: 0,
      label: `Approved`,
      icon: <CheckCircleOutline />,
    },
  ];

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
                    <span> Withdrawal Requests</span>
                  </Breadcrumbs>
                  <h2>
                    <i className="fas fa-credit-card"></i> Withdrawal Requests
                  </h2>
                </div>
              </div>
            </div>
            <Divider />

            {withdrawals.length > 0 && (
              <div className="pxy10">
                <List
                  sx={{
                    p: "0",
                    m: "0",
                    // selected and (selected + hover) states
                    "&& .Mui-selected, && .Mui-selected:hover": {
                      bgcolor: "red",
                      "&, & .MuiListItemIcon-root": {
                        color: "pink",
                      },
                    },
                    // hover states
                    "& .MuiListItemButton-root:hover": {
                      bgcolor: "#b7080d",
                      "&, & .MuiListItemIcon-root": {
                        color: "white",
                      },
                    },
                  }}
                >
                  {withdrawals.map((item: any, index: number) => (
                    <div key={item.id}>
                      <ListItem
                        disablePadding
                        divider={true}
                        component={NavLink}
                        to={`/account/withdrawals/e/${item.id}`}
                        secondaryAction={
                          item.status === 1 ? (
                            <DoneAllOutlined color="success" />
                          ) : (
                            <HourglassEmptyTwoTone />
                          )
                        }
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <CreditCard />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <h4>
                                Request to widthraw:
                                <Currency value={item.amount} />
                              </h4>
                            }
                            secondary={
                              <span className="date-spanx">
                                Reuesteded By: <strong>{item.user}</strong>,
                                Request Date:
                                <strong>
                                  <DatePipe value={item.request_date * 1000} />
                                </strong>
                              </span>
                            }
                          ></ListItemText>
                        </ListItemButton>
                      </ListItem>
                    </div>
                  ))}
                </List>
              </div>
            )}
            {loaded && withdrawals.length === 0 && (
              <div className="result-error">
                <span>
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
                <h3> No withdrawals found!</h3>
              </div>
            )}
            {loading && (
              <div className="pxy10">
                <Card sx={{ m: "0", p: "0" }}>
                  <PlaceHolder type="list" />
                </Card>
              </div>
            )}
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default WithdrawList;
