import React from "react";
const DatePipe = (props: any) => {
  const theDate = props.value;
  let nowUnix = new Date();
  let refUnix = new Date(parseInt(theDate));
  ///
  var a = new Date(parseInt(theDate));
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
  const ampm = hour >= 12 ? "pm" : "am";
  ///
  let tma: string = "";
  if (
    nowUnix.getDate() === refUnix.getDate() &&
    refUnix.getMonth() === nowUnix.getMonth() &&
    refUnix.getFullYear() === nowUnix.getFullYear()
  ) {
    tma = "" + hour + ":" + min + ampm;
  } else if (
    refUnix.getFullYear() === nowUnix.getFullYear() &&
    refUnix.getMonth() !== nowUnix.getMonth()
  ) {
    //tma = month + " " + date; //+ "@" + hour + ":" + min + ampm;
    tma = month + " " + date + ", " + year;
  } else if (
    refUnix.getFullYear() === nowUnix.getFullYear() &&
    refUnix.getMonth() === nowUnix.getMonth() &&
    nowUnix.getDate() !== refUnix.getDate()
  ) {
    tma = month + " " + date; //+ " @ " + hour + ":" + min + "";
  } else if (refUnix.getFullYear() !== nowUnix.getFullYear()) {
    tma = month + " " + date + ", " + year;
  } else {
    tma = "00-00-0000";
  }

  return <React.Fragment>{tma}</React.Fragment>;
};

export default React.memo(DatePipe);
