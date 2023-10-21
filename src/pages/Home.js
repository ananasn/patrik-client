import React from "react";
// import { Link } from "react-router-dom";
import NavList from "../components/NavList/NavList";
import DialogPopup  from "../components/DialogPopup/DialogPopup";
import { useSelector } from "react-redux";
import classnames from "classnames";
import { useMediaQuery } from "react-responsive";
import "./Home.scss";
import Robot from "../components/Robot/Robot";
import RightSidebar from "../components/RightSidebar/RightSidebar";

const Home = () => {
  const isTablet = useMediaQuery({
    query: "(max-width: 850px)",
  });
  // const isMobile = useMediaQuery({
  //   query: "(max-width: 650px)",
  // });
  const isPc = useMediaQuery({
    query: "(max-width: 1285px)",
  });
  const isDay = useSelector((state) => state.isDay);
  return (
    <div className="home__wrapper">
      <DialogPopup />
      <div
        className={classnames("home", {
          home_day: isDay,
          home_night: !isDay,
        })}
      >
        <Robot />
        <>{isPc ? null : <RightSidebar />}</>
      </div>
    </div>
  );
};

export default Home;
