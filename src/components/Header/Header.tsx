import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Collapse from "@mui/material/Collapse";
import Settings from "@mui/icons-material/Settings";
import Dashboard from "@mui/icons-material/Dashboard";
import HttpService from "../../services/HttpService";
import PropertiesListTemplate from "../templates/PropertiesListTemplate";
import "./Header.css";
import LoggedHeader from "./LoggedHeader";
import NavDropIcon from "../templates/NavDropIcon";
import HeaderSearch from "./HeaderSearch";
import useFetchCategories from "../../hooks/useFetchCategories";
import MobileNav from "./MobileNav";

const Header = () => {
  const [isTogged, setIsTogged] = React.useState(false);
  const page = useLocation().pathname;
  const logx = AuthService.isLogged();
  const usr = AuthService.getCurrentUser();
  const [isLogged, setIsLogged] = React.useState(logx);

  const { categories } = useFetchCategories();

  const closeNav = () => {
    setNavData({ ...nav_data, onopen: false });
  };
  const [nav_data, setNavData] = React.useState<any>({
    ononpen: false,
    onclose: closeNav,
    isLogged: isLogged,
  });
  const navigate = useNavigate();

  const doLogout = () => {
    AuthService.logout();
    setTimeout(() => {
      console.log("Session Cleared...");
      setIsLogged(false);
      return navigate("/");
    }, 300);
  };

  const toggleNav = () => {
    setNavData({
      ...nav_data,
      isLogged: isLogged,
      onopen: true,
      onclose: closeNav,
    });
    setIsTogged((cur) => !cur);
  };

  const doBoth = () => {
    doLogout();
    toggleNav();
  };

  const showMobileNav: boolean = isTogged ? true : false;
  const pages: any[] = [
    { path: "/account/dashboard", component: "Dashboard", icon: <Dashboard /> },
    {
      path: "/account/settings",
      component: "Account Settings",
      icon: <Settings />,
    },
  ];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [search, setSearch] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [properties, setProperties] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (loaded) {
      setProperties([]);
    }
  }, []);

  const handleInputChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearch({ ...search, [name]: value });
    console.log(search);
    setProperties([]);
    setLoading(false);
    setLoaded(false);
  };

  const searchProperties = () => {
    if (!search.keyword || search.keyword === "") {
      alert("Please enter search keyword");
      return;
    }
    setProperties([]);
    setLoading(true);
    setLoaded(false);
    HttpService.post({ keyword: search.keyword, mode: "search" }, "properties")
      .then(
        (result) => {
          console.log(result);
          if (Array.isArray(result)) {
            setProperties(result);
          } else {
            setProperties([]);
          }
        },
        (error) => {
          setProperties([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doSearch

  const resetSearch = () => {
    setLoaded(false);
    setLoading(false);
    setProperties([]);
    setSearch({ ...search, keyword: "" });
  };

  const redir = (link: string) => {
    return navigate(`/${link}`);
  };
  return (
    <React.Fragment>
      <section className="top-sticky z-omega">
        <header className="header-main">
          <div className="logo-top">
            <div className="logo spacer">
              <NavLink to="/">
                <img src={`/images/logo.png`} alt="Joevic Logo" />
              </NavLink>
            </div>

            <span className="resp-nav">
              <a onClick={toggleNav}>
                {!isTogged ? (
                  <i className="fas fa-bars"></i>
                ) : (
                  <i className="fas fa-close"></i>
                )}
              </a>
            </span>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about-us">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/properties">
                  Properties <NavDropIcon />
                </NavLink>
                <ul>
                  {categories.map((item: any) => (
                    <li key={item.id}>
                      <NavLink to={`/properties/category/${item.url}`}>
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <NavLink to="/opportunities">
                  Opportunities <NavDropIcon />
                </NavLink>
                <ul>
                  <li>
                    <NavLink to="/register">Become a consultant</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Sell on Joevic Properties</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/media">Media</NavLink>
              </li>
              <li>
                <NavLink to="/contact-us">Contact&nbsp;Us</NavLink>
              </li>
            </ul>
          </nav>
          {/**
          <HeaderSearch
            search={search}
            loading={loading}
            searchProperties={searchProperties}
            loaded={loaded}
            resetSearch={resetSearch}
            handleInputChange={handleInputChange}
          />
          search-space-ends */}
          <div className={"top-cta top-t"}>
            {!isLogged && (
              <>
                <Link to="/register" className="sign-up">
                  <span>Register</span>
                </Link>
                <Link to="/login" className="login">
                  <span>Log In</span>
                </Link>
              </>
            )}
            {isLogged && <LoggedHeader doLogout={doLogout} usr={usr} />}
          </div>
          {/**top-cta-ends */}
        </header>
        <section className="lower-section">
          <Collapse in={isTogged}>
            <MobileNav
              isLogged={isLogged}
              toggleNav={toggleNav}
              doLogout={doLogout}
              categories={categories}
            />
          </Collapse>

          <div className="mobile-space">
            <span
              className={
                isLogged ? "search-space lower spacer" : "search-space lower"
              }
            >
              <span className="s-bar">
                <input
                  type="text"
                  name="keyword"
                  value={search.keyword}
                  onChange={handleInputChange}
                  placeholder="Search properties"
                  className="header-searcher"
                />
                {!loaded && (
                  <>
                    <button
                      onClick={searchProperties}
                      className="header-searcher-button"
                    >
                      {loading ? (
                        <i className="fas fa-spin fa-circle-notch"></i>
                      ) : (
                        <i className="fas fa-search"></i>
                      )}
                    </button>
                  </>
                )}
                {loaded && (
                  <span className="spacer">
                    <button
                      onClick={resetSearch}
                      className="header-searcher-button closer"
                    >
                      <i className="fas  fa-close"></i>
                    </button>
                  </span>
                )}
              </span>
            </span>
          </div>
          {/**mobile-space-ends */}

          {loaded && (
            <>
              <div className="search-result-container" onClick={resetSearch}>
                {loaded && properties.length > 0 && (
                  <>
                    <div className="home-container">
                      <div className="pb10 mb20">
                        <h2>
                          {properties.length} results found for{" "}
                          <u>{search.keyword}</u> search
                        </h2>
                      </div>
                      <PropertiesListTemplate
                        properties={properties}
                        loaded={loaded}
                        loading={loading}
                      />
                    </div>
                  </>
                )}

                {loaded && properties.length === 0 && (
                  <>
                    <div className="home-container" onClick={resetSearch}>
                      <div className="pb10">
                        <h2>
                          No results found for <u>{search.keyword}</u> search
                        </h2>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {loading && (
            <>
              <div className="search-result-container" onClick={resetSearch}>
                <div className="home-container loading-search">
                  <h1>
                    <i className="fas fa-spin fa-circle-notch"></i>
                  </h1>
                  <h2>Searching.....</h2>
                </div>
              </div>
            </>
          )}
        </section>
      </section>
    </React.Fragment>
  );
};

export default Header;
