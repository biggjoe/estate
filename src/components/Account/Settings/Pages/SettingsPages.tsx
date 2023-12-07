import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import PagesEdit from "./PagesEdit";
import PagesList from "./PagesList";
import PagesView from "./PagesView";

const SettingsPages = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/properties/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<PagesList />} />
        <Route path="/" element={<PagesList />} />
        <Route path="/view" element={<PagesView />} />
        <Route path="/e/:pageId" element={<PagesEdit />} />
      </Routes>
    </React.Fragment>
  );
};

export default SettingsPages;
