import React from "react";
import { Link, useLocation, useParams, NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import { HomeMaxOutlined } from "@mui/icons-material";
import { ListItemIcon } from "@mui/material";

const Inspections = (props: any) => {
  console.log(props);
  const { launchNew } = props;
  console.log(" inspections list page Renders");
  const [inspections, setInspections] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [offset, setOffset] = React.useState<number>(0);

  React.useEffect(() => {
    doAjax(offset);
  }, []); //componentDidMount

  const doAjax = (offset: number) => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("properties", {
      offset: offset,
      limit: 200,
      mode: "all-inspections",
      is_admin: true,
    })
      .then(
        (result) => {
          console.log(result);
          if (Array.isArray(result)) {
            setInspections(result);
          } else {
            setInspections([]);
          }
        },
        (error) => {
          setInspections([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const loadMore = () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    doAjax(newOffset);
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
                    <span> All Inspections</span>
                  </Breadcrumbs>
                  <h2>
                    <i className="fas fa-user-group"></i> All Inspections
                  </h2>
                </div>
              </div>
            </div>
            <Divider />

            {inspections.length > 0 && (
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
                  {inspections.map((item: any, index: number) => (
                    <div key={item.id}>
                      <ListItem
                        disablePadding
                        divider={true}
                        component={NavLink}
                        to={`/admin/inspections/p/${item.id}`}
                        secondaryAction={
                          item.status === 1 ? (
                            <span className="px10">
                              <i className="fas fa-check-double"></i>
                            </span>
                          ) : (
                            <span className="px10">
                              <i className="fas fa-hourglass"></i>
                            </span>
                          )
                        }
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <HomeMaxOutlined />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <h4>Inspection for: {item.property_title}</h4>
                            }
                            secondary={
                              <span className="date-spanx">
                                Booked By: <strong>{item.name}</strong>,
                                Inspection Date:
                                <strong>
                                  <DatePipe
                                    value={item.inspection_date * 1000}
                                  />
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
            {loaded && inspections.length === 0 && (
              <div className="result-error">
                <span>
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
                <h3> No inspections found!</h3>
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

export default Inspections;
