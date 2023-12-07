import React from "react";
import HttpService from "../services/HttpService";

const useFetchCategories = () => {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loading_categories, setLoading] = React.useState(false);
  const [loaded_categories, setLoaded] = React.useState(false);

  React.useEffect(() => {
    listcategories();
  }, []);

  const listcategories = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post({ mode: "list-categories" }, "properties")
      .then(
        (result) => {
          if (Array.isArray(result)) {
            setCategories(result);
          } else {
            setCategories([]);
          }
        },
        (error) => {
          setCategories([]);
        }
      )
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      }); //fetch
  }; //doAjax

  return { categories, loading_categories, loaded_categories };
};

export default useFetchCategories;
