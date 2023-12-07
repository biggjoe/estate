import React from "react";
const HomeGetApp = () => {
  return (
    <React.Fragment>
      <div className="container get-container">
        <section className="home-get-app">
          <div className="home-get-grid">
            <div className="intro">
              <h2>Get ready, we are launching soon! </h2>
              <p>
                We are also launching our mobile app on major mobile app stores.
                Just watch out for the announcement.
              </p>
              <p>
                You can go to your device store to learn more about Joevic
                Choice Properties
              </p>

              <div className="home-cta">
                <a href="/" className="store">
                  <span className="fa-brands fa-apple brand-icon"></span>
                  <span className="text-part">
                    <span className="labeler">SEE IT ON</span>
                    <span className="brander">APPSTORE</span>
                  </span>
                </a>
                <a href="/" className="store">
                  <span className="fa-brands fa-google-play brand-icon"></span>
                  <span className="text-part">
                    <span className="labeler">SEE IT ON</span>
                    <span className="brander">PLAYSTORE</span>
                  </span>
                </a>
              </div>
              {/**/}
            </div>

            <div className="app">
              <img src="/images/hand-phone.png" alt="homer" />
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default React.memo(HomeGetApp);
