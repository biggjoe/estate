import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";
import SeoModule from "../../../services/SeoModule";

const ForgotPassword = () => {
  console.log(window);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [response_text, setResponseText] = React.useState<string>("");
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState<any>({
    onopen: false,
    onclose: modalClose,
  });
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = React.useState<any>({});
  const handleInput = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };

  const sendReset = (data: any) => {
    setForm({ ...form, mode: "forgot-password" });
    console.log(form);
    if (!form.email || form.email === "") {
      return alert("Please supply your email");
    }
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
          console.log("Response::::", rsp);
        }, //resPonse ends//
        (error) => {
          console.log("Error::::", error);
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
        title="Joevic Properties - Forgot Password"
        description="Reset Forgotten Password"
        name="Joevic Properties"
        type="News Articles"
      />
      <section className="page-main">
        <section className="page-top">
          <div className="page-info">
            <h2>Forgot Password</h2>
          </div>
        </section>

        <div className="flex flex-col flex-column justify-content-center align-items-center py20">
          <div className="login-pane">
            <div className="input iconed">
              <label>Enter your registered email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={handleInput}
              />
              <span className="input-icon">
                <i className="fas fa-user"></i>
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
                {loading ? "Working..." : "Reset Password"}
              </Button>
            </div>
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

export default ForgotPassword;
