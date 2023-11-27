import React, {useEffect } from "react";
import DialogPopup  from "../components/DialogPopup/DialogPopup";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import classnames from "classnames";
import { useMediaQuery } from "react-responsive";
import "./Home.scss";
import Robot from "../components/Robot/Robot";
import { setMoves, setMimics } from "../store/actions";
import RightSidebar from "../components/RightSidebar/RightSidebar";

const Home = () => {
  //получение списка всех мимик и движений
  const dispatch = useDispatch();
  const { request, loading, error, clearError } = useHttp();
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/move/");
      const data = await response;
      // console.log(data);
      dispatch(setMoves(data));
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/mimic/");
      const data = await response;
      // console.log(data);
      dispatch(setMimics(data));
    };
    fetchData();
  }, []);
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
