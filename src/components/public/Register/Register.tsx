import React from "react";
import HttpService from "../../../services/HttpService";
import RegisterForm from "./RegisterForm";
import { useParams, useLocation, Link } from "react-router-dom";

function Register() {
  const [ref_data, setRefData] = React.useState<any>({ is_ref: false });
  let params = useParams();
  console.log(params);
  const location = useLocation();
  const [isParam, setParam] = React.useState(false);
  const pageName = location.pathname;

  React.useEffect(() => {
    const isParam = params.ref_id ? true : false;
    setParam(isParam);
    if (isParam) {
      getRef(params.ref_id);
      setRefData({ ...ref_data, is_ref: true, ref_id: params.ref_id });
    }
  }, [params]); //componentDidMount

  const getRef = (rid: any) => {
    //console.log(rid);
    HttpService.postForm("r/fetch_ref", { ref_id: rid }).then((resp) => {
      console.log("Fetched :: ", resp);
      if (resp.status === 1 && resp.data) {
        let rd = resp.data;
        rd.is_ref = true;
        setRefData({ ...ref_data, ...rd });
      }
    });
  };

  return (
    <React.Fragment>
      <section className="page-main">
        <section className="page-top">
          <div className="page-info">
            <h2>User Regsistration</h2>
          </div>
        </section>

        <div className="flex flex-col flex-column justify-content-center align-items-center py20">
          <div className="login-pane">
            <RegisterForm ref_data={ref_data} />
          </div>
          <div className="py20 text-center">
            Already registered? <Link to="/login">Login here</Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Register;
