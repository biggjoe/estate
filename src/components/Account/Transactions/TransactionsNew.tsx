import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Slide from "@mui/material/Slide";
import HttpService from "../../../services/HttpService";
import { DefaultEditor } from "react-simple-wysiwyg";
import CustomModal from "../../templates/CustomModal";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TransactionsNew = (props: any) => {
  console.log("New Ticket Modal Renders");
  let val = props.data;
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
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          padding: "10px",
          width: "100%",
        }}
      >
        <Link underline="hover" color="inherit" href="/account/tickets">
          Tickets
        </Link>

        <Link underline="hover" color="text.primary" aria-current="page">
          New Ticket
        </Link>
      </Breadcrumbs>

      <div className="px10 pb10">
        <Card sx={{ p: "0", m: "0" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ padding: "20px" }}>
              {/*   <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                  /> */}

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
    </>
  );
};

export default TransactionsNew;
