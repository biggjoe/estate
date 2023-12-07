import React from "react";
import { Routes, Route } from "react-router-dom";
import FaqEdit from "./FaqEdit";
import FaqList from "./faqList";
import FaqNew from "./FaqNew";

const SettingsFaq = (props: any) => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<FaqList />} />
        <Route path="/" element={<FaqList />} />
        <Route path="/a/new" element={<FaqNew />} />
        <Route path="/e/:faqId" element={<FaqEdit />} />
      </Routes>
    </React.Fragment>
  );
};

export default SettingsFaq;
