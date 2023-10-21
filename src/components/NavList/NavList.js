import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavList.scss";

import { toggleIsDialogPopupOpen } from "../../store/actions";

import scenario from "../../img/icons/menu-day/scenario.svg";
import dialog from "../../img/icons/menu-day/dialog.svg";
import recognition from "../../img/icons/menu-day/recognition.svg";
import motion from "../../img/icons/menu-day/move.svg";
import emotions from "../../img/icons/menu-day/mim.svg";

import scenarioNight from "../../img/icons/menu-night/scenario-night.svg";
import dialogNight from "../../img/icons/menu-night/dialog-night.svg";
import recognitionNight from "../../img/icons/menu-night/recognition-night.svg";
import motionNight from "../../img/icons/menu-night/move-night.svg";
import emotionsNight from "../../img/icons/menu-night/mim-night.svg";

const NavList = () => {
  const isDay = useSelector((state) => state.isDay);
  const dispatch = useDispatch();

  return (
    <ul className="navlist">
      <li>
        <Link
          className={`${isDay ? "navlist__link_day" : "navlist__link_night"}`}
          to="/scenarios"
        >
          <img alt="иконка меню" src={isDay ? scenario : scenarioNight} />
          <p>Сценарии</p>
        </Link>
      </li>
      <li>
        <Link
          className={`${isDay ? "navlist__link_day" : "navlist__link_night"}`}
          to="/dialog"
          onClick={() => dispatch(toggleIsDialogPopupOpen())}
        >
          <img alt="иконка меню" src={isDay ? dialog : dialogNight} />
          <p>Диалог</p>
        </Link>
      </li>
      <li>
        <Link
          className={`${isDay ? "navlist__link_day" : "navlist__link_night"}`}
          to="/recognition"
        >
          <img alt="иконка меню" src={isDay ? recognition : recognitionNight} />
          <p>Распознавание</p>
        </Link>
      </li>
      <li>
        <Link
          className={`${isDay ? "navlist__link_day" : "navlist__link_night"}`}
          to="/moves"
        >
          <img alt="иконка меню" src={isDay ? motion : motionNight} />
          <p>Движения</p>
        </Link>
      </li>
      <li>
        <Link
          className={`${isDay ? "navlist__link_day" : "navlist__link_night"}`}
          to="/emotions"
        >
          <img alt="иконка меню" src={isDay ? emotions : emotionsNight} />
          <p>Мимика</p>
        </Link>
      </li>
    </ul>
  );
};

export default NavList;
