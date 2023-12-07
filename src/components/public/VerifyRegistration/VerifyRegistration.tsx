import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";
import SeoModule from "../../../services/SeoModule";
import AuthService from "../../../services/AuthService";

const VerifyRegistration = () => {
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
      mode: "verify-registration",
      code: code,
    })
      .then(
        (response) => {
          let rsp = response;
          console.log("conf code ::::", rsp);
          if (rsp.status === 1) {
            console.log("conf code :::: is confirmed");
            setConfirmed(true);
            setConfirmedMessage(`Your account verified!. Please login and proceed to your dashboard.
               `);
            setForm({ ...form, user: rsp.user.email });
            console.log(code_confirmed);
            AuthService.logout();
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

  return (
    <React.Fragment>
      <SeoModule
        title="Joevic Properties - Verify Registration"
        description="Verify Registration"
        name="Joevic Properties"
        type="News Articles"
      />
      <section className="page-main">
        <section className="page-top">
          <div className="page-info">
            <h2>Verify Registration </h2>
          </div>
        </section>

        <div className="flex flex-col flex-column justify-content-center align-items-center py20">
          <div className="login-pane">
            {loaded && code_confirmed && (
              <>
                <div className="py20 good txt-lg success text-center">
                  {confirmed_message}{" "}
                </div>
              </>
            )}
            {loaded && !code_confirmed && (
              <div className="py20 text-center error  txt-lg">
                <h3>
                  Unfortunately we cannot verify your registration at this
                  moment.
                  <br />
                  Please confirm that you followed the right registration link
                  sent to your email
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

export default VerifyRegistration;
