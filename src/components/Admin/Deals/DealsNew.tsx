import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";
import { ListItemAvatar } from "@mui/material";

const DealsNew = (props: any) => {
  console.log("New News Renders");
  let val = props.data;

  let navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categories_fetched, setCategoriesFetched] =
    React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<string>("");
  const [loading_text, setText] = React.useState<string>("Save Now");
  const onToastClose = () => {
    setToast({ onopen: false, onclose: onToastClose });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });
  const [meta, setMeta] = React.useState<any>(new FormData());

  React.useEffect(() => {
    if (!categories_fetched) {
      fetchCats();
    }
  }, []);

  const fetchCats = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("news", { mode: "list-categories" })
      .then(
        (resp) => {
          console.log(resp);
          if (Array.isArray(resp)) {
            setCategories(resp);
            setCategoriesFetched(true);
          } else {
            setCategories([]);
          }
        },
        (error) => {
          setToast({ ...toast, onopen: true, message: error.message });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postTicket
  };

  const handleInputChange = React.useCallback(
    (event: any) => {
      const targ = event.target;
      const name = targ.name;
      const value = targ.value;
      console.log(name, value);
      setMeta({ ...meta, [name]: value });
      console.log(meta);
    },
    [meta]
  );

  const onHtmlChange = (e: any) => {
    setContent(e.target.value);
    console.log(content);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const obj: any = { ...meta, mode: "create" };
    console.log(obj);
    setLoading(true);
    setLoaded(false);
    HttpService.postForm("deals", obj)
      .then(
        (resp) => {
          console.log(resp);
          setToast({ ...toast, onopen: true, message: resp.message });
          if (resp.status === 1) {
            setTimeout(() => {
              setToast({ ...toast, onopen: false });
              navigate(`/admin/deals/p/${resp.id}`);
            }, 3000);
          }
        },
        (error) => {
          setToast({ ...toast, onopen: true, message: error.message });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postTicket
  };

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
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
                    <Link to="/admin/deals">Deals</Link>
                    <span>Create Deal</span>
                  </Breadcrumbs>
                  <h2>New Deal</h2>
                </div>
              </div>
            </div>

            <div className="pxy20">
              <div className={loading ? " input iconed " : " input "}>
                <label>Deal Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={handleInputChange}
                  placeholder={"Deal Title"}
                />
                {loading && (
                  <span className="input-icon">
                    <i className="fas fa-refresh fa-spin"></i>
                  </span>
                )}
              </div>
              <Grid container rowSpacing={0.5} columnSpacing={{ xs: 1 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((value, index) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={value}>
                      <Card sx={{ mb: "10px" }}>
                        <ListItem
                          divider
                          secondaryAction={
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          }
                        >
                          <ListItemButton
                            role={undefined}
                            onClick={handleToggle(value)}
                            dense
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
                                alt={`Avatar n°${value + 1}`}
                                src={`/static/images/avatar/${value + 1}.jpg`}
                              />
                            </ListItemAvatar>

                            <ListItemText
                              id={labelId}
                              primary={`Line item ${value + 1}`}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Working..." : " Create Deal "}
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <CustomModal data={toast} />
    </React.Fragment>
  );
};

export default DealsNew;
