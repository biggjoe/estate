import React from "react";
import HttpService from "../../../services/HttpService";
import * as processHtml from "../../../services/processHtml";
import PropertiesListTemplate from "../../templates/PropertiesListTemplate";
import PlaceHolder from "../../templates/PlaceHolder";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { CategoryOutlined } from "@mui/icons-material";
const PropertiesCategorySorted = () => {
  const { decodeHtml, truncateWord } = processHtml;
  const [offset, setOffset] = React.useState<number>(0);
  const [properties, setProperties] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    listProperties(offset);
  }, []);

  const listProperties = (offset: number) => {
    setLoading(true);
    setLoaded(false);
    HttpService.post(
      { offset: offset, limit: 12, mode: "category-sorted" },
      "properties"
    )
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (Array.isArray(result)) {
            let newRes = [...properties, ...result];
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

  const navigate = useNavigate();
  const goTo = (url: string) => {
    return navigate(`category/${url}`);
  };
  return (
    <React.Fragment>
      {properties.map((item: any, index: number) => (
        <section className="mb20" key={item.id + index}>
          <h2 className="mb10">
            <CategoryOutlined />{" "}
            <NavLink to={`category/${item.url}`}>{item.title}</NavLink>
          </h2>
          <div className="mb10"></div>
          <PropertiesListTemplate properties={item.properties} />
          <div className="my10"></div>
          <Button
            variant="outlined"
            size="large"
            onClick={() => goTo(item.url)}
          >
            More from {item.title} <i className="fas fa-chevron-right"></i>
          </Button>
          <div className="my20">
            <Divider />
          </div>
        </section>
      ))}
      {loading && (
        <>
          <div className="pxy20">
            <Card className="pxy20">
              <PlaceHolder type="articles" />
              <Divider />
              <PlaceHolder type="articles" />
              <Divider />
              <PlaceHolder type="articles" />
              <Divider />
              <PlaceHolder type="articles" />
            </Card>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default PropertiesCategorySorted;
