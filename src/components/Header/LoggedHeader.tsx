import React from "react";
import { Link, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import Dashboard from "@mui/icons-material/Dashboard";
import Settings from "@mui/icons-material/Settings";
import {
  ApartmentOutlined,
  CategoryOutlined,
  Home,
  InfoOutlined,
  VideoFileOutlined,
} from "@mui/icons-material";

const LoggedHeader = (props: any) => {
  const { doLogout, usr } = props;
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const pages: any[] = [
    {
      path: "/",
      component: "Home",
      icon: <Home />,
    },
    {
      path: "/about-us",
      component: "About us",
      icon: <InfoOutlined />,
    },
    {
      path: "/properties",
      component: "Properties",
      icon: <ApartmentOutlined />,
    },
    {
      path: "/opportunities",
      component: "Opportunities",
      icon: <CategoryOutlined />,
    },
    {
      path: "/media",
      component: "Media",
      icon: <VideoFileOutlined />,
    },
    {
      path: "/account/dashboard",
      component: "Dashboard",
      icon: <Dashboard />,
    },
  ];

  return (
    <React.Fragment>
      <Box
        sx={{
          flexGrow: 0,
          m: "0",
          display: {
            xs: "inline-flex",
            sm: "inline-flex",
            md: "inline-flex",
          },
        }}
      >
        <span className="flex flex-row align-items-center">
          <span className="show-inline">
            Hi,{/* <strong>{usr.username}</strong> */}
          </span>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={usr.firstname}
                sx={{ border: "2px solid #fff" }}
                src={
                  usr && usr.avatar
                    ? `${process.env.REACT_APP_SERVER_DOMAIN + usr.avatar}`
                    : `/images/avatar.jpg`
                }
              />
            </IconButton>
          </Tooltip>
        </span>
        <Menu
          sx={{ m: "0", p: "0 !important" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          onClick={handleCloseUserMenu}
        >
          {/*  <Paper sx={{ width: "auto", maxWidth: "100%" }}> */}
          <List sx={{ p: "0", m: "0" }}>
            {pages.map((item: any, index: number) => (
              <MenuItem key={index} sx={{ p: "0", m: "0" }}>
                <ListItem
                  disablePadding
                  button
                  key={item.id}
                  sx={{ margin: "0px" }}
                  component={NavLink}
                  to={`${item.path}`}
                >
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.component}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </MenuItem>
            ))}
          </List>
          <Divider />
          <MenuItem>
            <List sx={{ m: "0", p: "0" }}>
              <ListItem disablePadding onClick={doLogout}>
                <ListItemIcon>
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText></ListItemText>
                <Typography variant="body2" color="text.primary">
                  Log Out
                </Typography>
              </ListItem>
            </List>
          </MenuItem>
          {/* </Paper> */}
        </Menu>
      </Box>
    </React.Fragment>
  );
};

export default LoggedHeader;
