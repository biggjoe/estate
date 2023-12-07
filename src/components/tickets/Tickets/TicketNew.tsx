import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from "@mui/material/Card";
import HttpService from "../../../services/HttpService";
import { DefaultEditor } from "react-simple-wysiwyg";
import CustomModal from "../../templates/CustomModal";

const TicketNew = (props: any) => {
  console.log("New Ticket Modal Renders");
  const location = useLocation();
  const parts = location.pathname.split("/");
  const base = "/" + parts[1] + "/";
  const [ticket_data, setData] = React.useState({ message: "", subject: "" });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const onToastClose = () => {
    setSnack({ onopen: false, onclose: onToastClose });
  };
  const [snack, setSnack] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });

  const handleInputChange = (event: any) => {
    const targ = event.target;
    const name = targ.name;
    const value = targ.value;
    setData({ ...ticket_data, [name]: value });
    console.log(ticket_data);
  };

  const onHtmlChange = (e: any) => {
    setMessage(e.target.value);
    console.log(message);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(ticket_data);
    const obj: any = { ...ticket_data, message: message, mode: "create" };
    console.log(obj);
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
                  <i className="fas fa-ticket"></i> New Ticket
                </h2>
              </div>
            </div>
          </div>

          <Divider />
          <form onSubmit={handleSubmit}>
            <div style={{ padding: "20px" }}>
              <div className="relative">
                <TextField
                  name="subject"
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

              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Working..." : "Create Ticket"}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <CustomModal data={snack} />
    </section>
  );
};

export default TicketNew;
