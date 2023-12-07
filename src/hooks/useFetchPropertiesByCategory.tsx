import React from "react";
import HttpService from "../services/HttpService";
const useFetchPropertiesByCategory = (props: any) => {
  const { limit, cat_url } = props;
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loading_news, setLoading] = React.useState(false);
  const [loaded_news, setLoaded] = React.useState(false);
  const [news, setProperties] = React.useState<any[]>([]);

  React.useEffect(() => {
    listProperties();
  }, []);

  const listProperties = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post(
      { offset: 0, limit: 12, cat_url: cat_url, mode: "category" },
      "news"
    )
      .then(
        (result) => {
          console.log(result);
          if (Array.isArray(result)) {
            let newRes = [...news, ...result];
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

  return { news, loading_news, loaded_news };
};

export default useFetchPropertiesByCategory;
