import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import SiteEdit from "./SiteEdit";
import SiteList from "./SiteList";

const SettingsSite = (props: any) => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<SiteList />} />
        <Route path="/" element={<SiteList />} />
        <Route path="/edit" element={<SiteEdit />} />
      </Routes>
    </React.Fragment>
  );
};

export default SettingsSite;
