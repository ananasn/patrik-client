import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Profile.scss";

import robot from "../../img/icons/menu-day/robot2.png";
import robotNight from "../../img/icons/menu-night/robot2.png";

const Profile = () => {
  const isDay = useSelector((state) => state.isDay);
  return (
    <ul className="profile">
      <li>
        <img alt="иконка меню" src={isDay ? robot : robotNight} />
        <Link
          className={`${isDay ? "profile__link_day" : "profile__link_night"}`}
          to="/"
        >
          Patrick 78
        </Link>
      </li>
    </ul>
  );
};

export default Profile;
