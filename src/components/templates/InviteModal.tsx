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
import { Add, Email, Sms, WhatsApp, Close } from "@mui/icons-material";
import HttpService from "../../services/HttpService";
import CopyText from "../../services/CopyText";
import CustomModal from "./CustomModal";

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
        <Box sx={{ p: "0" }}>
          <section>{children}</section>
        </Box>
      )}
    </div>
  );
};

const InviteModal = (props: any) => {
  const val = props.data;
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [invite, setInvite] = React.useState<any>({
    message: "",
    receipients: "",
  });
  const closeModal = () => {
    setModal({ ...modal, onopen: false, onclose: closeModal });
  };

  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: closeModal,
  });

  const [tabIndex, setTabIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [pasted, setPasted] = React.useState(false);

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
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("referral/invite", invite)
      .then(
        (result) => {
          console.log(result);
          setModal({ ...modal, onopen: true, message: result.message });
        },
        (error) => {
          setModal({ ...modal, onopen: true, message: error.message });
          setTimeout(() => {
            val.onclose();
          }, 5000);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postInvite
  };

  const tabs: any[] = [
    { index: 0, label: "SMS", mode: "sms", icon: <Sms /> },
    { index: 1, label: " WhatsApp", mode: "whatsapp", icon: <WhatsApp /> },
    { index: 2, label: " Email", mode: "email", icon: <Email /> },
  ];

  const placeholder =
    tabIndex === 0
      ? `Write invitation message here. 
        Remember to include your referral code. 
        SMS message should not exceed 160 characters`
      : tabIndex === 1
      ? `Write invitation message here. 
         Remember to include your referral code`
      : tabIndex === 2
      ? `Write invitation message here. 
        Remember to include your referral code.
        Your email should aim to be precise and straight to the point`
      : "";
  const placeholder_recs =
    tabIndex === 0
      ? `separate phone numbers with comma: eg: 0803000000,09030000`
      : tabIndex === 1
      ? `separate phone numbers with comma: eg: 0803000000,09030000`
      : tabIndex === 2
      ? `separate email addresses with comma`
      : "";
  return (
    <React.Fragment>
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
              <Add />
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
              padding: "0px",
              maxWidth: { xs: "100%", sm: "100%" },
              bgcolor: "background.paper",
            }}
          >
            <section>
              <>
                <Tabs
                  value={tabIndex}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  aria-label="scrollable auto tabs example"
                >
                  {tabs.map((itm: any, ind: number) => (
                    <Tab
                      key={ind}
                      icon={itm.icon}
                      iconPosition="start"
                      label={itm.label}
                    />
                  ))}
                </Tabs>

                <div className="flex flex-row justify-content-center align-items-center px20 py10">
                  <h4 className="py0 my0">{tabs[tabIndex].label}</h4>

                  <span className="spacer text-right"></span>
                  <div className="text-right">
                    <CopyText
                      text={
                        process.env.REACT_APP_SERVER_DOMAIN +
                        "r/" +
                        val.username
                      }
                    />
                  </div>
                </div>
                <Divider />

                {tabs.map((item: any, index: number) => (
                  <TabPanel value={tabIndex} index={index} key={index}>
                    <div style={{ padding: "20px" }}>
                      <div className="input">
                        <label>Receipients</label>
                        <input
                          className="form-control"
                          name="receipients"
                          placeholder={placeholder_recs}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="relative">
                        <TextField
                          name="message"
                          onChange={handleInputChange}
                          onPaste={handlePaste}
                          fullWidth
                          sx={{ marginBottom: "4px" }}
                          placeholder={placeholder}
                          multiline={true}
                        />

                        <span className="text-counter">{count}</span>
                      </div>

                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading}
                      >
                        {loading ? "Working..." : "Send Message"}
                      </Button>
                    </div>
                  </TabPanel>
                ))}
              </>
            </section>
          </Box>
        </DialogContent>
      </Dialog>
      <CustomModal data={modal} />
    </React.Fragment>
  );
};

export default React.memo(InviteModal);
