import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import PlaceHolder from "../../templates/PlaceHolder";
import CustomModal from "../../templates/CustomModal";

function Notifications(props: any) {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const doAjax = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("notifications", { mode: "all" })
      .then(
        (result: any) => {
          console.log(result);
          if (Array.isArray(result.data)) {
            setNotifications(result.data);
          } else {
            setNotifications([]);
          }
        },
        (error) => {
          setNotifications([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  React.useEffect(() => {
    doAjax();
  }, []); //componentDidMount

  const htmlSafe = (value: string) => {
    return value.toUpperCase();
  };
  const setNumber = (value: any) => {
    return value.toFixed(2);
  };

  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };

  const [modal, setModal] = React.useState({
    title: "",
    onopen: false,
    onclose: closeModal,
    message: "",
    date: "",
  });
  const openModal = (item: any, value?: any) => {
    const idt = () => <DatePipe value={item.ndate} />;
    setModal({
      ...modal,
      title: "Notification Details",
      message: `${item.detail}`,
      date: item.ndate,
      onopen: true,
    });
  };

  const createMarkup = (text: any) => {
    return { __html: text };
  };

  return (
    <React.Fragment>
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
                    <Link to={`/account/dashboard`}>Dashboard</Link>
                  </Breadcrumbs>
                  <h2 className="mt20">
                    <i className="fas fa-bell"></i> Notifications
                  </h2>
                </div>
              </div>
            </div>
            <Divider />
            {!loading && (
              <>
                {notifications.map((item: any, index: number) => (
                  <ListItem
                    button
                    onClick={() => openModal(item)}
                    key={item.id}
                    divider={index === notifications.length - 1 ? false : true}
                  >
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>{" "}
                    <ListItemText
                      primary={
                        <span
                          dangerouslySetInnerHTML={createMarkup(item.detail)}
                        />
                      }
                      secondary={<DatePipe value={item.ndate} />}
                    />
                  </ListItem>
                ))}
              </>
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

            <CustomModal data={modal} />
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Notifications;
