import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import SeoModule from "../../../services/SeoModule";
import HomeCats from "./HomeCats";
import useFetchCategories from "../../../hooks/useFetchCategories";
import "./Home.css";
import Grid from "@mui/material/Grid";
import PropertiesFeatured from "../Properties/PropertiesFeatured";
import PropertiesHighlighted from "../Properties/PropertiesHighlighted";
import HomeDeals from "./HomeDeals";
import HomeBanner from "./HomeBanner";
import HomeGetApp from "./HomeGetApp";
import HomeStateMent from "./HomeStateMent";
import HomeStats from "./HomeStats";

const Home = () => {
  const { categories, loading_categories, loaded_categories } =
    useFetchCategories();
  const [home_loaded, setHomeLoaded] = React.useState(false);
  React.useEffect(() => {
    setHomeLoaded(true);
  }, []);
  const blocks = ["1", "2", "3", "4", "5"];
  return (
    <React.Fragment>
      <SeoModule
        title="Joevic Choice  Properties - Home"
        description="Home curated news from across the globe"
        name="Joevic Choice  Properties"
        page_url={process.env.REACT_APP_SERVER_DOMAIN}
        page_image={process.env.REACT_APP_SERVER_DOMAIN + "images/logo.png"}
        type="Properties & Info"
      />
      <Header />
      <HomeBanner />
      {/*       <section className="home-main">
        <div className="home-banner">
          <Grid
            container
            rowSpacing={0}
            columnSpacing={0.5}
            sx={{ display: "flex", flexGrow: "1", alignContent: "stretch" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={2.5}
              sx={{ display: "flex", flexGrow: "1" }}
            >
              <div
                style={{
                  display: "flex",
                  flexGrow: "1",
                }}
              >
                {loaded_categories && (
                  <ul className="top-cats">
                    {categories.map((item: any, index: number) => (
                      <li key={item.id}>
                        <Link to={`/category/${item.url}`}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}

                {!loaded_categories && (
                  <ul className="top-cats">
                    <li className="loading-bars"></li>
                    <li className="loading-bars"></li>
                    <li className="loading-bars"></li>
                    <li className="loading-bars"></li>
                    <li className="loading-bars"></li>
                    <li className="loading-bars"></li>
                  </ul>
                )}
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6.5}
              sx={{ display: "flex", flexGrow: "1" }}
            >
              <div className="highlighted-container">
                <PropertiesHighlighted />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              sx={{ display: "flex", flexGrow: "1" }}
            >
              <PropertiesFeatured />
            </Grid>
          </Grid>
        </div>
      </section> */}
      <HomeStateMent />
      {home_loaded && <HomeCats />}
      <HomeGetApp />

      <HomeStats />

      <Footer />
    </React.Fragment>
  );
};

export default Home;
