import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import PropertiesList from "./PropertiesList";
import PropertiesNew from "./PropertiesNew";
import PropertiesDetails from "./PropertiesDetails";
import PropertiesEdit from "./PropertiesEdit";
import PropertiesPopulate from "./PropertiesPopulate";

const Properties = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/properties/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<PropertiesList launchNew={launchNew} />} />
        <Route path="/" element={<PropertiesList launchNew={launchNew} />} />
        <Route path="/p/:propertiesUrl" element={<PropertiesDetails />} />
        <Route path="/a/new" element={<PropertiesNew />} />
        <Route
          path="/e/:propertiesUrl"
          element={<PropertiesEdit launchNew={launchNew} />}
        />
        <Route path="/po/:propertyUrl" element={<PropertiesPopulate />} />
      </Routes>
    </React.Fragment>
  );
};

export default Properties;
