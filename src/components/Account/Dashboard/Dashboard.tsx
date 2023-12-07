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
              <Link className="grid-card g0" to="/account/my-properties">
                <div className="icon-pane">
                  <i className="fas fa-bank"></i>
                </div>
                <div className="pane-title">My Properties</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g1" to="/account/referral">
                <div className="icon-pane">
                  <i className="fas fa-user-group"></i>
                </div>
                <div className="pane-title">Referrals</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g2" to="/account/transactions">
                <div className="icon-pane">
                  <i className="fas fa-list"></i>
                </div>
                <div className="pane-title">Transactions</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g3" to="/account/withdrawals">
                <div className="icon-pane">
                  <i className="fas fa-credit-card"></i>
                </div>
                <div className="pane-title">Withdrawals</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g3" to="/account/tickets">
                <div className="icon-pane">
                  <i className="fas fa-ticket"></i>
                </div>
                <div className="pane-title">Support Tickets</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g4" to="/account/notifications">
                <div className="icon-pane">
                  <i className="fas fa-bell"></i>
                </div>
                <div className="pane-title">Notifications</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card g5" to="/account/settings">
                <div className="icon-pane">
                  <i className="fas fa-cogs"></i>
                </div>
                <div className="pane-title"> Account Settings</div>
              </Link>
            </Grid>
          </Grid>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;
