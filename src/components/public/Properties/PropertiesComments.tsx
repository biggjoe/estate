import React from "react";
import * as processHtml from "../../../services/processHtml";
import Edit from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import DatePipe from "../../../pipes/DatePipe";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AuthService from "../../../services/AuthService";
const PropertiesComments = (props: any) => {
  const cur_user = AuthService.getCurrentUser()["data"];
  console.log("CUR_USER::: ", cur_user);
  const { data, is_admin, edit_action, delete_action } = props;
  const isAdmin = is_admin ? true : false;
  console.log("is_admin:: ", isAdmin);
  console.log(props);
  const { decodeHtml, truncateWord } = processHtml;

  return (
    <React.Fragment>
      <section>
        <>
          {data.map((item: any, index: number) => (
            <div className="comment-cover" key={index}>
              {cur_user && item.email === cur_user["email"] && (
                <>
                  <ListItem
                    disablePadding
                    divider={index < data.length - 1 ? true : false}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          variant="circular"
                          sx={{
                            width: 50,
                            height: 50,
                            mr: "10px",
                          }}
                          alt={`${item.name} `}
                          src={
                            item.photo
                              ? process.env.REACT_APP_SERVER_FILES_DOMAIN +
                                item.photo
                              : "{`/images/logo.png`}"
                          }
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <h4 style={{ lineHeight: "1.2" }}>{item.name}</h4>
                        }
                        secondary={
                          <span className="date-span">
                            <i className="fas fa-clock"></i>{" "}
                            <DatePipe value={item.create_date * 1000} />
                          </span>
                        }
                      ></ListItemText>
                      {isAdmin && (
                        <ButtonGroup
                          variant="outlined"
                          aria-label="outlined button group"
                        >
                          <Tooltip title="Delete Comment">
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                delete_action({ id: item.id, action: "delete" })
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Comment">
                            <IconButton
                              aria-label="edit"
                              onClick={() => edit_action(item.id)}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                        </ButtonGroup>
                      )}
                    </ListItemButton>
                  </ListItem>
                  <div className="comment-body">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(item.comment),
                      }}
                    ></div>
                  </div>{" "}
                </>
              )}
            </div>
          ))}
        </>
      </section>
    </React.Fragment>
  );
};

export default PropertiesComments;
