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
import Grid from "@mui/material/Grid";
import AccountBox from "@mui/icons-material/AccountBox";

const StaffList = (props: any) => {
  console.log(" staff list page Renders");
  const { launchNew } = props;
  const [staff, setStaff] = React.useState<any[]>([]);
  const [result_loaded, setResultLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  React.useEffect(() => {
    doAjax();
  }, []); //componentDidMount

  const doAjax = () => {
    setLoading(true);
    setResultLoaded(false);
    HttpService.postHeader("staff", { offset: 0, limit: 10, mode: "all" }).then(
      (result) => {
        setLoading(false);
        console.log(result);
        if (Array.isArray(result)) {
          setStaff(result);
        } else {
          setStaff([]);
        }
        setResultLoaded(true);
      },
      (error) => {
        setLoading(false);
        setError(error.message);
        setStaff([]);
        setResultLoaded(true);
      }
    ); //fetch
  }; //doAjax

  return (
    <>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-content-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-user-tie"></i> All Staff
        </h3>
        <div className="spacer"></div>
        <div>
          <Tooltip title="Create New">
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={launchNew}
            >
              <Add /> Add Staff
            </Button>
          </Tooltip>
        </div>
      </div>
      <Divider />
      {!loading && (
        <div className="pxy10">
          <Grid container spacing={2}>
            {staff.map((item: any, index: number) => (
              <Grid key={item.id} item xs={12} sm={6} md={3}>
                <Card>
                  <ListItem
                    disablePadding
                    button
                    divider={true}
                    component={NavLink}
                    to={`/admin/staff/p/${item.id}`}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ width: 70, height: 70, mr: "10px" }}
                          alt={`${item.firstname} ${item.surname} `}
                          src={
                            item.avatar
                              ? process.env.REACT_APP_SERVER_FILES_DOMAIN +
                                item.avatar
                              : "{`/public/images/logo.png`}"
                          }
                        />
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <h4>{`${item.firstname} ${item.surname} `}</h4>
                        }
                        secondary={item.stage_name}
                      ></ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Card>
              </Grid>
            ))}
          </Grid>
          {result_loaded && staff.length === 0 && (
            <div className="result-error">
              <span>
                <i className="fas fa-exclamation-triangle"></i>
              </span>
              <h3> No staff found!</h3>
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
    </>
  );
};

export default StaffList;
