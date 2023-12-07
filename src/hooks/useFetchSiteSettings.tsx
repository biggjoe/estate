import React from "react";
import HttpService from "../services/HttpService";

const useFetchSiteSettings = () => {
  const [settings, setSettings] = React.useState<any>({});
  const [loading_settings, setLoading] = React.useState(false);
  const [loaded_settings, setLoaded] = React.useState(false);

  /*  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data]; */

  React.useEffect(() => {
    getSettings();
  }, []);

  const getSettings = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("general", { mode: "site-settings" })
      .then(
        (result) => {
          setLoading(false);
          if (result.status === 1) {
            setSettings(result);
          } else {
            setSettings({});
          }
        },
        (error) => {
          setSettings({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  return { settings, loading_settings, loaded_settings };
};

export default useFetchSiteSettings;
