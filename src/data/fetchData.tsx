import React from "react";
import HttpService from "../services/HttpService";

function ListStates() {
  const [states, setStates] = React.useState<any[]>([]);
  const ftc = () => {
    HttpService.get("general/fetchStates").then((resp) => {
      setStates(resp);
    }); /**/
  };
  React.useEffect(() => {
    ftc();
  }, []);
  return states;
}

function ListCategories() {
  const [cats, setCats] = React.useState<any[]>([]);
  const ftc = () => {
    HttpService.get("general/listCategories").then((resp) => {
      let cats = [{ label: "Select Cateory", value: "" }];
      for (let i = 0; i < resp.data.length; i++) {
        cats.push({
          label: resp.data[i]["title"],
          value: resp.data[i]["id"],
        });
      }
      setCats(cats);
    }); /**/
  };
  React.useEffect(() => {
    ftc();
  }, []);
  return cats;
}

export { ListStates, ListCategories };
