import React from "react";
import HttpService from "../services/HttpService";

const useFetchProperties = (props: any) => {
  const { mode, url, limit, offset } = props;
  const urlx = url ? url : "properties";
  const [properties, setProperties] = React.useState<any[]>([]);
  const [properties_loading, setLoading] = React.useState(false);
  const [properties_loaded, setLoaded] = React.useState(false);

  /*  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data]; */

  React.useEffect(() => {
    listProperties();
  }, []);

  const listProperties = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post({ offset: offset, limit: limit, mode: mode }, urlx)
      .then(
        (result) => {
          setLoading(false);
          if (Array.isArray(result)) {
            setProperties(result);
          } else {
            setProperties([]);
          }
        },
        (error) => {
          setProperties([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  return { properties, properties_loading, properties_loaded };
};

export default useFetchProperties;
