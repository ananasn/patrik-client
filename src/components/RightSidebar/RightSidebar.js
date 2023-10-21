import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import classnames from "classnames";

import "./RightSidebar.scss"; // Подключение стилей
import HomeList from "../HomeList/HomeList";

const RightSidebar = () => {

  const isDay = useSelector((state) => state.isDay);
  const moves = useSelector((state) => state.moves);
  const mimics = useSelector((state) => state.mimics);
  return (
    <div
      className={classnames("right-sidebar", {
        "right-sidebar_day": isDay,
        "right-sidebar_night": !isDay,
      })}
    >
      <HomeList title="Движения" items={moves} />
      <HomeList title="Мимика" items={mimics} />
    </div>
  );
};

export default RightSidebar;
