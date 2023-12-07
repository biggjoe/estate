import React from "react";
import { NavLink } from "react-router-dom";
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

const PropertiesListTemplate = (props: any) => {
  const { properties, loading, loaded, parent, max_grid, show_count } = props;
  const max_num = max_grid && max_grid !== "" ? max_grid : 3;
  console.log(properties, parent);
  const [list, setList] = React.useState<any[]>(properties);
  const base_url = props.base_url ? "/" + props.base_url : "";
  const [is_grid, setIsGrid] = React.useState(false);
  const { decodeHtml, truncateWord } = processHtml;
  const togView = (index: number, state: boolean) => {
    const mutd = [...list];
    const item = (mutd[index]["is_togged"] = !mutd[index]["is_togged"]);
    setList(mutd);
  };
  if (properties && properties.length > 0) {
    return (
      <React.Fragment>
        <div className="">
          {loaded && (
            <>
              {show_count !== false && (
                <div className="flex flex-row align-items-center py0">
                  <div className="list-header spacer pb20">
                    <h3>
                      {list.length > 0
                        ? `${list.length} ${
                            list.length > 1 ? `properties` : `property`
                          }`
                        : "No properties found under this category"}
                    </h3>
                  </div>
                  <span>
                    {is_grid ? (
                      <Tooltip title="List View">
                        <IconButton onClick={() => setIsGrid(false)}>
                          <ListAltOutlined />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Grid View">
                        <IconButton onClick={() => setIsGrid(true)}>
                          <Grid4x4 />
                        </IconButton>
                      </Tooltip>
                    )}
                  </span>
                </div>
              )}

              <Grid
                container
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
              >
                {/**<Grid item xs={12} sm={6} md={3} key={item.id}> */}
                {list.map((item: any, index: number) => (
                  <Grid item xs={12} sm={6} md={4} lg={max_num} key={item.id}>
                    <div className={"news-card"}>
                      {item.sale_status === 1 && (
                        <>
                          <div className="sold-container"></div>
                          <div className="sold-image"></div>
                        </>
                      )}
                      <div className="thumb_pane">
                        <NavLink to={`${base_url}/p/${item.url}`}>
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
                          <NavLink
                            to={`/properties/category/${item.category_url}`}
                          >
                            {item.category_title}
                          </NavLink>
                        </div>
                      </div>

                      <div className="news_content_space">
                        <h3>
                          <NavLink to={`${base_url}/p/${item.url}`}>
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
                        <span className="price-bar">
                          <Currency value={item.price} />
                          <span className="ar"></span>
                        </span>
                        <span className="spacer"></span>
                        <span className="px10">
                          <PropertiesShareTemplate
                            properties={item}
                            position={"top"}
                          />
                        </span>
                        {/* 
                        <span>
                          <IconButton>
                            <CommentOutlined />
                          </IconButton>
                          {item.comment_num}23
                        </span> */}
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
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
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Card>
          <div className="error-load pxy20">
            <i className="fas fa-exclamation-triangle"></i> Properties not
            loaded
          </div>
        </Card>
      </React.Fragment>
    );
  }
};

export default React.memo(PropertiesListTemplate);
