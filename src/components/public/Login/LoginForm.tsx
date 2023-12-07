import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CustomModal from "../../templates/CustomModal";
import SeoModule from "../../../services/SeoModule";
import { GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";

import axios from "axios";
import { Facebook, Google, LogoutOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const LoginForm = ({
  submit_handler,
  loading,
}: {
  submit_handler: any;
  loading: boolean;
}) => {
  const [form, setForm] = React.useState<any>({});
  const handleInput = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };

  const [err, setErr] = React.useState<any>({});
  const googleResponseMessage = (response: any) => {
    setUser(response);
  };
  const googleErrorMessage = (error: any) => {
    setErr({ error: error });
  };

  const [user, setUser] = React.useState<any>(null);

  const gooLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const gooLogOut = () => {
    googleLogout();
    setUser(null);
  };

  React.useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          //setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  /* 
  const [facebook_login, setFacebookLogin] = React.useState(false);
  const [facebook_data, setData] = React.useState({});
  const [facebook_picture, setPicture] = React.useState("");

  const responseFacebook = (response: any) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setFacebookLogin(true);
    } else {
      setFacebookLogin(false);
    }
  }; */

  const [fb_token, setToken] = React.useState<any>(null);
  const [fb_logged, setFbLogged] = React.useState<boolean>(false);

  const loginFb = async () => {
    //if (fb_token && fb_token.expiresIn < 600) {
    // login with facebook then authenticate with the API to get a JWT auth token
    const authResponse: any = await new Promise(window.FB.login);
    if (!authResponse) return;
    console.log("FB response", authResponse);
    await setToken(authResponse.accessToken);
    /*  } else {
      console.log("FACEBOOK STILL CONNECTED");
      console.log("Window: ", window);
    } */
  };

  const logoutFb = async () => {
    const authResponse: any = await new Promise(window.FB.logout);
    console.log("FB response", authResponse);
    //if (!authResponse) return;
  };
  const loadFbLoginApi = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
      });
    };

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function (d: any, s: any, id: any) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  React.useEffect(() => {
    loadFbLoginApi();
    //checkFbStatus();
  }, [window.FB]);

  const checkFbStatus = () => {
    window.FB.getLoginStatus((response: any) => {
      console.log(response);
      const { authResponse, connected } = response;
      if (authResponse) {
        //apiAuthenticate(authResponse.accessToken).then(resolve);

        setFbLogged(true);
        return true;
      } else {
        //resolve();
        setFbLogged(false);
        return false;
      }
    });
  };

  return (
    <React.Fragment>
      <section>
        <div className="login-pane">
          <div className="input iconed">
            <label>Email or Phone</label>
            <input
              type="text"
              name="login"
              className="form-control"
              placeholder="Enter email or phone"
              onChange={handleInput}
            />
            <span className="input-icon">
              <i className="fas fa-user"></i>
            </span>
          </div>
          <div className="input iconed">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleInput}
            />
            <span className="input-icon">
              <i className="fas fa-lock"></i>
            </span>
          </div>

          <div className="flex flex-row align-items-center">
            <Button
              onClick={() => submit_handler(form)}
              size="large"
              disabled={loading}
              variant="contained"
              type="submit"
            >
              {loading ? "Working..." : "Login"}
            </Button>
            <span className="spacer"></span>
            <span className="pl5">
              <Link to={"/forgot-password"}>Forgot password?</Link>
            </span>
          </div>
        </div>
        <div className="py20 text-center">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
        {/*login-pane */}
      </section>
    </React.Fragment>
  );
};

export default LoginForm;
