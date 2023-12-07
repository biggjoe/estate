import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import AccountTicketDetails from "./TicketDetails";
import AccountTicketList from "./TicketList";
import AccountTicketNew from "./TicketNew";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Add from "@mui/icons-material/Add";
import AccountTicketReply from "./TicketReply";

const Tickets = (props: any) => {
  const navigate = useNavigate();

  const launchNew = (base: any) => {
    return navigate(`${base}tickets/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<AccountTicketList launchNew={launchNew} />} />
        <Route path="/" element={<AccountTicketList launchNew={launchNew} />} />
        <Route
          path="/p/:ticketId"
          element={<AccountTicketDetails launchNew={launchNew} />}
        />
        <Route
          path="/r/:ticketId"
          element={<AccountTicketReply launchNew={launchNew} />}
        />
        <Route path="/a/new" element={<AccountTicketNew />} />
      </Routes>
    </React.Fragment>
  );
};

export default Tickets;
