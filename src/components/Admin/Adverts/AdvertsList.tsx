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
import useFetchAdverts from "../../../hooks/useFetchAdverts";

const AdvertsList = (props: any) => {
  console.log(" staff list page Renders");
  const { launchNew } = props;
  const [staff, setStaff] = React.useState<any[]>([]);
  const [result_loaded, setResultLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const { adverts, loading_adverts, loaded_adverts } = useFetchAdverts({
    offset: 0,
    limit: 1000,
  });

  return (
    <>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-content-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-user-tie"></i> All Adverts
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
              <Add />
              <span className="sm-hide-inline"> Create Advert</span>
            </Button>
          </Tooltip>
        </div>
      </div>
      <Divider />
      {!loading && (
        <div className="pxy10">
          <div className="under-grider">
            {" "}
            <Card>
              {adverts.map((item: any, index: number) => (
                <ListItem
                  key={item.id}
                  disablePadding
                  button
                  divider={true}
                  component={NavLink}
                  to={`/admin/adverts/p/${item.id}`}
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "4px",
                          mr: "10px",
                        }}
                        alt={`${item.title} `}
                        src={
                          item.avatar
                            ? process.env.REACT_APP_SERVER_FILES_DOMAIN +
                              item.file
                            : "{`/public/images/logo.png`}"
                        }
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={<h4>{`${item.title} `}</h4>}
                      secondary={item.impression_num}
                    ></ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </Card>
          </div>
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

export default AdvertsList;
