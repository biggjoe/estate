import React from "react";
import { NavLink } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import * as processHtml from "../../../services/processHtml";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Currency from "../../../services/Currency";

const PropertiesFeatured = () => {
  const { truncateWord } = processHtml;
  const [offset, setOffset] = React.useState<number>(0);
  const [properties, setProperties] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    listProperties(offset);
  }, []);

  const listProperties = (offset: number) => {
    setLoading(true);
    setLoaded(false);
    HttpService.post(
      { offset: offset, limit: 4, mode: "featured" },
      "properties"
    )
      .then(
        (result) => {
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
      <Card sx={{ borderRadius: "0", flexGrow: "1" }}>
        <div className="feature-card-header">Featured Articles</div>
        <Divider />
        {loaded && properties.length > 0 && (
          <>
            {properties.map((item: any, index: number) => (
              <ListItem
                disablePadding
                button
                key={index}
                divider={index < properties.length - 1 ? true : false}
                component={NavLink}
                to={`/${item.url}`}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      sx={{
                        width: 50,
                        height: 50,
                        mr: "10px",
                        borderRadius: "8px",
                      }}
                      alt={`${item.title} `}
                      src={
                        item.thumb
                          ? process.env.REACT_APP_SERVER_FILES_DOMAIN +
                            item.thumb
                          : "{`/images/logo.png`}"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <h4 style={{ lineHeight: "1.1" }}>
                        {truncateWord(item.title, 64)}
                      </h4>
                    }
                    secondary={
                      <span className="date-span">
                        <Currency value={item.price} />
                      </span>
                    }
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
        {loading && (
          <div className="pxy10">
            {[1, 2, 3, 4].map((a: number, i: number) => (
              <div className="mb5" key={a}>
                <Skeleton
                  sx={{ borderRadius: "1px", display: "block" }}
                  variant="rectangular"
                  height={"60px"}
                  width={"100%"}
                />
              </div>
            ))}
          </div>
        )}
        {loaded && properties.length == 0 && (
          <Card sx={{ p: "20px" }}>
            <i className="fas fa-exclamation-triangle"></i> Properties not
            loaded
          </Card>
        )}
      </Card>
    </React.Fragment>
  );
};

export default PropertiesFeatured;
