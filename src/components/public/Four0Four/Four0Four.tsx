import React from "react";
import "./Four0Four.css";
const Four0Four = () => {
  return (
    <React.Fragment>
      <section className="four-o-four">
        <h1>!404</h1>
        <h2>The page you are looking for does not exist!</h2>
        <h3>You may have mis typed the address or the page may have moved</h3>
        <div>
          <a className="go-home" href="/">
            Go Home
          </a>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Four0Four;
