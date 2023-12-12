import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Profile.scss";

import robot from "../../img/icons/menu-day/robot2.svg";
import robotNight from "../../img/icons/menu-night/robot2-night.svg";

const Profile = () => {
  const isDay = useSelector((state) => state.isDay);
  return (
    <ul className="profile">
      <li className={`${isDay ? "profile__item_day" : "profile__item_night"}`}>
        <img alt="иконка меню" src={isDay ? robot : robotNight} />
        <Link
          className={`${isDay ? "profile__link_day" : "profile__link_night"}`}
          to="/"
        >
          Patrick
        </Link>
      </li>
    </ul>
  );
};

export default Profile;
