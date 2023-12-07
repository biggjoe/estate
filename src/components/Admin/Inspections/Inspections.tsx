import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import InspectionsList from "./InspectionsList";
import InspectionsDetail from "./InspectionsDetail";

const Inspections = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/Inspections/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<InspectionsList launchNew={launchNew} />} />
        <Route path="/" element={<InspectionsList launchNew={launchNew} />} />
        <Route path="/p/:eId" element={<InspectionsDetail />} />
      </Routes>
    </React.Fragment>
  );
};

export default Inspections;
