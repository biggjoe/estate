import React from "react";
import { Link, useParams } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import * as processHtml from "../../../services/processHtml";
import PropertiesListTemplate from "../../templates/PropertiesListTemplate";
import SeoModule from "../../../services/SeoModule";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import PlaceHolder from "../../templates/PlaceHolder";

const PropertiesList = () => {
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
    HttpService.post({ offset: offset, limit: 120, mode: "all" }, "properties")
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (Array.isArray(result)) {
            //let newRes = [...properties, ...result];
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

  const loadMore = () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    listProperties(newOffset);
  };
  return (
    <React.Fragment>
      <SeoModule
        title={`Joevic Choice  Properties - All Properties`}
        description={`Properties`}
        name="Joevic Choice  Properties"
        type="Properties Properties"
      />{" "}
      <section className="page-bgd">
        <section className="dashboard-pane">
          <div className="pxy0">
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
                      <span>Properties</span>
                    </Breadcrumbs>
                    <h2 className="mt20">Properties</h2>
                  </div>
                </div>
              </div>

              <div className="pxy20">
                {loaded && (
                  <PropertiesListTemplate
                    properties={properties}
                    loading={loading}
                    loaded={loaded}
                  />
                )}
                {loading && <PlaceHolder type="articles" />}
              </div>
            </Card>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};

export default PropertiesList;
