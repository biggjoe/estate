import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Add from "@mui/icons-material/Add";
import StaffDetails from "./StaffDetails";
import StaffNew from "./StaffNew";
import StaffList from "./StaffList";
import StaffCategory from "./StaffCategory";
import StaffEdit from "./StaffEdit";

const Staff = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/staff/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<StaffList launchNew={launchNew} />} />
        <Route path="/" element={<StaffList launchNew={launchNew} />} />
        <Route path="/p/:staffId" element={<StaffDetails />} />
        <Route path="/c/:staffCat" element={<StaffCategory />} />
        <Route path="/a/new" element={<StaffNew />} />
        <Route
          path="/e/:staffId"
          element={<StaffEdit launchNew={launchNew} />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default Staff;
