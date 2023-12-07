import React from "react";
import AuthService from "../../../services/AuthService";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { CategoryOutlined, LiveTvOutlined } from "@mui/icons-material";
const usr = AuthService.getCurrentUser();
const Dashboard = () => {
  const [opts, setOpts] = React.useState<any>({
    balance: usr.balance,
    total_accounts: usr.total_accounts,
    deposits: usr.deposits,
    cards: usr.cards,
  });
  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="z-high container py30">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g1" to="/admin/properties">
                <div className="icon-pane">
                  <i className="fas fa-bank"></i>
                </div>
                <div className="pane-title">Properties</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g2" to="/admin/categories">
                <div className="icon-pane">
                  <CategoryOutlined className="fas" />
                </div>
                <div className="pane-title">Categories</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g3" to="/admin/withdrawals">
                <div className="icon-pane">
                  <i className="fas fa-credit-card"></i>
                </div>
                <div className="pane-title">Withdrawals</div>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g3" to="/admin/inspections">
                <div className="icon-pane">
                  <i className="fas fa-binoculars"></i>
                </div>
                <div className="pane-title">Inspections</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g4" to="/admin/users">
                <div className="icon-pane">
                  <i className="fas fa-user-group"></i>
                </div>
                <div className="pane-title">Users</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g5" to="/admin/tickets">
                <div className="icon-pane">
                  <i className="fas fa-ticket"></i>
                </div>
                <div className="pane-title">Support Tickets</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g6" to="/admin/settings">
                <div className="icon-pane">
                  <i className="fas fa-cogs"></i>
                </div>
                <div className="pane-title">Settings</div>
              </Link>
            </Grid>
          </Grid>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
