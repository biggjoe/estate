import React from "react";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import SeoModule from "../../../services/SeoModule";
import useFetchPage from "../../../hooks/useFetchPage";
import * as processHtml from "../../../services/processHtml";

const Opportunities = () => {
  const { decodeHtml, truncateWord } = processHtml;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { page, loaded_page, loading_page } = useFetchPage({ id: 1 });
  return (
    <React.Fragment>
      <SeoModule
        title="Joevic Choice  Properties - About Us"
        description="About Us"
        name="Joevic Choice  Properties"
        type="Real Estate & Properties"
      />
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
                    <Link to="/">Home</Link>
                    <span>{page.name}</span>
                  </Breadcrumbs>
                  <h2 className="mt20">{page.name}</h2>
                </div>
              </div>
            </div>

            <div className="pxy20">
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(page.message),
                }}
              ></div>
            </div>
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Opportunities;
