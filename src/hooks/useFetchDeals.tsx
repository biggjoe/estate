import React from "react";
import HttpService from "../services/HttpService";

const useFetchDeals = (props: any) => {
  const { mode, limit, offset } = props;
  const [deals, setDeals] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    listDeals();
  }, []);

  const listDeals = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post({ mode: mode }, "properties")
      .then(
        (result) => {
          console.log(result);
          if (result.status === 1) {
            setDeals(result.data);
          } else {
            setDeals([]);
          }
        },
        (error) => {
          setDeals([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax
  console.log("final deals:: ", deals);
  return { deals, loaded, loading };
};

export default useFetchDeals;
