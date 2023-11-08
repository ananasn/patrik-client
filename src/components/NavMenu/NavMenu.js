import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NavMenu.scss";
import { useMediaQuery } from "react-responsive";

import wifi from "../../img/icons/menu-day/wifi.svg";
import ip from "../../img/icons/menu-day/ip.svg";
import mic from "../../img/icons/menu-day/mic.svg";
import logs from "../../img/icons/menu-day/logs.svg";
import gear from "../../img/icons/menu-day/gear.svg";
import exit from "../../img/icons/menu-day/exit.svg";
import update from "../../img/icons/menu-day/update.svg";
import robot from "../../img/icons/menu-day/robot2.svg";
import robotNight from "../../img/icons/menu-night/robot2-night.svg";
import wifiNight from "../../img/icons/menu-night/wifi-night.svg";
import ipNight from "../../img/icons/menu-night/ip-night.svg";
import micNight from "../../img/icons/menu-night/mic-night.svg";
import logsNight from "../../img/icons/menu-night/logs-night.svg";
import gearNight from "../../img/icons/menu-night/gear-night.svg";
import exitNight from "../../img/icons/menu-night/exit-night.svg";
import updateNight from "../../img/icons/menu-night/update-night.svg";

const NavMenu = () => {
  const isDay = useSelector((state) => state.isDay);
  const isMobile = useMediaQuery({
    query: "(max-width: 650px)",
  });
  return (
    <>
      <ul className="menulist">
        <li>
          <Link
            className={`${
              isDay ? "profile__link_day " : "profile__link_night "
            } ${isMobile ? "visible" : "hidden"}`}
            to="/"
          >
            <img alt="иконка меню" src={isDay ? robot : robotNight} />
          </Link>
        </li>
        <li>
          <Link
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            to="/"
          >
            <img alt="иконка меню" src={isDay ? wifi : wifiNight} />
            <p>Wi-Fi Home</p>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            to="/ip"
          >
            <img alt="иконка меню" src={isDay ? ip : ipNight} />
            <p>255.255.255.255</p>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            to="/status"
          >
            <img alt="иконка меню" src={isDay ? mic : micNight} />
            <p>Включен</p>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            to="/logs"
          >
            <img alt="иконка меню" src={isDay ? logs : logsNight} />
            <p>Логи</p>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            to="/settings"
          >
            <img alt="иконка меню" src={isDay ? update : updateNight} />
            <p>Обновления</p>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            to="/settings"
          >
            <img alt="иконка меню" src={isDay ? gear : gearNight} />
            <p>Настройки</p>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            to="/logout"
          >
            <img alt="иконка меню" src={isDay ? exit : exitNight} />
            <p>Выход</p>
          </Link>
        </li>
      </ul>
      {isMobile ? (
        <ul className="mobilelist">
          <li>
            <Link
              className={`${
                isDay ? "menulist__link_day" : "menulist__link_night"
              }`}
              to="/"
            >
              <img alt="иконка меню" src={isDay ? wifi : wifiNight} />
              <p className={`${isDay ? "mobilelist__text-day" : "mobilelist__text-night"}`}>Wi-Fi Home</p>
            </Link>
          </li>
          <li>
            <Link
              className={`${
                isDay ? "menulist__link_day" : "menulist__link_night"
              }`}
              to="/ip"
            >
              <img alt="иконка меню" src={isDay ? ip : ipNight} />
              <p className={`${isDay ? "mobilelist__text-day" : "mobilelist__text-night"}`}>255.255.255.255</p>
            </Link>
          </li>
        </ul>
      ) : null}
    </>
  );
};

export default NavMenu;
