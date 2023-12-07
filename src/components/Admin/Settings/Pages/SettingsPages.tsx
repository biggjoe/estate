import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import PagesEdit from "./PagesEdit";
import PagesList from "./PagesList";
import PagesView from "./PagesView";
import PagesHomeEdit from "./PagesHomeEdit";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const SettingsPages = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/properties/a/new`);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <React.Fragment>
        <Routes>
          <Route path="" element={<PagesList />} />
          <Route path="/" element={<PagesList />} />
          <Route path="/view" element={<PagesView />} />
          <Route path="/edit-home" element={<PagesHomeEdit />} />
          <Route path="/e/:pageId" element={<PagesEdit />} />
        </Routes>
      </React.Fragment>
    </DndProvider>
  );
};

export default SettingsPages;
