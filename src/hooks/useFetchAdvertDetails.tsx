import React from "react";
import HttpService from "../services/HttpService";

const useFetchAdvertDetails = (props: any) => {
  const { id } = props;
  const [adverts, setAdverts] = React.useState<any>({
    impressions: [],
  });
  const [loading_advert_details, setLoadingDetails] = React.useState(false);
  const [loaded_advert_details, setLoaded] = React.useState(false);
  let load: any = {};

  React.useEffect(() => {
    fetchAdvert();
  }, []);

  const fetchAdvert = () => {
    setLoadingDetails(true);
    setLoaded(false);
    HttpService.post({ id: id, mode: "details" }, "adverts")
      .then(
        (result) => {
          setLoadingDetails(false);
          if (result) {
            setAdverts(result);
          } else {
            setAdverts({ impressions: [] });
            setAdverts({
              title: "advert does not exist",
              content: `The advert you are looking for does not exist. 
              It might not be approved yet, deleted or you typed a wrong advert id.`,
              create_date: new Date().getTime(),
              impressions: [],
            });
          }
        },
        (error) => {
          setAdverts({ impressions: [] });
        }
      )
      .finally(() => {
        setLoadingDetails(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  return { adverts, loading_advert_details, loaded_advert_details };
};

export default useFetchAdvertDetails;
