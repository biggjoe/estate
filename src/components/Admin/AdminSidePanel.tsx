import React from "react";
import { NavLink } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dashboard from "@mui/icons-material/Dashboard";
import Settings from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import AccountBox from "@mui/icons-material/AccountBox";
import Newspaper from "@mui/icons-material/Newspaper";
import ListAltOutlined from "@mui/icons-material/ListAltOutlined";
import PhotoAlbumOutlined from "@mui/icons-material/PhotoAlbumOutlined";
import MailOutline from "@mui/icons-material/MailOutline";
import {
  AdUnitsOutlined,
  Apartment,
  CategoryOutlined,
  CommentOutlined,
  SupportAgentOutlined,
  LiveTv,
  ZoomInOutlined,
  FlagOutlined,
  CreditCardOutlined,
} from "@mui/icons-material";

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "0",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminSidePanel = (props: any) => {
  let { onopen, onclose, toggleDrawer, DrawerHeader, doLogout } = props;

  const pages: any[] = [
    {
      path: "dashboard",
      title: "Dashboard ",
      navItem: true,
      icon: <Dashboard />,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "properties",
      title: "Properties",
      navItem: true,
      icon: <Apartment />,
      data: { mustAuth: true, isAdmin: false, showSideNav: true },
    },
    {
      path: "categories",
      title: "Categories",
      navItem: true,
      icon: <CategoryOutlined />,
      data: { mustAuth: true, isAdmin: false, showSideNav: true },
    },
    {
      path: "withdrawals",
      title: "Withdrawal Requests",
      navItem: true,
      icon: <CreditCardOutlined />,
    } /* */,
    ,
    {
      path: "tickets",
      title: "Support Tickets",
      icon: <SupportAgentOutlined />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    } /* 
    {
      path: "comments",
      title: "Comments",
      icon: <CommentOutlined />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    }, */,
    {
      path: "inspections",
      title: "Inspections",
      icon: <ZoomInOutlined />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "users",
      title: "Users",
      icon: <AccountBox />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },

    {
      path: "settings",
      title: "Site Settings",
      navItem: true,
      icon: <Settings />,
      data: { mustAuth: true, isAdmin: false, showSideNav: true },
    },
  ];

  const togg = () => {
    onclose();
  };
  return (
    <React.Fragment>
      <Drawer variant="permanent" open={onopen} onClose={onclose}>
        <DrawerHeader />
        <Divider />

        <List>
          {pages.map(
            (item, index) =>
              item.path !== "" &&
              item.navItem &&
              item.path !== "*" && (
                <ListItem
                  key={item.path}
                  disablePadding
                  sx={{
                    textDecoration: "none",
                    color: "#222222",
                    fontWeight: "900 !important",
                  }}
                  component={NavLink}
                  to={`/admin/${item.path}`}
                >
                  <ListItemButton onClick={togg}>
                    <Tooltip
                      title={item.title}
                      placement="right-start"
                      arrow
                      followCursor
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                    </Tooltip>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
        <Divider />
        <List sx={{ p: "0", m: "0" }}>
          <ListItem
            disablePadding
            button
            onClick={doLogout}
            sx={{ fontWeight: "900" }}
          >
            <ListItemButton>
              <Tooltip
                title={"Log Out"}
                placement="right-start"
                arrow
                followCursor
              >
                <ListItemIcon>
                  <i
                    className={`fas fa-sign-out-alt`}
                    style={{ color: "red" }}
                  ></i>
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default AdminSidePanel;
