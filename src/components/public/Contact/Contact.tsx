import React from "react";
import { Link } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";
import { DefaultEditor } from "react-simple-wysiwyg";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import useFetchPage from "../../../hooks/useFetchPage";
import * as processHtml from "../../../services/processHtml";
import SeoModule from "../../../services/SeoModule";

const Contact = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<string>("");
  const [meta, setMeta] = React.useState<any>({});
  const onToastClose = () => {
    setToast({ onopen: false, onclose: onToastClose });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });

  const { decodeHtml, truncateWord } = processHtml;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { page, loaded_page, loading_page } = useFetchPage({ id: 4 });
  const handleInput = React.useCallback(
    (event: any) => {
      const targ = event.target;
      const name = targ.name;
      const value = targ.value;
      console.log(name, value);
      setMeta({ ...meta, [name]: value });
      console.log(meta);
    },
    [meta]
  );

  const onHtmlChange = (e: any) => {
    setContent(e.target.value);
    console.log(content);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const obj: any = { ...meta, message: content, mode: "contact-us" };
    console.log(obj);
    setLoading(true);
    setLoaded(false);
    HttpService.postForm("contact-us", obj)
      .then(
        (resp) => {
          console.log(resp);
          setToast({ ...toast, onopen: true, message: resp.message });
          if (resp.status === 1) {
            setTimeout(() => {
              setToast({ ...toast, onopen: false });
            }, 3000);
          }
        },
        (error) => {
          setToast({ ...toast, onopen: true, message: error.message });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postTicket
  };

  return (
    <React.Fragment>
      <SeoModule
        title="Joevic Choice  Properties - Contact Us"
        description="Our contact details"
        name="Joevic Choice  Properties"
        type="New Articles"
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
              <div className="map-area">
                <div className="google-map-code">
                  <iframe
                    src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    aria-hidden="false"
                  ></iframe>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(page.message),
                }}
              ></div>

              <div className="px20">
                <div className="py20">
                  <Divider>
                    <Chip label="LEAVE US A MESSAGE" />
                  </Divider>
                </div>
                <section className="pt20">
                  <div className="card">
                    <div className="input iconed">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your full name"
                        onChange={handleInput}
                      />
                      <span className="input-icon">
                        <i className="fas fa-at"></i>
                      </span>
                    </div>

                    <div className="input iconed">
                      <label>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone number"
                        onChange={handleInput}
                      />
                      <span className="input-icon">
                        <i className="fas fa-phone"></i>
                      </span>
                    </div>

                    <div className="input iconed">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email address"
                        onChange={handleInput}
                      />
                      <span className="input-icon">
                        <i className="fas fa-phone"></i>
                      </span>
                    </div>

                    <div className="mb10">
                      <DefaultEditor
                        className="form-control"
                        value={content}
                        placeholder="Write Message details"
                        onChange={onHtmlChange}
                      />
                    </div>

                    <div className="input-button">
                      <Button
                        onClick={handleSubmit}
                        size="large"
                        disabled={loading}
                        variant="contained"
                        type="submit"
                      >
                        {loading ? "Working..." : "Send Message"}
                      </Button>
                    </div>
                  </div>
                  {/*login-pane */}
                </section>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Contact;
