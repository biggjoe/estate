import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AdminSidePanel from "./AdminSidePanel";
import AdminHeader from "./AdminHeader";
import Dashboard from "./Dashboard/Dashboard";
import Four0Four from "../public/Four0Four/Four0Four";
import AuthService from "../../services/AuthService";
import HttpService from "../../services/HttpService";
import Tickets from "../tickets/Tickets/Tickets";
import "../dashboard.css";
import Properties from "./Properties/Properties";
import Staff from "./Staff/Staff";
import SettingsPage from "./Settings/Settings";
import Category from "./Category/Category";
import Comments from "./Comments/Comments";
import Adverts from "./Adverts/Adverts";
import Users from "./Users/Users";
import Deals from "./Deals/Deals";
import Inspections from "./Inspections/Inspections";
import Widthdraw from "./Withdraw/Withdraw";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Admin() {
  console.log("Admin page Renders");
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
    setLoadingText("Verifying Admin...");
    setLoaded(false);
    console.log(verify_data);
    const load = verify_data;
    load.action = "doVerify";
    HttpService.postForm("verify-admin", load).then(
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
            const next_url = "/admin/dashboard";
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
      <AdminHeader
        open={open}
        toggleDrawer={toggleDrawer}
        DrawerHeader={DrawerHeader}
        doLogout={doLogout}
      />

      <AdminSidePanel
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
              <Route path="/properties/*" element={<Properties />}></Route>
              <Route path="/staff/*" element={<Staff />}></Route>
              <Route path="/deals/*" element={<Deals />}></Route>
              <Route path="/users/*" element={<Users />}></Route>
              <Route path="/tickets/*" element={<Tickets />}></Route>
              <Route path="/withdrawals/*" element={<Widthdraw />}></Route>
              <Route path="/categories/*" element={<Category />}></Route>
              <Route path="/comments/*" element={<Comments />}></Route>
              <Route path="/adverts/*" element={<Adverts />}></Route>
              <Route path="/inspections/*" element={<Inspections />}></Route>
              <Route path="/settings/*" element={<SettingsPage />}></Route>
              <Route
                path="*"
                element={
                  <>
                    <AdminHeader />
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
