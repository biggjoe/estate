import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const MobileNav = (props: any) => {
  const { isLogged, toggleNav, doLogout, categories } = props;

  return (
    <>
      <ul className="mobile-nav">
        <li>
          <Link onClick={toggleNav} to="/">
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link onClick={toggleNav} to="/about-us">
            <span>About</span>
          </Link>
        </li>

        <li>
          <Link onClick={toggleNav} to="/properties" className="sign-up">
            <span>Properties</span>
          </Link>
          <ul>
            {categories.map((item: any) => (
              <li key={item.id}>
                <Link
                  onClick={toggleNav}
                  to={`/properties/category/${item.url}`}
                  className="sign-up"
                >
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <Link onClick={toggleNav} to="/opportunites">
            <span>Opportunites</span>
          </Link>
        </li>
        <li>
          <Link onClick={toggleNav} to="media">
            <span>Media</span>
          </Link>
        </li>
        <li>
          <Link onClick={toggleNav} to="contact-us">
            <span>Contact us</span>
          </Link>
        </li>

        {isLogged && (
          <>
            <li>
              <Link
                onClick={toggleNav}
                to="/account/dashboard"
                className="sign-up"
              >
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleNav}
                to="/account/settings"
                className="sign-up"
              >
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link onClick={doLogout} to="/" className="sign-up">
                <span>Log out</span>
              </Link>
            </li>
          </>
        )}
        {!isLogged && (
          <>
            <li>
              <Link onClick={toggleNav} to="/register" className="sign-up">
                <span>Register</span>
              </Link>
            </li>
            <li>
              <Link onClick={toggleNav} to="/login" className="sign-up">
                <span>Log In</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default React.memo(MobileNav);
