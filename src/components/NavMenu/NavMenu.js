import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { useHttp } from "../../hooks/http.hook";

import {ReactComponent as LogsIco} from "../../img/icons/menu-day/logs.svg";
import {ReactComponent as UpdateIco} from "../../img/icons/menu-day/update.svg";
import {ReactComponent as GearIco} from "../../img/icons/menu-day/gear.svg";

import "./NavMenu.scss";

import wifi from "../../img/icons/menu-day/wifi.svg";
import ip from "../../img/icons/menu-day/ip.svg";
import mic from "../../img/icons/menu-day/mic.svg";
//import logs from "../../img/icons/menu-day/logs.svg";
//import gear from "../../img/icons/menu-day/gear.svg";
import exit from "../../img/icons/menu-day/exit.svg";
//import update from "../../img/icons/menu-day/update.svg";
import robot from "../../img/icons/menu-day/robot2.svg";
import robotNight from "../../img/icons/menu-night/robot2-night.svg";
import wifiNight from "../../img/icons/menu-night/wifi-night.svg";
import ipNight from "../../img/icons/menu-night/ip-night.svg";
import micNight from "../../img/icons/menu-night/mic-night.svg";
//import logsNight from "../../img/icons/menu-night/logs-night.svg";
//import gearNight from "../../img/icons/menu-night/gear-night.svg";
import exitNight from "../../img/icons/menu-night/exit-night.svg";
//import updateNight from "../../img/icons/menu-night/update-night.svg";

const NavMenu = () => {
  const isDay = useSelector((state) => state.isDay);
  const isMobile = useMediaQuery({
    query: "(max-width: 650px)",
  });
  const [userIp, setUserIp] = useState();
  const { request, loading, error, clearError } = useHttp();
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/ip/");
      const data = await response;
      // console.log(data);
      setUserIp(data.ip);
    };
    fetchData();
  }, []);

  return (
    <>
      <ul className="menulist">
        <li className={`${isDay ? "menulist__item_day" : "menulist__item_night"}`}>
          <NavLink
            className={`${
              isDay ? "profile__link_day " : "profile__link_night "
            } ${isMobile ? "visible" : "hidden"}`}
            to="/"
          >
            <img alt="иконка меню" src={isDay ? robot : robotNight} />
          </NavLink>
        </li>
        <li>
          <div
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            //to="/"
          >
            <img alt="иконка меню" src={isDay ? wifi : wifiNight} />
            <p>Wi-Fi Home</p>
          </div>
        </li>
        <li>
          <div
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            //to="/ip"
          >
            <img alt="иконка меню" src={isDay ? ip : ipNight} />
            <p>{userIp}</p>
          </div>
        </li>
        <li className={`${isDay ? "menulist__item_day" : "menulist__item_night"}`}>
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
        <li className={`${isDay ? "menulist__item_day" : "menulist__item_night"}`}>
          <NavLink
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            style={({isActive}) => (
              isDay ?
                {color: isActive ? '#08458E' : '#101420', fill: isActive ? '#08458E' : '#1E85FF'}
                :
                {color: isActive ? '#52EABC' : '#ffffff', fill: isActive ? '#52EABC' : '#DEF8FC'}
            )}
            to="/logs"
          >
            <LogsIco className="menulist-link__ico"/>
            <p>Логи</p>
          </NavLink>
        </li>
        <li className={`${isDay ? "menulist__item_day" : "menulist__item_night"}`}>
          <NavLink
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            style={({isActive}) => (
              isDay ?
                {color: isActive ? '#08458E' : '#101420', fill: isActive ? '#08458E' : '#1E85FF'}
                :
                {color: isActive ? '#52EABC' : '#ffffff', fill: isActive ? '#52EABC' : '#DEF8FC'}
            )}
            to="/update"
          >
            <UpdateIco className="menulist-link__ico"/>
            <p>Обновления</p>
          </NavLink>
        </li>
        <li className={`${isDay ? "menulist__item_day" : "menulist__item_night"}`}>
          <NavLink
            className={`${
              isDay ? "menulist__link_day" : "menulist__link_night"
            }`}
            style={({isActive}) => (
              isDay ?
                {color: isActive ? '#08458E' : '#101420', fill: isActive ? '#08458E' : '#1E85FF'}
                :
                {color: isActive ? '#52EABC' : '#ffffff', fill: isActive ? '#52EABC' : '#DEF8FC'}
            )}
            to="/settings"
          >
            <GearIco className="menulist-link__ico"/>
            <p>Настройки</p>
          </NavLink>
        </li>
        <li className={`${isDay ? "menulist__item_day" : "menulist__item_night"}`}>
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
          <li className={`${isDay ? "menulist__item_day" : "menulist__item_night"}`}>
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
          <li className={`${isDay ? "menulist__item_day" : "menulist__item_night"}`}>
            <Link
              className={`${
                isDay ? "menulist__link_day" : "menulist__link_night"
              }`}
              to="/ip"
            >
              <img alt="иконка меню" src={isDay ? ip : ipNight} />
              <p className={`${isDay ? "mobilelist__text-day" : "mobilelist__text-night"}`}>{userIp}</p>
            </Link>
          </li>
        </ul>
      ) : null}
    </>
  );
};

export default NavMenu;
