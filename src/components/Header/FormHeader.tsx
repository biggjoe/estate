import React from "react";
import "./Header.css";
const FormHeader = () => {
  return (
    <React.Fragment>
      <header>
        <div className="logo">
          <a href="/">
            <img src="/images/logo.png" alt="Vault Logo" />
          </a>
        </div>
        <span className="spacer"></span>
      </header>
    </React.Fragment>
  );
};

export default FormHeader;
