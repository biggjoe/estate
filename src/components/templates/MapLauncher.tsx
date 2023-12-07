import React, { Component, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { handleBreakpoints } from "@mui/system";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Close, LocationOnOutlined } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Link } from "react-router-dom";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#eeeeee",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const MapLauncher = (props: any) => {
  const { title, location_town, location_state } = props;
  const location = location_town + ", " + location_state;
  const [loaded, setLoaded] = React.useState(false);
  const [location_longitude, setLongitude] = React.useState<boolean | string>(
    false
  );
  const [location_latitude, setLatitude] = React.useState<boolean | string>(
    false
  );

  React.useEffect(() => {
    //if (props.location_longitude && props.location_latitude) {
    setLongitude(props.location_longitude);
    setLatitude(props.location_latitude);
    setLoaded(true);
    //}
  }, []);
  const handleClose = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState<any>({
    onopen: false,
    onclose: handleClose,
  });
  useEffect(() => {}, []);

  const toggleMap = () => {
    let opx = modal.onopen;
    setModal({ ...modal, onopen: !opx, onclose: handleClose });
  };

  const createMarkup = (text: any) => {
    return { __html: text };
  };

  const [isFull, setIsFull] = React.useState<boolean>(false);
  const toggleExpand = () => {
    setIsFull(!isFull);
  };

  //const map_src = `https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const map_src = `https://maps.google.com/maps?q=${location_longitude},${location_latitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  return (
    <React.Fragment>
      <Link to={"#"} onClick={toggleMap}>
        <i className="fas fa-map-marker-alt"></i> {location}
      </Link>

      <Dialog
        fullWidth={true}
        fullScreen={isFull}
        open={modal.onopen}
        onClose={handleClose}
        aria-labelledby={"Me"}
      >
        <DialogTitle id={"label100"}>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <div style={{ flexGrow: 1, display: "flex" }}>{title}</div>
            <span>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </span>
          </Toolbar>
        </DialogTitle>
        <DialogContent>
          <section className="map-area">
            {loaded && (
              <>
                <div className="google-map-code">
                  <iframe
                    src={map_src}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    aria-hidden="false"
                  ></iframe>
                </div>
              </>
            )}
            {!loaded && <> Loading...</>}
          </section>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
          <Button onClick={toggleExpand} color="primary">
            {isFull ? "Contract Map" : "Expand Map"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(MapLauncher);
