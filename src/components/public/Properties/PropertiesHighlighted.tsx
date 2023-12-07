import React from "react";
import HttpService from "../../../services/HttpService";
import * as processHtml from "../../../services/processHtml";
import PropertiesListTemplate from "../../templates/PropertiesListTemplate";
import PlaceHolder from "../../templates/PlaceHolder";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import DatePipe from "../../../pipes/DatePipe";
import { Skeleton } from "@mui/material";
import PropertiesShareTemplate from "../../templates/PropertiesShareTemplate";
import { CommentOutlined } from "@mui/icons-material";
import GalleryCarousel from "../../templates/GalleryCarousel";

const PropertiesHighlighted = () => {
  const { decodeHtml, truncateWord } = processHtml;
  const [properties, setProperties] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    listProperties();
  }, []);

  const listProperties = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.post({ mode: "highlighted" }, "properties")
      .then(
        (result) => {
          setLoading(false);
          console.log("HIGHLIGHTED::: ", result);
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
  }; //doAjax

  return (
    <React.Fragment>
      <div className="highlight-details">
        <GalleryCarousel items={properties} transition="fade" start={true} />
      </div>
    </React.Fragment>
  );
};

export default PropertiesHighlighted;
