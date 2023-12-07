import React from "react";
import HttpService from "../services/HttpService";

const useFetchPropertiesDetails = (props: any) => {
  const { type, data } = props;
  const [news, setProperties] = React.useState<any>({
    related_news: [],
  });
  const [loading_news, setLoading] = React.useState(false);
  const [loaded_news, setLoaded] = React.useState(false);
  let load: any = {};
  if (type === "id") {
    load = { id: data, mode: "details" };
  } else if (type === "url") {
    load = { url: data, mode: "details" };
  }

  React.useEffect(() => {
    fetchnews();
  }, []);

  const fetchnews = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post(load, "news")
      .then(
        (result) => {
          setLoading(false);
          if (result.status === 1) {
            setProperties(result.data);
          } else {
            setProperties({ related_news: [] });
          }
        },
        (error) => {
          setProperties({ related_news: [] });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  return { news, loading_news, loaded_news };
};

export default useFetchPropertiesDetails;
