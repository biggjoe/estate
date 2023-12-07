import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from "@mui/material/Card";

import * as processHtml from "../../../services/processHtml";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import SeoModule from "../../../services/SeoModule";
import HttpService from "../../../services/HttpService";

const FAQ = () => {
  const [faqs, setFaq] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const { decodeHtml, truncateWord } = processHtml;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    listfaqs();
  }, []);

  const listfaqs = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post({ mode: "all-faqs" }, "pages")
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (Array.isArray(result)) {
            setFaq(result);
          } else {
            setFaq([]);
          }
        },
        (error) => {
          setFaq([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <React.Fragment>
      <SeoModule
        title="Joevic Choice  Properties - Frequently Asked Questions"
        description="Frequently Asked Questions"
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
                    <span>FAQ</span>
                  </Breadcrumbs>
                  <h2 className="mt20">Frequently Asked Questions</h2>
                </div>
              </div>
            </div>

            <div className="pxy20">
              {faqs.map((item: any, index: number) => (
                <Accordion
                  key={item.id}
                  expanded={expanded === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={`panel${index}a-header`}
                  >
                    <div>
                      <h3>{item.question}</h3>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      className="properties-summary"
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(item.answer),
                      }}
                    ></div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default FAQ;
