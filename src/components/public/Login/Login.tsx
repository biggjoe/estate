import React from "react";
import LoginForm from "./LoginForm";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";
import SeoModule from "../../../services/SeoModule";
import ResendVerify from "../../templates/ResendVerify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  padding: "40px",
  margin: "0 auto",
  textAlign: "center",
  bgcolor: "background.paper",
  minWidth: "280px",
  border: "1px solid #eee",
  borderRadius: "8px",
  transition: "0.3s ease-in-out",
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [response_text, setResponseText] = React.useState<string>("");
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState<any>({
    onopen: false,
    onclose: modalClose,
  });

  const verifyClose = () => {
    setVerify({ ...verify_data, onpen: false });
  };

  const [verify_data, setVerify] = React.useState<any>({
    onopen: false,
    onclose: verifyClose,
  });
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const createMarkup = (text: any) => {
    return { __html: text };
  };

  const doLogin = (data: any) => {
    data.action = "doLogin";
    console.log(data);
    setLoading(true);
    setLoaded(false);
    setResponseText("Loging in....");
    modalClose();
    setModal({
      ...modal_data,
      onopen: true,
      onclose: modalClose,
      message: "Loging in....",
    });
    HttpService.postForm("login", data)
      .then(
        (response) => {
          let rsp = response;
          console.log("::::", rsp);
          const severity =
            rsp.status === 1
              ? "success"
              : rsp.status === 0
              ? "error"
              : rsp.status === 44
              ? "error"
              : "info";
          setModal({
            ...modal_data,
            onopen: true,
            message: rsp.message,
            severity: severity,
            onclose: modalClose,
          });
          if (
            (response.jwt &&
              response.expireAt &&
              response.status === 1 &&
              response.isFound === 1) ||
            response.status === 44
          ) {
            let jwt = rsp.jwt;
            let usr = JSON.stringify(rsp.user);
            localStorage.setItem("user", usr);
            localStorage.setItem("access_token", jwt);
            setResponseText(rsp.message);

            const next_url = "/account/dashboard";
            const redir_delay = response.status === 1 ? 2000 : 3000;
            setTimeout(() => {
              console.log("Redirecting now...");
              window.location.href = next_url;
              setModal({ ...modal_data, onopen: false, onclose: modalClose });
              return;
            }, redir_delay);
          } else if (response.status === 0 && response.isFound === 1) {
            setResponseText(response.message);
          } else if (response.status === 0 && response.to_verify === 1) {
            setVerify({
              ...verify_data,
              user: rsp.user.data,
              onopen: true,
              onclose: verifyClose,
            });
          } else if (response.status === 0 && response.isFound === 0) {
            setResponseText(response.message);
          } else {
            setResponseText(response.message);
          }
        }, //resPonse ends//
        (error) => {
          setResponseText(error.message);
          setModal({
            ...modal_data,
            onopen: true,
            message: error.message,
            severity: "error",
            onclose: modalClose,
          });
          setTimeout(() => {
            modalClose();
          }, 7000);
        } //error ends//
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };
  const items: any = { submit_handler: doLogin, loading: loading };

  return (
    <React.Fragment>
      <SeoModule
        title="Joevic Choice  Properties - Login"
        description="Login Page"
        name="Joevic Choice  Properties"
        type="Real Estate & Properties"
      />
      <section className="page-main">
        <section className="page-top">
          <div className="page-info">
            <h2>Login</h2>
          </div>
        </section>

        <div className="flex flex-col flex-column justify-content-center align-items-center py20">
          <LoginForm {...items} />
        </div>
        <ResendVerify modal={verify_data} />
        <CustomModal data={modal_data} />
      </section>
    </React.Fragment>
  );
};

export default Login;
