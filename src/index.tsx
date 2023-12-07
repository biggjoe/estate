import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Public from "./components/public/Public";
import Admin from "./components/Admin/Admin";
import Four0Four from "./components/public/Four0Four/Four0Four";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import { initFacebookSdk } from "./services/initFacebookSdk";
import Account from "./components/Account/Account";

declare global {
  interface Window {
    FB?: any;
    fbAsyncInit?: any;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const helmetContext = {};

//initFacebookSdk();

root.render(
  <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Public />} />
            <Route path="/admin//*" element={<Admin />} />
            <Route path="/account//*" element={<Account />} />
            <Route
              path="*"
              element={
                <>
                  <Four0Four />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
