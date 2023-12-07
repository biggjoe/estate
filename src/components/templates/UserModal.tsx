import React from "react";
import {
  Slide,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Divider,
  TextField,
  Button,
  DialogContent,
  Dialog,
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import {
  Add,
  Email,
  Sms,
  WhatsApp,
  Close,
  VerifiedUser,
} from "@mui/icons-material";
import HttpService from "../../services/HttpService";
import CopyText from "../../services/CopyText";
import UserDetailTemplate from "./UserDetailTemplate";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TabPanel = (props: any) => {
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
};

const UserModal = (props: any) => {
  console.log(props);
  const val = props.data;
  const [value, setValue] = React.useState(0);
  const [invite, setInvite] = React.useState<any>({
    message: "",
    receipients: "",
  });
  const [tabIndex, setTabIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [pasted, setPasted] = React.useState(false);
  const [response, setResponse] = React.useState({});
  const [error, setError] = React.useState("");

  const handleTabChange = (event: any, newValue: any) => {
    console.log(newValue);
    setValue(newValue);
    setTabIndex(newValue);
    setInvite({ message: "", receipients: "" });
  };

  const handleInputChange = (event: any) => {
    const targ = event.target;
    const name = targ.name;
    const value = targ.value;
    const tabmode = tabs[tabIndex].mode;
    if (!pasted) {
      setInvite({ ...invite, [name]: value, mode: tabmode });
    }
    setPasted(false);
    setCount(invite[name].length);
    console.log(count);
  };

  const handlePaste = () => {
    setPasted(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(invite);
    HttpService.postHeader("referral/invite", invite).then(
      (result) => {
        console.log(result);
        setResponse(result);
      },
      (error) => {
        setError(error.message);
      }
    ); //postInvite
  };

  const tabs: any[] = [
    { index: 0, label: "SMS", mode: "sms", icon: <Sms /> },
    { index: 1, label: " WhatsApp", mode: "whatsapp", icon: <WhatsApp /> },
    { index: 2, label: " Email", mode: "email", icon: <Email /> },
  ];

  return (
    <Dialog
      fullScreen={true}
      TransitionComponent={Transition}
      open={val.onopen}
      onClose={val.onclose}
      scroll={"paper"}
      aria-labelledby={"Me"}
    >
      {/*    <DialogTitle id={val.id}>{val.title}</DialogTitle> */}
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={val.onclose}
            aria-label="close"
          >
            <VerifiedUser />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {val.title}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={val.onclose}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider />
      <DialogContent sx={{ padding: "0px" }}>
        <Box
          sx={{
            padding: "20px",
            maxWidth: { xs: "100%", sm: "100%" },
            bgcolor: "background.paper",
          }}
        >
          <section>
            <UserDetailTemplate data={val.user} />
          </section>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(UserModal);
