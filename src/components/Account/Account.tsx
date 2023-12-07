import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AccountSidePanel from "./AccountSidePanel";
import AccountHeader from "./AccountHeader";
import Dashboard from "./Dashboard/Dashboard";
import Four0Four from "../public/Four0Four/Four0Four";
import AuthService from "../../services/AuthService";
import HttpService from "../../services/HttpService";
import SettingsPage from "./Settings/Settings";
import Comments from "./Comments/Comments";
import Tickets from "../tickets/Tickets/Tickets";
import Notifications from "./Notifications/Notifications";
import Transactions from "./Transactions/Transactions";
import MyProperties from "./MyProperties/MyProperties";
import "../dashboard.css";
import Referral from "./Referral/Referral";
import Widthdraw from "./Withdraw/Withdraw";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Account() {
  console.log("Account page Renders");
  const [user_logged, setUserLogged] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [to_verify, setToVerify] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [resending, setResending] = React.useState(false);
  const [loading_text, setLoadingText] = React.useState(
    "Please enter the verification code sent your phone or email"
  );
  const [verify_data, setVerifyData] = React.useState<any>({});
  const usr = AuthService.getCurrentUser();
  let navigate = useNavigate();
  React.useEffect(() => {
    AuthService.checkSession().then(
      (res) => {
        console.log("SESSION CHECK RESULT:: ", res);
        if (!res.status || res.status === 0) {
          AuthService.logout();
          setRedirect(true);
          return navigate("/login");
        } else {
          if (usr.is_verified === 0) {
            setToVerify(true);
            setVerifyData({ ...verify_data, user: usr.email });
          } else {
            setUserLogged(true);
          }
        }
      },
      (error) => {
        console.log(error.message);
        AuthService.logout();
        return navigate("/login");
      }
    );
  }, []);

  const handleInput = (e: any) => {
    const target = e.target;
    setVerifyData({ ...verify_data, [e.target.name]: e.target.value });
  };
  const handleVerify = () => {
    setLoading(true);
    setLoadingText("Verifying Account...");
    setLoaded(false);
    console.log(verify_data);
    const load = verify_data;
    load.action = "doVerify";
    HttpService.postForm("verify-account", load).then(
      (res) => {
        console.log(res);
        setLoaded(true);
        setLoading(false);
        setLoadingText(res.message);
        if (res.status === 1) {
          let rsp = res;
          let jwt = rsp.jwt;
          let expire_at = rsp.expireAt;
          let usr = JSON.stringify(rsp.user);
          localStorage.setItem("user", usr);
          localStorage.setItem("access_token", jwt);
          localStorage.setItem("expire_at", expire_at);
          setTimeout(() => {
            console.log("Redirecting...");
            const next_url = "/account/dashboard";
            window.location.href = next_url;
            return;
          }, 3000);
        }
      },
      (error) => {
        setLoaded(true);
        setLoading(false);
        setLoadingText(error.message);
      }
    );
  };

  const resendCode = (e: any) => {
    e.preventDefault();
    setResending(true);
    setLoadingText("Resending verification code...");
    setLoaded(false);
    const load = verify_data;
    load.action = "resendToken";
    HttpService.postForm("resend-token", load).then(
      (res) => {
        console.log(res);
        setLoadingText(res.message);
        setLoaded(true);
        setTimeout(() => {
          setResending(false);
          setLoadingText("Enter Verification Code");
        }, 3000);
      },
      (error) => {
        console.log(error);
        setResending(false);
        setLoaded(true);
        setLoadingText(error.message);
      }
    );
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const doLogout = () => {
    AuthService.logout();
    setTimeout(() => {
      console.log("Session Cleared...");
      return navigate("/");
    }, 300);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1 1",
        width: "100%",
        minHeight: "100vh",
        padding: "0 !important",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CssBaseline />
      <AccountHeader
        open={open}
        toggleDrawer={toggleDrawer}
        DrawerHeader={DrawerHeader}
        doLogout={doLogout}
      />

      <AccountSidePanel
        onopen={open}
        onclose={handleDrawerClose}
        DrawerHeader={DrawerHeader}
        doLogout={doLogout}
      />
      <main style={{ width: "100%", height: "100%" }}>
        <DrawerHeader />
        <Routes>
          {user_logged && (
            <>
              <Route path="" element={<Dashboard />}></Route>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/comments/*" element={<Comments />}></Route>
              <Route path="/referral/*" element={<Referral />}></Route>
              <Route path="/withdrawals/*" element={<Widthdraw />}></Route>
              <Route path="/my-properties/*" element={<MyProperties />}></Route>
              <Route path="/tickets/*" element={<Tickets />}></Route>
              <Route path="/transactions/*" element={<Transactions />}></Route>
              <Route
                path="/notifications/*"
                element={<Notifications />}
              ></Route>
              <Route path="/settings/*" element={<SettingsPage />}></Route>
              <Route
                path="*"
                element={
                  <>
                    <AccountHeader />
                    <Four0Four />
                  </>
                }
              />
            </>
          )}
          {!user_logged && (
            <>
              <Route path="*" element={<div>Verifying status...</div>}></Route>
            </>
          )}
        </Routes>
      </main>
    </Box>
  );
}
