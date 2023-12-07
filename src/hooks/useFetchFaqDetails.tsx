import React from "react";
import HttpService from "../services/HttpService";

const useFetchFaqDetails = (props: any) => {
  const { id } = props;
  const [faq, seFaq] = React.useState<any>({});
  const [loading_faq, setLoading] = React.useState(false);
  const [loaded_faq, setLoaded] = React.useState(false);

  /*  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data]; */

  React.useEffect(() => {
    getfaq();
  }, []);

  const getfaq = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("pages", { id: id, mode: "faq-details" })
      .then(
        (result) => {
          setLoading(false);
          if (result.status === 1) {
            seFaq(result);
          } else {
            seFaq({});
          }
        },
        (error) => {
          seFaq({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  return { faq, loading_faq, loaded_faq };
};

export default useFetchFaqDetails;
