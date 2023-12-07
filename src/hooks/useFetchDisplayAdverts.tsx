import React from "react";
import HttpService from "../services/HttpService";

const useFetchDisplayAdverts = (props: any) => {
  const { limit, offset } = props;
  const [adverts, setAdverts] = React.useState<any[]>([]);
  const [loading_adverts, setLoadingAdverts] = React.useState(false);
  const [loaded_adverts, setLoadedAdverts] = React.useState(false);

  React.useEffect(() => {
    listadverts();
  }, []);

  const listadverts = () => {
    setLoadingAdverts(true);
    setLoadedAdverts(false);
    HttpService.post({ slot_data: props, mode: "display_advert" }, "adverts")
      .then(
        (result) => {
          setLoadingAdverts(false);
          if (Array.isArray(result)) {
            setAdverts(result);
          } else {
            setAdverts([]);
          }
        },
        (error) => {
          setAdverts([]);
        }
      )
      .finally(() => {
        setLoadingAdverts(false);
        setLoadedAdverts(true);
      }); //fetch
  }; //doAjax

  return { adverts, loading_adverts, loaded_adverts };
};

export default useFetchDisplayAdverts;
