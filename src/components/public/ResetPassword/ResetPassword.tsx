import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";
import SeoModule from "../../../services/SeoModule";

const ResetPassword = () => {
  const params = useParams();
  console.log(params);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [response_text, setResponseText] = React.useState<string>("");
  const [code_confirmed, setConfirmed] = React.useState<boolean>(false);
  const [confirmed_message, setConfirmedMessage] = React.useState<string>("");
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState<any>({
    onopen: false,
    onclose: modalClose,
  });
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (params.code) {
      confirmCode(params.code);
    }
  }, [params]);

  const [form, setForm] = React.useState<any>({});
  const handleInput = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };

  const confirmCode = (code: any) => {
    setLoading(true);
    setLoaded(false);
    HttpService.postForm("auth", {
      mode: "confirm-verification-code",
      code: code,
    })
      .then(
        (response) => {
          let rsp = response;
          console.log("conf code ::::", rsp);
          if (rsp.status === 1) {
            console.log("conf code :::: is confirmed");
            setConfirmed(true);
            setConfirmedMessage(`Your account verified, please change your password below
               `);
            setForm({ ...form, user: rsp.user.email });
            console.log(code_confirmed);
          }
        }, //resPonse ends//
        (error) => {
          setModal({
            ...modal_data,
            onopen: true,
            message: error.message,
            onclose: modalClose,
          });
          setConfirmed(false);
        } //error ends//
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };

  const sendReset = (data: any) => {
    setForm({ ...form, mode: "update-password" });
    console.log(form);
    if (!form.newpassword || form.newpassword1 === "") {
      return alert("Please supply your new password");
    }
    setConfirmedMessage("");
    setLoading(true);
    setLoaded(false);
    HttpService.postForm("auth", form)
      .then(
        (response) => {
          let rsp = response;
          modalClose();
          setModal({
            ...modal_data,
            onopen: true,
            onclose: modalClose,
            message: rsp.message,
          });
          console.log("::::", rsp);
        }, //resPonse ends//
        (error) => {
          setModal({
            ...modal_data,
            onopen: true,
            message: error.message,
            onclose: modalClose,
          });
        } //error ends//
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };

  return (
    <React.Fragment>
      <SeoModule
        title="Joevic Choice Properties - Reset Password"
        description="Reset Reset Password"
        name="Joevic Properties"
        type="website"
      />
      <section className="page-main">
        <section className="page-top">
          <div className="page-info">
            <h2>Reset Password </h2>
          </div>
        </section>

        <div className="flex flex-col flex-column justify-content-center align-items-center py20">
          <div className="login-pane">
            {loaded && code_confirmed && (
              <>
                <div className="py10 mb20 good success text-center">
                  {confirmed_message}{" "}
                </div>
                <div className="input iconed">
                  <label>Password</label>
                  <input
                    type="password"
                    name="newpassword"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleInput}
                  />
                  <span className="input-icon">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>

                <div className="input iconed">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="newpassword2"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={handleInput}
                  />
                  <span className="input-icon">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
                <div className="flex flex-row align-items-center">
                  <Button
                    onClick={sendReset}
                    size="large"
                    disabled={loading}
                    variant="contained"
                    type="submit"
                    fullWidth
                  >
                    {loading ? "Working..." : "Change Password"}
                  </Button>
                </div>
              </>
            )}
            {loaded && !code_confirmed && (
              <div className="py10 text-center error">
                <h3>
                  We are having issues confirming your verification.
                  <br />
                  Please reload the page or initiate a fresh password reset
                  request.
                </h3>
              </div>
            )}
          </div>
          <div className="py20 text-center">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </div>

        <CustomModal data={modal_data} />
      </section>
    </React.Fragment>
  );
};

export default ResetPassword;
