import React from "react";
import IconButton from "@mui/material/IconButton";
import HttpService from "../../services/HttpService";
import AuthService from "../../services/AuthService";

const PropertiesLikeTemplate = (props: any) => {
  const { properties } = props;
  const [loaded, setLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [likes, setLikes] = React.useState(properties.like_num);
  const [dislikes, setDislikes] = React.useState(properties.dislike_num);
  const [info, setInfo] = React.useState({});

  const [is_logged, setIslogged] = React.useState(false);

  const usr = AuthService.getCurrentUser();
  React.useEffect(() => {
    setIslogged(usr.isLogged);
  }, [usr]);

  const sendLike = (act: string) => {
    setLoading(true);
    setLoaded(false);
    const load = {
      act: act,
      article_id: properties.id,
      mode: "like_property",
    };
    console.log(load);
    // return;
    HttpService.postHeader("properties", load)
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (result.status === 1) {
            setLike(result);
          } else {
            alert(result.message);
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax
  const setLike = (data: any) => {
    console.log(data);
    setLikes(data.likes);
    setDislikes(data.dislikes);
  };

  const doSL = (mode: string) => {
    if (is_logged) {
      sendLike(mode);
    } else {
      return null;
    }
  };
  return (
    <React.Fragment>
      <span className="pr5">
        <IconButton color="primary" onClick={() => doSL("like")}>
          <i className="fas fa-heart"></i>
        </IconButton>
        {likes}
      </span>
      <span>
        <IconButton color="warning" onClick={() => doSL("dislike")}>
          <i className="fas fa-thumbs-down"></i>
        </IconButton>
        {dislikes}
      </span>
    </React.Fragment>
  );
};

export default React.memo(PropertiesLikeTemplate);
