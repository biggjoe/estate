import React from "react";
import { Link, NavLink } from "react-router-dom";

const HomeBanner = (props: any) => {
  return (
    <React.Fragment>
      <section className="home-banner">
        <div className="hm-overlay"></div>
        <div className="banner-container">
          <div className="banner-story">
            <h2>Welcome to</h2>
            <h1>Joevic Choice Properties</h1>
            <h2>
              An all inclusive property market where you can buy or sell
              properties securely with approved industry & society standards
            </h2>
            <div className="cta-container">
              <Link className="main-cta" to={`/register`}>
                Become a Joevic Consultant
              </Link>
            </div>
          </div>
          <div className="banner-illustration"></div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default HomeBanner;
