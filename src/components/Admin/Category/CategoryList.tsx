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
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AccountBox from "@mui/icons-material/AccountBox";
import { CategoryOutlined } from "@mui/icons-material";

const CategoryList = (props: any) => {
  console.log(" category list page Renders");
  const { launchNew } = props;
  const [categories, setCategories] = React.useState<any[]>([]);
  const [result_loaded, setResultLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  React.useEffect(() => {
    doAjax();
  }, []); //componentDidMount

  const doAjax = () => {
    setLoading(true);
    setResultLoaded(false);
    HttpService.postHeader("properties", {
      offset: 0,
      limit: 120,
      is_admin: true,
      mode: "list-categories",
    }).then(
      (result) => {
        setLoading(false);
        console.log(result);
        if (Array.isArray(result)) {
          setCategories(result);
        } else {
          setCategories([]);
        }
        setResultLoaded(true);
      },
      (error) => {
        setLoading(false);
        setError(error.message);
        setCategories([]);
        setResultLoaded(true);
      }
    ); //fetch
  }; //doAjax

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
                    <span> All Categories</span>
                  </Breadcrumbs>
                  <h2>
                    <CategoryOutlined /> All Categories
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
                    <Add />
                    <span className="sm-hide-inline"> Add Category</span>
                  </Button>
                </Tooltip>
              </div>
            </div>
            <Divider />

            {!loading && (
              <div className="pxy10">
                <div className="under-grider">
                  <Grid container spacing={2}>
                    {categories.map((item: any, index: number) => (
                      <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card>
                          <ListItem
                            disablePadding
                            button
                            divider={true}
                            component={NavLink}
                            to={`/admin/categories/p/${item.id}`}
                          >
                            <ListItemButton>
                              <ListItemAvatar>
                                <Avatar
                                  sx={{ width: 60, height: 60, mr: "10px" }}
                                  alt={`${item.title} `}
                                  src={
                                    item.bg_thumb
                                      ? process.env
                                          .REACT_APP_SERVER_FILES_DOMAIN +
                                        item.bg_thumb
                                      : `/images/icon.png`
                                  }
                                />
                              </ListItemAvatar>

                              <ListItemText
                                primary={<h4>{`${item.title} `}</h4>}
                                secondary={item.summary}
                              ></ListItemText>
                            </ListItemButton>
                          </ListItem>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
                {result_loaded && categories.length === 0 && (
                  <div className="result-error">
                    <span>
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <h3> No category found!</h3>
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
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CategoryList;
