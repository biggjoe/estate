import React from "react";
import { Link, NavLink } from "react-router-dom";

import Currency from "../../services/Currency";
import * as processHtml from "../../services/processHtml";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

const RelatedPropertiesListTemplate = (props: any) => {
  const { properties, title, loading, loaded } = props;
  console.log("related props:", properties);
  const base_url = props.base_url ? "/" + props.base_url : "";
  const { decodeHtml, truncateWord } = processHtml;
  return (
    <React.Fragment>
      <Card sx={{ borderRadius: "0", flex: "0 1" }}>
        <h3 className="px20 py10">{title}</h3>
        <Divider />
        {loaded && (
          <>
            {properties.map((item: any, index: number) => (
              <ListItem
                key={item.id}
                disablePadding
                button
                divider={true}
                component={NavLink}
                to={`${base_url}/p/${item.url}`}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      sx={{
                        width: 70,
                        borderRadius: "8px",
                        height: 70,
                        mr: "10px",
                      }}
                      alt={`${item.title} `}
                      src={
                        process.env.REACT_APP_SERVER_FILES_DOMAIN + item.thumb
                      }
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={<h4>{truncateWord(item.title, 64)}</h4>}
                    secondary={<Currency value={item.price} />}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}

        {loading && (
          <>
            <div className="pxy10">
              {[1, 2, 3, 4].map((a: number, i: number) => (
                <div className="mb5" key={a}>
                  <Skeleton
                    sx={{ borderRadius: "1px", display: "block" }}
                    variant="rectangular"
                    height={"90px"}
                    width={"100%"}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </React.Fragment>
  );
};

export default React.memo(RelatedPropertiesListTemplate);
