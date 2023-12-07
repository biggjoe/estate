import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Contact from "./Contact/Contact";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import "./Public.css";
import FAQ from "./FAQ/FAQ";
import Privacy from "./Privacy/Privacy";
import About from "./About/About";
import Properties from "./Properties/Properties";
import PropertiesList from "./Properties/PropertiesList";
import PropertiesDetail from "./Properties/PropertiesDetail";
import PropertiesCategory from "./Properties/PropertiesCategory";
import PropertiesCategories from "./Properties/PropertiesCategories";
import Four0Four from "./Four0Four/Four0Four";
import OauthPage from "./Oauth/Oauth";
import Terms from "./Terms/Terms";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ResetPassword from "./ResetPassword/ResetPassword";
import VerifyRegistration from "./VerifyRegistration/VerifyRegistration";
import Media from "./Media/Media";
import Opportunities from "./Opportunities/Opportunities";

const Public = () => {
  const page = useLocation()["pathname"];
  const parts = page.split("/");
  const paths: any = [
    "/",
    "/login",
    "/register",
    "/contact-us",
    "/faq",
    "/privacy-policy",
    "/about-us",
    "/categories",
  ];
  const isPath = paths.indexOf(page) < 0 ? false : true;
  return (
    <React.Fragment>
      {page !== "/" && page !== "" && <Header />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>{" "}
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:code" element={<ResetPassword />}></Route>
        <Route
          path="/verify-registration/:code"
          element={<VerifyRegistration />}
        ></Route>
        <Route path="r" element={<Register />}>
          <Route path=":ref_id" element={<Register />} />
        </Route>
        <Route path="/contact-us" element={<Contact />}></Route>
        <Route path="/faq" element={<FAQ />}></Route>
        <Route path="/privacy-policy" element={<Privacy />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/media" element={<Media />}></Route>
        <Route path="/opportunities" element={<Opportunities />}></Route>
        <Route path="/about-us" element={<About />}></Route>
        <Route path="/properties/*" element={<Properties />}></Route>
        <Route path="/p/*" element={<Properties />}></Route>
        {/* 
        <Route path="/properties/*" element={<PropertiesList />}></Route>
         */}
        <Route path="/oauth-setup/:oauth" element={<OauthPage />}></Route>
        {/*     {!isPath && parts.length === 2 && (
          <Route path="/:url" element={<PropertiesDetail />}></Route>
        )}
        {!isPath && parts.length === 3 && parts[1] === "category" && (
          <Route path="/category/:catUrl" element={<PropertiesCategory />} />
        )} */}
        <Route
          path="*"
          element={
            <>
              <Four0Four />
            </>
          }
        />
      </Routes>
      {page !== "/" && page !== "" && <Footer />}
    </React.Fragment>
  );
};

export default Public;
