import React from "react";
import { Link, useParams } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import * as processHtml from "../../../services/processHtml";
import PropertiesListTemplate from "../../templates/PropertiesListTemplate";
import SeoModule from "../../../services/SeoModule";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import PlaceHolder from "../../templates/PlaceHolder";

const PropertiesCategory = () => {
  let params: any = useParams();
  const { decodeHtml, truncateWord } = processHtml;
  const [offset, setOffset] = React.useState<number>(0);
  const [properties, setProperties] = React.useState<any>({ data: [] });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isParam, setParam] = React.useState(false);
  const [catUrl, setCatUrl] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    console.log("::params::", params);
    const isParam = params.catUrl ? true : false;
    setParam(isParam);
    if (isParam) {
      setCatUrl(params.catUrl);
      listProperties(params.catUrl, 0);
    }
  }, [params]);
  const listProperties = (cat_url: any, offset: number) => {
    setLoading(true);
    setLoaded(false);
    HttpService.post(
      { offset: offset, limit: 120, cat_url: cat_url, mode: "category" },
      "properties"
    )
      .then(
        (result) => {
          setLoading(false);
          console.log("CAT_RESULT:::: ", result);
          if (result) {
            setProperties(result);
          } else {
            setProperties({ data: [] });
          }
        },
        (error) => {
          setProperties({ data: [] });
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
    listProperties(catUrl, newOffset);
  };
  return (
    <React.Fragment>
      <SeoModule
        title={`Joevic Choice  Properties - ${
          properties.meta?.title || "Property Category"
        }`}
        description={`${properties.meta?.title || "Property Category"}`}
        name="Joevic Choice  Properties"
        type="Properties"
      />
      <section className="page-bgd">
        <section className="dashboard-pane">
          <div className=" px20 py10">
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
                      <span>
                        {properties.meta?.title || "Property Category"}
                      </span>
                    </Breadcrumbs>
                    <h2 className="mt20">
                      {properties.meta?.title || "Property Category"}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="pxy20">
                {loaded && (
                  <PropertiesListTemplate
                    properties={properties.data}
                    loading={loading}
                    loaded={loaded}
                  />
                )}
                {loading && (
                  <div className="pxy20">
                    <PlaceHolder type="articles" />
                    <Divider />
                    <PlaceHolder type="articles" />
                    <Divider />
                    <PlaceHolder type="articles" />
                    <Divider />
                    <PlaceHolder type="articles" />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};

export default PropertiesCategory;
