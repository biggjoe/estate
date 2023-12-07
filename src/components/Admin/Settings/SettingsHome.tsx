import React from "react";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";

export default function SettingsHome() {
  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py30">
          <div className="page-head bg-grax">
            <div className="flex flex-row-resp">
              <div className="inline-block pxy20">
                <Avatar
                  src="/images/logo.png"
                  sx={{ width: "80px", height: "80px" }}
                />{" "}
                <h2>Site Settings</h2>
              </div>
            </div>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <div className="pt30 pb10">
                <Divider />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card bgx" to="/admin/settings/pages">
                <div className="icon-pane">
                  <i className="fas fa-newspaper"></i>
                </div>
                <div className="pane-title">Pages</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card bg-grax" to="/admin/settings/faq">
                <div className="icon-pane">
                  <i className="fas fa-question-circle"></i>
                </div>
                <div className="pane-title">FAQ</div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link className="grid-card bga" to="/admin/settings/site">
                <div className="icon-pane">
                  <i className="fas fa-cogs"></i>
                </div>
                <div className="pane-title">Site Settings</div>
              </Link>
            </Grid>
          </Grid>
        </div>
      </section>
    </React.Fragment>
  );
}
