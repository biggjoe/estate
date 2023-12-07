import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import DealsList from "./DealsList";
import DealsNew from "./DealsNew";
import DealsDetails from "./DealsDetails";
import DealsEdit from "./DealsEdit";

const Deals = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/deals/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<DealsList launchNew={launchNew} />} />
        <Route path="/" element={<DealsList launchNew={launchNew} />} />
        <Route path="/p/:pId" element={<DealsDetails />} />
        <Route path="/a/new" element={<DealsNew />} />
        <Route path="/e/:pId" element={<DealsEdit launchNew={launchNew} />} />
      </Routes>
    </React.Fragment>
  );
};

export default Deals;
