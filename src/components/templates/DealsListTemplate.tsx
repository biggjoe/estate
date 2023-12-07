import React from "react";
import { Link, NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import PropertiesLikeTemplate from "./PropertiesLikeTemplate";
import PropertiesShareTemplate from "./PropertiesShareTemplate";
import * as processHtml from "../../services/processHtml";
import Currency from "../../services/Currency";
import { CommentOutlined, Grid4x4, ListAltOutlined } from "@mui/icons-material";
import { Avatar, Card, Collapse, Tooltip } from "@mui/material";
import MapLauncher from "./MapLauncher";

const DealsListTemplate = (props: any) => {
  const { deals, loaded, loading } = props;
  const base_url = props.base_url ? "/" + props.base_url : "";
  const { decodeHtml, truncateWord } = processHtml;
  return (
    <React.Fragment>
      <section className="pxy20">
        <div className="deals-cover">
          <div className="deal-top">
            <h3> {deals.title}</h3>
            <span className="spacer"></span>
            <span className="deals-more">
              <Link to={`/deals/${deals.url}`}>
                See more <i className="fas fa-chevron-right"></i>
              </Link>
            </span>
          </div>
          <div className="deal-contents">
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
              {/**<Grid item xs={12} sm={6} md={3} key={item.id}> */}
              {deals.properties.map((item: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <div className={"news-card"}>
                    <div className="thumb_pane">
                      <NavLink to={`${base_url}/${item.url}`}>
                        <div className="news_thumb">
                          <img
                            src={
                              item.thumb
                                ? process.env.REACT_APP_SERVER_FILES_DOMAIN +
                                  item.thumb
                                : "/images/estate.jpg"
                            }
                            alt="news banner"
                          />
                        </div>
                      </NavLink>
                      <div className="cat-span">
                        <NavLink to={`/category/${item.category_url}`}>
                          {item.category_title}
                        </NavLink>
                      </div>
                    </div>

                    <div className="news_content_space">
                      <h3>
                        <NavLink to={`${base_url}/${item.url}`}>
                          {truncateWord(item.title, 90)}
                        </NavLink>
                      </h3>
                      <div className="txt-md italic pt5">
                        <MapLauncher {...item} />
                      </div>

                      <Collapse in={item.is_togged}>
                        <div
                          className="news-summary"
                          dangerouslySetInnerHTML={{
                            __html: decodeHtml(item.summary),
                          }}
                        ></div>
                      </Collapse>
                    </div>

                    <div className="react-span px10">
                      <span className="spacer bolder txt-lg color-primary">
                        <Currency value={item.price} />
                      </span>
                      <span className="px10">
                        <PropertiesShareTemplate
                          properties={item}
                          position={"top"}
                        />{" "}
                      </span>
                      <span>
                        <IconButton>
                          <CommentOutlined />
                        </IconButton>
                        {item.comment_num}23
                      </span>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
            {loading && (
              <>
                <Grid container spacing={2}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                    (item: number, index: number) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                        <Skeleton
                          sx={{ borderRadius: "1px", display: "block" }}
                          variant="rectangular"
                          height={"320px"}
                          width={"100%"}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default React.memo(DealsListTemplate);
