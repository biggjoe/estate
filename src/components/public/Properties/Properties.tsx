import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PropertiesCategory from "./PropertiesCategory";
import PropertiesDetail from "./PropertiesDetail";
import PropertiesList from "./PropertiesList";
const Properties = () => {
  const page = useLocation()["pathname"];
  const parts = page.split("/");

  console.log(page, parts);

  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<PropertiesList />} />
        <Route path="/:url" element={<PropertiesDetail />} />
        <Route path="/c/:catId" element={<PropertiesCategory />} />
        <Route path="/category/:catUrl" element={<PropertiesCategory />} />
      </Routes>
    </React.Fragment>
  );
};

export default Properties;
