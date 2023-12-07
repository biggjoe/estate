import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import WithdrawList from "./WithdrawList";
import WithdrawDetails from "./WithdrawDetails";

const Widthdraw = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/properties/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<WithdrawList />} />
        <Route path="/" element={<WithdrawList />} />
        <Route path="/e/:wId" element={<WithdrawDetails />} />
      </Routes>
    </React.Fragment>
  );
};

export default Widthdraw;
