import React from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import Tooltip from "@mui/material/Tooltip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Add from "@mui/icons-material/Add";
import { FlagOutlined } from "@mui/icons-material";

const DealsList = (props: any) => {
  console.log(props);
  const { launchNew } = props;
  const [properties, setProperties] = React.useState<any[]>([]);
  const [result_loaded, setResultLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  let params = useParams();
  const [offset, setOffset] = React.useState<number>(0);
  const [isParam, setParam] = React.useState(false);
  const [ticket_modal_open, setNewModalOpen] = React.useState(false);
  React.useEffect(() => {
    doAjax(offset);
  }, []); //componentDidMount

  const doAjax = (offset: number) => {
    setLoading(true);
    setResultLoaded(false);
    HttpService.post({ mode: "all-deals", is_admin: true }, "properties").then(
      (result) => {
        setLoading(false);
        console.log(result);
        if (Array.isArray(result.data)) {
          setProperties(result.data);
        } else {
          setProperties([]);
        }
        setResultLoaded(true);
      },
      (error) => {
        setLoading(false);
        setResultLoaded(true);
        setError(error.message);
        setProperties([]);
      }
    ); //fetch
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
                    <span> All Deals</span>
                  </Breadcrumbs>
                  <h2>
                    <FlagOutlined /> All Deals
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex pxy10 align-items-center">
              <div className="spacer"></div>
              <div>
                <Tooltip title="Create New">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={launchNew}
                  >
                    <Add /> Add Deal
                  </Button>
                </Tooltip>
              </div>
            </div>
            <Divider />

            {properties.length > 0 && (
              <div className="pxy0">
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
                  {properties.map((item: any, index: number) => (
                    <ListItem
                      disablePadding
                      button
                      key={index}
                      divider={true}
                      component={NavLink}
                      to={`/admin/deals/p/${item.id}`}
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar
                            variant="square"
                            sx={{
                              width: 60,
                              height: 60,
                              mr: "10px",
                              borderRadius: "8px",
                            }}
                            alt={`${item.title} `}
                            src={
                              item.photo
                                ? process.env.REACT_APP_SERVER_FILES_DOMAIN +
                                  item.photo
                                : "{`/images/logo.png`}"
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<h4>{item.title}</h4>}
                          secondary={
                            <span className="date-spanx">
                              <DatePipe value={item.create_date * 1000} />
                            </span>
                          }
                        ></ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                {result_loaded && properties.length === 0 && (
                  <div className="result-error">
                    <span>
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <h3> No deals found!</h3>
                  </div>
                )}
              </div>
            )}
            {loading && (
              <>
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
              </>
            )}
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default DealsList;
