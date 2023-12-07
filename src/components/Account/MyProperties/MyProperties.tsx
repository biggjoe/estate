import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import MyPropertiesList from "./MyPropertiesList";
import MyPropertiesNew from "./MyPropertiesNew";
import MyPropertiesDetails from "./MyPropertiesDetails";
import MyPropertiesEdit from "./MyPropertiesEdit";
import MyPropertiesPopulate from "./MyPropertiesPopulate";

const MyProperties = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/account/my-properties/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<MyPropertiesList launchNew={launchNew} />} />
        <Route path="/" element={<MyPropertiesList launchNew={launchNew} />} />
        <Route path="/p/:MyPropertiesUrl" element={<MyPropertiesDetails />} />
        <Route path="/a/new" element={<MyPropertiesNew />} />
        <Route
          path="/e/:MyPropertiesUrl"
          element={<MyPropertiesEdit launchNew={launchNew} />}
        />
        <Route path="/po/:propertyUrl" element={<MyPropertiesPopulate />} />
      </Routes>
    </React.Fragment>
  );
};

export default MyProperties;
