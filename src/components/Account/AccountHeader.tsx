import React from "react";
import { Link, NavLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import Avatar from "@mui/material/Avatar";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Settings from "@mui/icons-material/Settings";
import MailOutline from "@mui/icons-material/MailOutline";
import List from "@mui/material/List";
import {
  AccountCircleOutlined,
  AdUnitsOutlined,
  ApartmentOutlined,
  CategoryOutlined,
  Comment,
  FolderOpenOutlined,
  NewspaperOutlined,
  Notifications,
  PaymentOutlined,
  SupportAgent,
} from "@mui/icons-material";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#222222",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const AccountHeader = (props: any) => {
  const { open, toggleDrawer, DrawerHeader, doLogout } = props;
  const pages: any[] = [
    {
      path: "my-properties",
      component: "My Properties",
      icon: <ApartmentOutlined />,
    },
    {
      path: "withdrawals",
      component: "Withdrawals",
      icon: <FolderOpenOutlined />,
    },
    {
      path: "transactions",
      component: "Transactions",
      icon: <PaymentOutlined />,
    },
    {
      path: "tickets",
      component: "Support Tickets",
      icon: <SupportAgent />,
    },
    {
      path: "notifications",
      component: "Notifications",
      icon: <Notifications />,
    },
    {
      path: "settings",
      component: "Account Settings",
      icon: <AccountCircleOutlined />,
    },
  ];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
          }}
        >
          <IconButton
            size="large"
            onClick={toggleDrawer}
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ display: { xs: "flex", md: "block", sm: "flex" }, mr: 1 }}
          >
            {open ? <ChevronLeft /> : <MenuOutlined />}
          </IconButton>

          <span className="dashboard-logo">
            <Link to="/">
              <img src="/images/logo2.png" alt="Logo" />
            </Link>
          </span>

          <div style={{ flexGrow: 1, display: "flex" }}></div>

          <Box sx={{ flexGrow: 0 }}>
            <span className="pr10">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <MailOutline />
                </Badge>
              </IconButton>
            </span>
          </Box>

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
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Menu" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

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
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default AccountHeader;
