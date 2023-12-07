import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Add from "@mui/icons-material/Add";
import AdvertsDetails from "./AdvertsDetails";
import AdvertsNew from "./AdvertsNew";
import AdvertsList from "./AdvertsList";
import AdvertsEdit from "./AdvertsEdit";

const Adverts = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/adverts/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<AdvertsList launchNew={launchNew} />} />
        <Route path="/" element={<AdvertsList launchNew={launchNew} />} />
        <Route path="/p/:advertId" element={<AdvertsDetails />} />
        <Route path="/a/new" element={<AdvertsNew />} />
        <Route
          path="/e/:advertId"
          element={<AdvertsEdit launchNew={launchNew} />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default Adverts;
