import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Add from "@mui/icons-material/Add";
import UsersDetails from "./UsersDetails";
import UsersNew from "./UsersNew";
import UsersList from "./UsersList";
import UsersCategory from "./UsersCategory";
import UsersEdit from "./UsersEdit";

const Users = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/users/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<UsersList launchNew={launchNew} />} />
        <Route path="/" element={<UsersList launchNew={launchNew} />} />
        <Route path="/p/:userId" element={<UsersDetails />} />
        <Route path="/c/:usersCat" element={<UsersCategory />} />
        <Route path="/a/new" element={<UsersNew />} />
        <Route
          path="/e/:userId"
          element={<UsersEdit launchNew={launchNew} />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default Users;
