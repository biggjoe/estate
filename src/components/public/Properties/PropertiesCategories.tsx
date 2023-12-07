import React from "react";
import { Link, useParams } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import * as processHtml from "../../../services/processHtml";
import PropertiesListTemplate from "../../templates/PropertiesListTemplate";
import PlaceHolder from "../../templates/PlaceHolder";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
const PropertiesCategories = () => {
  const { decodeHtml, truncateWord } = processHtml;
  const [offset, setOffset] = React.useState<number>(0);
  const [properties, setProperties] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    listProperties(offset);
  }, []);

  const listProperties = (offset: number) => {
    setLoading(true);
    setLoaded(false);
    HttpService.post({ offset: offset, limit: 12, mode: "all" }, "properties")
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
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const loadMore = () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    listProperties(newOffset);
  };
  return (
    <React.Fragment>
      <section className="page-bgd">
        <section className="dashboard-pane">
          <div className="px20 py10">
            <Card sx={{ borderRadius: "0" }}>
              <div className="page-head bg-grax">
                <div className="flex flex-row-resp">
                  <div className="inline-block pxy20">
                    <Breadcrumbs
                      aria-label="breadcrumb"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Link to="/">Home</Link>
                      <Link to="/properties">Properties</Link>
                    </Breadcrumbs>
                    <h2 className="mt20">{"Property Categories"}</h2>
                  </div>
                </div>
              </div>

              <div className="container py30"> {/*  <HomeCategories /> */}</div>

              <div className="section-intro">
                <h2>Recent Properties</h2>
              </div>
              <PropertiesListTemplate
                properties={properties}
                loading={loading}
                loaded={loaded}
              />
              {loading && (
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
              )}
            </Card>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};

export default PropertiesCategories;
