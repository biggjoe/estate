import React from "react";
import { NavLink } from "react-router-dom";
import HttpService from "../../services/HttpService";
import * as processHtml from "../../services/processHtml";
import "./Footer.css";
const Footer = () => {
  const { decodeHtml, truncateWord } = processHtml;
  const [offset, setOffset] = React.useState<number>(0);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const footer_message = `Property Sellers`;
  React.useEffect(() => {
    listCategories(offset);
  }, []);

  const listCategories = (offset: number) => {
    setLoading(true);
    setLoaded(false);
    HttpService.post(
      { offset: offset, limit: 120, mode: "list-categories-grouped" },
      "properties"
    )
      .then(
        (result) => {
          setLoading(false);
          console.log("FOOTER:: ", result);
          if (Array.isArray(result)) {
            setCategories(result);
          } else {
            setCategories([]);
          }
        },
        (error) => {
          setCategories([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  const loadMore = () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    listCategories(newOffset);
  };
  return (
    <React.Fragment>
      <footer className="footer">
        <div className="container">
          <div className="footer-wrapper">
            <div className="col-block px20 spacer">
              <div className="specimen">
                <div className="imager">
                  <img src="/images/logo2.png" alt="Footer Logo" />
                </div>
              </div>
              <div className="desc">
                <p>{footer_message}</p>
              </div>
            </div>
            {categories.map((item: any, index: number) => (
              <div className="col-block" key={index + 1}>
                <ul>
                  {categories[index].map((itx: any, i: number) => (
                    <li key={itx.id}>
                      <NavLink to={`/category/${itx.url}`}>{itx.title}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-block">
              <ul>
                <li>
                  <NavLink to="/about-us">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/contact-us">Contact Us</NavLink>
                </li>
                <li>
                  <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                </li>
                <li>
                  <NavLink to="/terms">Terms of Service</NavLink>
                </li>
                <li>
                  <NavLink to="/faq">Frequently Asked Questions</NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="social-brands">
            <div>Find Us:</div>
            <NavLink to="/">
              <i className="fa-brands fa-youtube"></i>
            </NavLink>
            <NavLink to="/">
              <i className="fa-brands fa-twitter"></i>
            </NavLink>
            <NavLink to="/">
              <i className="fa-brands fa-facebook"></i>
            </NavLink>
            <NavLink to="/">
              <i className="fa-brands fa-instagram"></i>
            </NavLink>
          </div>

          <div className="terms-policy">
            <p>&copy; 2023 Joevic Choice Properties</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
