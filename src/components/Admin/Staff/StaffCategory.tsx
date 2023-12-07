import React from "react";
import { Outlet, useLocation, useParams, NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import MailOutline from "@mui/icons-material/MailOutline";
import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";

const StaffCategory = (props: any) => {
  console.log(" Accounts page Renders");
  let val = props.data;
  const [staff, setStaff] = React.useState<any[]>([]);
  const [result_loaded, setResultLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  let params = useParams();
  const location = useLocation();
  const pageName = location.pathname;
  const [isParam, setParam] = React.useState(false);
  const [ticket_modal_open, setNewModalOpen] = React.useState(false);
  const parts = location.pathname.split("/");
  const base = "/" + parts[1] + "/";
  React.useEffect(() => {
    const isParam = params.staffId ? true : false;
    console.log("IS PARAM::: ", isParam);
    console.log("pageName::: ", pageName);
    setParam(isParam);
    if (
      (!isParam && pageName === "/admin/staff") ||
      (!isParam && pageName === "/admin/staff")
    ) {
      doAjax();
    }
  }, [params]); //componentDidMount

  const doAjax = () => {
    setLoading(true);
    setResultLoaded(false);
    HttpService.getHeader("staff/all").then(
      (result) => {
        setLoading(false);
        console.log(result);
        if (Array.isArray(result.data)) {
          setStaff(result.data);
        } else {
          setStaff([]);
        }
        setResultLoaded(true);
      },
      (error) => {
        setLoading(false);
        setResultLoaded(true);
        setError(error.message);
        setStaff([]);
      }
    ); //fetch
  }; //doAjax

  const launchNewModal = () => {
    setNewModalOpen(true);
  };

  const newModalClose = (data: any = false) => {
    setNewModalOpen(false);
    if (data) {
      staff.unshift(data);
    }
  };

  if (!isParam) {
    return (
      <>
        {!loading && (
          <div className="pxy20">
            <Card sx={{ p: "0", m: "0" }}>
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
                {staff.map((item: any, index: number) => (
                  <ListItem
                    disablePadding
                    button
                    key={item.id}
                    divider={true}
                    component={NavLink}
                    to={`${base}staff/p/${item.id}`}
                    secondaryAction={
                      <>
                        <span>
                          <DatePipe value={item.create_date} />
                        </span>
                      </>
                    }
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <i className="fas fa-bank"></i>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography component={"h2"}>{item.nuban}</Typography>
                        }
                        secondary={
                          <Typography component={"span"}>
                            {item.type_title}
                          </Typography>
                        }
                      ></ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              {result_loaded && staff.length === 0 && (
                <div className="result-error">
                  <span>
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h3> No staff found!</h3>
                </div>
              )}
            </Card>
          </div>
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
      </>
    );
  } else {
    return <Outlet />;
  }
};

export default StaffCategory;
