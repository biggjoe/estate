import React from "react";
import HttpService from "../services/HttpService";

const useFetchAdvertSlots = () => {
  const [advert_slots, setSlots] = React.useState<any[]>([]);
  const [loading_advert_slots, setLoadingSlots] = React.useState(false);
  const [loaded_advert_slots, setLoadedSlots] = React.useState(false);

  React.useEffect(() => {
    listadvert_slots();
  }, []);

  const listadvert_slots = () => {
    setLoadingSlots(true);
    setLoadedSlots(false);
    HttpService.post({ mode: "advert_slots" }, "adverts")
      .then(
        (result) => {
          setLoadingSlots(false);
          if (Array.isArray(result)) {
            setSlots(result);
          } else {
            setSlots([]);
          }
        },
        (error) => {
          setSlots([]);
        }
      )
      .finally(() => {
        setLoadingSlots(false);
        setLoadedSlots(true);
      }); //fetch
  }; //doAjax

  return { advert_slots, loading_advert_slots, loaded_advert_slots };
};

export default useFetchAdvertSlots;
