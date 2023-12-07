import React from "react";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import TransactionsDetails from "./TransactionsDetails";
import TransactionsList from "./TransactionsList";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import TransactionsNew from "./TransactionsNew";

const Transactions = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/account/transactions/a/new`);
  };
  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py0">
          <Card sx={{ borderRadius: "0" }}>
            <div className="page-head bg-grax">
              <div className="flex flex-row-resp">
                <div className="inline-block pxy20">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Link to={`/account/dashboard`}>Dashboard</Link>
                  </Breadcrumbs>
                  <h2 className="mt20">
                    <i className="fas fa-credit-card"></i> Transactions
                  </h2>
                </div>
              </div>
            </div>
            <Divider />
            <Routes>
              <Route path="" element={<TransactionsList />} />
              <Route path="/" element={<TransactionsList />} />
              <Route path="/p/:tId" element={<TransactionsDetails />} />
              <Route path="/a/new" element={<TransactionsNew />} />
            </Routes>
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Transactions;
