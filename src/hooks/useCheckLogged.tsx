import React from "react";
import HttpService from "../services/HttpService";

const useCheckLogged = () => {
  const [is_logged, setLogged] = React.useState(false);
  const [checking_logged, setCheckingLogged] = React.useState(false);
  const [checked_logged, setCheckedLogged] = React.useState(false);

  React.useEffect(() => {
    check();
  }, []);

  const check = () => {
    setCheckingLogged(false);
    setCheckedLogged(false);
    HttpService.getHeader("checkSession")
      .then(
        (res) => {
          if (!res.status || res.status === 0) {
            setLogged(true);
          } else {
            setLogged(false);
          }
        },
        (error) => {
          setLogged(false);
        }
      )
      .finally(() => {
        setCheckingLogged(false);
        setCheckedLogged(true);
      });
  };

  return { is_logged, checking_logged, checked_logged };
};

export default useCheckLogged;
