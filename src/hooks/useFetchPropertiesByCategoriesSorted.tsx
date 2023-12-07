import React from "react";
import HttpService from "../services/HttpService";
const useFetchPropertiesByCategorySorted = (props: any) => {
  const { setLoading, limit } = props;
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [news, setProperties] = React.useState<any[]>([]);

  React.useEffect(() => {
    listProperties();
  }, []);

  const listProperties = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post(
      { offset: 0, limit: limit, mode: "category-sorted" },
      "news"
    )
      .then(
        (result) => {
          setLoading(false);
          if (Array.isArray(result)) {
            let newRes = [...news, ...result];
            setProperties(newRes);
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
        setLoaded(false);
      }); //fetch
  }; //doAjax

  return news;
};

export default useFetchPropertiesByCategorySorted;
