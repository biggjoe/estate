import React from "react";
import {
  Outlet,
  useLocation,
  useParams,
  NavLink,
  Link,
} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import MailOutline from "@mui/icons-material/MailOutline";
import Add from "@mui/icons-material/Add";
import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const TicketList = (props: any) => {
  console.log(" Ticket page Renders");
  const { launchNew } = props;
  const [tickets, setTickets] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  let params = useParams();
  const location = useLocation();
  const parts = location.pathname.split("/");
  const base = "/" + parts[1] + "/";
  const pageName = location.pathname;
  const [isParam, setParam] = React.useState(false);
  const [ticket_modal_open, setNewModalOpen] = React.useState(false);
  React.useEffect(() => {
    const isParam = params.ticketId ? true : false;
    console.log("IS PARAM::: ", isParam);
    console.log("pageName::: ", pageName);
    setParam(isParam);
    doAjax();
  }, []); //componentDidMount

  const doAjax = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("tickets", { mode: "all" })
      .then(
        (result) => {
          console.log(result);
          if (Array.isArray(result.data)) {
            setTickets(result.data);
          } else {
            setTickets([]);
          }
        },
        (error) => {
          setError(error.message);
          setTickets([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const launchNewModal = () => {
    setNewModalOpen(true);
  };

  const newModalClose = (data: any = false) => {
    setNewModalOpen(false);
    if (data) {
      tickets.unshift(data);
    }
  };

  if (!isParam) {
    return (
      <section className="dashboard-pane">
        <div className="container py0">
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
                    <Link to={`${base}dashboard`}>Dashboard</Link>
                  </Breadcrumbs>
                  <h2 className="mt20">
                    <i className="fas fa-ticket"></i> Support Tickets
                  </h2>
                </div>
              </div>
            </div>

            <div className="pxy10 flex align-items-center ">
              <div className="spacer"></div>
              <div>
                <Tooltip title="Create New">
                  <Button
                    onClick={() => launchNew(base)}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    <Add />
                    <span className="sm-hide-inline"> New Ticket</span>
                  </Button>
                </Tooltip>
              </div>
            </div>
            <Divider />
            {!loading && (
              <div className="py0">
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
                      bgcolor: "orange",
                      "&, & .MuiListItemIcon-root": {
                        color: "white",
                      },
                    },
                  }}
                >
                  {tickets.map((item: any, index: number) => (
                    <ListItem
                      disablePadding
                      button
                      key={item.id}
                      divider={true}
                      component={NavLink}
                      to={`${base}tickets/p/${item.id}`}
                      secondaryAction={
                        <>
                          <span>
                            <DatePipe value={item.tdate} />
                          </span>
                        </>
                      }
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <MailOutline />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography component={"h2"}>
                            {item.subject}
                          </Typography>{" "}
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                {loaded && tickets.length === 0 && (
                  <div className="result-error">
                    <span>
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <h3> No Support tickets found!</h3>
                  </div>
                )}
              </div>
            )}
            {loading && (
              <>
                <div className="pxy20">
                  <Card className="pxy20">
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
    );
  } else {
    return <Outlet />;
  }
};

export default TicketList;
