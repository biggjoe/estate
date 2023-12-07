import React from "react";
import { Outlet, useLocation, useParams, NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import Tooltip from "@mui/material/Tooltip";
import Add from "@mui/icons-material/Add";

import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CommentOutlined } from "@mui/icons-material";
import * as processHtml from "../../../services/processHtml";
import AuthService from "../../../services/AuthService";

const CommentsList = (props: any) => {
  console.log(props);
  const { launchNew } = props;
  console.log(" Coomments List Renders");
  const { decodeHtml, truncateWord } = processHtml;
  let val = props.data;
  const [comments, setComments] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  let params = useParams();
  const location = useLocation();
  const pageName = location.pathname;
  const [offset, setOffset] = React.useState<number>(0);
  const [isParam, setParam] = React.useState(false);
  const [ticket_modal_open, setNewModalOpen] = React.useState(false);
  const parts = location.pathname.split("/");
  const base = "/" + parts[1] + "/";
  React.useEffect(() => {
    doAjax(offset);
  }, []); //componentDidMount

  const doAjax = (offset: number) => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("news", {
      offset: offset,
      limit: 20,
      mode: "user-comments",
    }).then(
      (result) => {
        setLoading(false);
        console.log(result);
        if (Array.isArray(result)) {
          setComments(result);
        } else {
          setComments([]);
        }
        setLoaded(true);
      },
      (error) => {
        setLoading(false);
        setLoaded(true);
        setError(error.message);
        setComments([]);
      }
    ); //fetch
  }; //doAjax

  const loadMore = () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    doAjax(newOffset);
  };

  const launchNewModal = () => {
    setNewModalOpen(true);
  };

  const newModalClose = (data: any = false) => {
    setNewModalOpen(false);
    if (data) {
      comments.unshift(data);
    }
  };
  return (
    <React.Fragment>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-content-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-comments"></i> Comments
        </h3>
        <div className="spacer"></div>
        <div>-</div>
      </div>
      <Divider />
      <section className="px0">
        {comments.map((item: any, index: number) => (
          <ListItem
            disablePadding
            button
            key={index}
            divider={true}
            component={NavLink}
            to={`${base}comments/p/${item.article_url}`}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  variant="circular"
                  sx={{
                    width: 50,
                    height: 50,
                  }}
                  alt={`${item.title} `}
                  src={
                    item.photo
                      ? process.env.REACT_APP_SERVER_FILES_DOMAIN + item.photo
                      : "{`/images/logo.png`}"
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={<h4>{truncateWord(item.comment_summary, 100)}</h4>}
                secondary={
                  <>
                    <div>Article: {truncateWord(item.article_title, 100)}</div>
                    <span className="date-spanx">
                      <DatePipe value={item.create_date * 1000} />
                    </span>
                  </>
                }
              ></ListItemText>

              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Tooltip title={`${item.comment_num} comments`}>
                  <Button variant="text" size="large">
                    {item.comment_num} <i className="fas fa-comments"></i>
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </ListItemButton>
          </ListItem>
        ))}
        {loaded && comments.length === 0 && (
          <div className="result-error">
            <span>
              <i className="fas fa-exclamation-triangle"></i>
            </span>
            <h3> No Comments found!</h3>
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

export default CommentsList;
