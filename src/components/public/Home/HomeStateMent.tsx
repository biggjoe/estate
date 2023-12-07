import React from "react";
const HomeStatement = () => {
  return (
    <React.Fragment>
      <section className="home-understand">
        <div className="starter">
          <h2>
            We assure you of secured and stress-free property transactions
          </h2>
        </div>
        <div className="container">
          <div className="under-grider">
            <div className="card">
              <div className="under-packer">
                <div className="feature-icon">
                  <img src="/images/undraw_savings.svg" alt="Feature1" />
                </div>
                <p>
                  Saving has been made easy with us. Save with easy and see your
                  account grow exponentially
                </p>
              </div>
            </div>

            <div className="card">
              <div className="under-packer">
                <div className="feature-icon">
                  <img src="/images/undraw_investing.svg" alt="Feature1" />
                </div>
                <p>
                  Saving has been made easy with us. Save with easy and see your
                  account grow exponentially
                </p>
              </div>
            </div>

            <div className="card">
              <div className="under-packer">
                <div className="feature-icon">
                  <img src="/images/undraw_investing.svg" alt="Feature1" />
                </div>
                <p>
                  Saving has been made easy with us. Save with easy and see your
                  account grow exponentially
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default React.memo(HomeStatement);
