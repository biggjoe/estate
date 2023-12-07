import React, { useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { DefaultEditor } from "react-simple-wysiwyg";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";

const TicketReply = (props: any) => {
  let params = useParams();
  const location = useLocation();
  const parts = location.pathname.split("/");
  const base = "/" + parts[1] + "/";
  const [isParam, setParam] = React.useState(false);

  const [loaded, setLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [reply_data, setData] = useState({
    id: "",
    pid: "",
    message: "",
    subject: "",
  });

  React.useEffect(() => {
    const isParam = params.ticketId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchDetails(params.ticketId);
    }
  }, []);

  const fetchDetails = (id: any) => {
    HttpService.postHeader("tickets", { mode: "details", id: id })
      .then(
        (response) => {
          console.log(response);
          setLoading(false);
          setData({
            ...reply_data,
            subject: response.data.subject,
            id: response.data.id,
            pid: response.data.id,
          });
          setLoaded(true);
        },
        (error) => {
          setError(error.message);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  }; //fetChdetails;

  const [response, setResponse] = useState({});
  const [error, setError] = useState("");

  const onToastClose = () => {
    setSnack({ onopen: false });
  };
  const [snack, setSnack] = useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });

  const handleInputChange = (event: any) => {
    const targ = event.target;
    const name = targ.name;
    const value = targ.value;
    setData({ ...reply_data, [name]: value });
    console.log(reply_data);
  };
  const onHtmlChange = (e: any) => {
    setMessage(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(reply_data);
    const obj: any = { ...reply_data, message: message, mode: "reply" };
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("tickets", obj)
      .then(
        (resp) => {
          console.log(resp);
          setSnack({ ...snack, onopen: true, message: resp.message });
          if (resp.status === 1) {
            setTimeout(() => {
              setSnack({ ...snack, onopen: false });
              return navigate(`/account/tickets/p/${params.ticketId}`);
            }, 3000);
          }
        },
        (error) => {
          setSnack({ ...snack, onopen: true, message: error.message });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postTicket
  };

  const navigate = useNavigate();
  const goDetail = () => {
    return navigate(`${base}tickets/p/${params.ticketId}`);
  };
  const goHome = () => {
    return navigate(`${base}tickets`);
  };

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
                  <Link to={`${base}tickets`}>Tickets</Link>
                </Breadcrumbs>
                <h2 className="mt20">
                  <i className="fas fa-ticket"></i> Reply
                </h2>
              </div>
            </div>
          </div>

          <Divider />
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              padding: "10px",
              width: "100%",
            }}
          >
            <Link onClick={goDetail} to="#">
              {reply_data?.subject}
            </Link>
          </Breadcrumbs>
          <Divider />
          <div className="px10 pb10">
            <form onSubmit={handleSubmit}>
              <div style={{ padding: "20px" }}>
                <div className="relative">
                  <TextField
                    name="subject"
                    value={"Re: " + reply_data.subject}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: "4px" }}
                    placeholder={"Subject"}
                    multiline={false}
                  />
                </div>

                <div className="relative py10">
                  <DefaultEditor value={message} onChange={onHtmlChange} />
                </div>

                <Button type="submit" variant="contained">
                  Send Reply
                </Button>
              </div>
            </form>
          </div>
          <CustomModal data={snack} />
        </Card>
      </div>
    </section>
  );
};

export default TicketReply;
