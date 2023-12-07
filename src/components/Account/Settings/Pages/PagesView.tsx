import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Edit from "@mui/icons-material/Edit";
import * as processHtml from "../../../../services/processHtml";

const PagesView = () => {
  const { state } = useLocation();
  console.log(state);
  const { id, name, message } = state;
  let navigate = useNavigate();
  const { decodeHtml, truncateWord } = processHtml;
  const togEdit = () => {
    navigate(`/admin/settings/pages/e/${id}`);
  };
  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py30">
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
                    <Link to="/admin/settings">Settings</Link>
                    <Link to="/admin/settings/pages">Pages</Link>
                    <span>{name}</span>
                  </Breadcrumbs>
                  <h2>{name}</h2>
                </div>
              </div>
            </div>

            <div
              className="flex flex-row border-bottom
            stickied
            align-items-center pxy10"
            >
              <span className="spacer"></span>
              <span>
                <ButtonGroup>
                  <Button variant="outlined" size="small" onClick={togEdit}>
                    <Edit />
                    Edit
                  </Button>
                </ButtonGroup>
              </span>
            </div>

            <div className="pxy20">
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(message),
                }}
              ></div>
            </div>
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default PagesView;
