import React from "react";
import HttpService from "../services/HttpService";

const useFetchPage = (props: any) => {
  const { id } = props;
  const [page, setPage] = React.useState<any>({});
  const [loading_page, setLoading] = React.useState(false);
  const [loaded_page, setLoaded] = React.useState(false);

  /*  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data]; */

  React.useEffect(() => {
    listpage();
  }, []);

  const listpage = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post({ id: id, mode: "page-details" }, "pages")
      .then(
        (result) => {
          setLoading(false);
          if (result.status === 1) {
            setPage(result);
          } else {
            setPage({});
          }
        },
        (error) => {
          setPage({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  return { page, loading_page, loaded_page };
};

export default useFetchPage;
