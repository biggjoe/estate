import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import CategoryDetails from "./CategoryDetails";
import CategoryList from "./CategoryList";
import CategoryEdit from "./CategoryEdit";
import CategoryNew from "./CategoryNew";

const Category = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/categories/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<CategoryList launchNew={launchNew} />} />
        <Route path="/" element={<CategoryList launchNew={launchNew} />} />
        <Route path="/p/:categoryId" element={<CategoryDetails />} />
        <Route path="/a/new" element={<CategoryNew />} />
        <Route
          path="/e/:categoryId"
          element={<CategoryEdit launchNew={launchNew} />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default Category;
