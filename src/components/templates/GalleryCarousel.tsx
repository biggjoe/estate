import { Circle, Home } from "@mui/icons-material";
import { Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import "./carousel.css";

function Itemx(props: any) {
  const imgs = props.images;
  return (
    <div className="carousel-item-container">
      <img src={`${process.env.REACT_APP_SERVER_FILES_DOMAIN + imgs.photo}`} />
    </div>
  );
}

function Item(props: any) {
  return (
    <div className="carousel-item-container">
      <img
        src={`${process.env.REACT_APP_SERVER_FILES_DOMAIN + props.item.photo}`}
        alt={props.item.photo}
      />
      {props.item.caption && (
        <div className="caption-container">
          <div className="caption-container-overlay"></div>
          <div className="caption-container-text">{props.item.caption}</div>
        </div>
      )}
    </div>
  );
}

const GalleryCarousel = (props: any) => {
  let { items, transition, start } = props;
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
        interval={5000}
        duration={1000}
        autoPlay={start ? start : false}
        animation={transition ? transition : "slide"}
        indicators={true}
        IndicatorIcon={<Circle sx={{ fontSize: "16px" }} />}
        indicatorIconButtonProps={{
          style: {
            padding: "3px", // 1
            margin: "0 6px",
            color: "#fff", // 3
            height: "3px",
            width: "3px",
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
            right: "20px",
            zIndex: "100000000000",
          },
        }}
        navButtonsAlwaysVisible={false}
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
        {/* 
        {items.map((item: any, i: number) => (
          <div className="carousel-item-container" key={i}>
            <img
              src={`${process.env.REACT_APP_SERVER_DOMAIN + item.src}`}
              alt={item.caption + i}
            />
          </div>
        ))} */}
        {items.map((item: any, i: number) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </>
  );
};
export default React.memo(GalleryCarousel);
