import { Circle, Home } from "@mui/icons-material";
import { Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { NavLink } from "react-router-dom";
import DatePipe from "../../pipes/DatePipe";
import "./carousel.css";

function Item(props: any) {
  return (
    <div className="car-item-cover">
      <div className="news-carousel-item-container">
        <NavLink to={`/${props.item.url}`}>
          <img
            src={`${
              process.env.REACT_APP_SERVER_FILES_DOMAIN + props.item.photo
            }`}
            alt={props.item.photo}
          />{" "}
        </NavLink>
      </div>

      <div className="news-caption-container">
        <div className="news-caption-container-text">
          <NavLink to={`/${props.item.url}`}>
            <h2> {props.item.title}</h2>
            <div className="date-span">
              <i className="fas fa-clock"></i>{" "}
              <DatePipe value={props.item.create_date * 1000} />
            </div>
          </NavLink>{" "}
        </div>

        <div className="news-caption-container-overlay"></div>
      </div>
    </div>
  );
}

const PropertiesCarousel = (props: any) => {
  let { items } = props;
  console.log("CAROUSEL ITEMS:: ", items);
  const [index, setIndex] = React.useState(0);
  const handleChange = React.useCallback(
    (cur: any, prev: any) => () => {
      console.log(prev, cur);
    },
    [index]
  );

  return (
    <>
      <Carousel
        index={index}
        onChange={handleChange}
        interval={7000}
        duration={1000}
        autoPlay={true}
        animation="slide"
        indicators={true}
        IndicatorIcon={<Circle sx={{ fontSize: "16px" }} />}
        indicatorIconButtonProps={{
          style: {
            padding: "6px", // 1
            margin: "0 3px",
            color: "#fff", // 3
            height: "5px",
            width: "5px",
            boxShadow: "1px 2px 3px #000",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: "#222", // 2
          },
        }}
        indicatorContainerProps={{
          style: {
            position: "absolute",
            top: "20px",
            zIndex: "100000000000",
          },
        }}
        navButtonsAlwaysVisible={true}
        stopAutoPlayOnHover
        swipe
        next={(next: any, active: any) => {
          console.log();
        }}
        prev={(prev: any, active: any) => {
          console.log(`we left ${active}, and are now at ${prev}`);
        }}
        className="my-carousel"
      >
        {items.map((item: any, i: number) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </>
  );
};
export default React.memo(PropertiesCarousel);
