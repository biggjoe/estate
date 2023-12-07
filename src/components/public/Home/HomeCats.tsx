import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import PropertiesListTemplate from "../../templates/PropertiesListTemplate";
import PlaceHolder from "../../templates/PlaceHolder";
import useFetchCategories from "../../../hooks/useFetchCategories";
import useFetchProperties from "../../../hooks/useFetchProperties";

const HomeCats = (props: any) => {
  const [loading_properties, setLoading] = React.useState(true);
  const [un_tabbed, setUntabbed] = React.useState(true);
  const [tab, setTab] = React.useState<number>(0);
  const [offset, setOffset] = React.useState<number>(0);
  //const [properties, setProperties] = React.useState<any>({ data: [] });
  const [loaded_properties, setLoaded] = React.useState<boolean>(false);
  const { categories, loading_categories, loaded_categories } =
    useFetchCategories();

  const { properties, properties_loaded, properties_loading } =
    useFetchProperties({
      limit: 8,
      offset: 0,
      mode: "all",
    });
  console.log("properties:: ", properties);
  React.useEffect(() => {
    if (loaded_categories && un_tabbed) {
      categories.unshift({ title: "Recent Properties", url: "all", id: 0 });
    }
  }, []);

  const styles = {
    backgroundImage:
      tab === 0 ? "url(/images/main-home.webp)" : "url(/images/girly.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const navigate = useNavigate();
  const goTo = (url: string) => {
    return navigate(`category/${url}`);
  };

  const [cat_togged, setCatTog] = React.useState<boolean>(false);
  const [active_cat, setActiveCat] = React.useState<string>("All");
  const togCat = () => {
    setCatTog(!cat_togged);
  };

  const setActive = (index: number) => {
    setTab(index);
    setActiveCat(categories[index]["title"]);
    setCatTog(!cat_togged);
    setUntabbed(false);
  };

  const togSearch = () => {};

  return (
    <React.Fragment>
      <section className="page-bgd">
        <ul className="home-category-bar">
          <div className="active-lane">
            <Link to={"#"}>Recent Properties</Link>
            <span className="spacer"></span>
            <Link to={"#"} onClick={togSearch}>
              <i className="fas fa-search"></i>
            </Link>
          </div>
        </ul>
        <div className="py30 home-container">
          {properties_loaded && (
            <PropertiesListTemplate
              loading={properties_loading}
              loaded={properties_loaded}
              properties={properties}
              max_grid={3}
              show_count={false}
            />
          )}
          {properties_loading && <PlaceHolder type="articles" />}
        </div>
      </section>
    </React.Fragment>
  );
};

export default HomeCats;
