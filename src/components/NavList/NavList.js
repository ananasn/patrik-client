import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavList.scss";

import { toggleIsDialogPopupOpen } from "../../store/actions";

import {ReactComponent as ScenarioIco} from "../../img/icons/menu-day/scenario.svg";
import {ReactComponent as RecognitionIco} from "../../img/icons/menu-day/recognition.svg";
import {ReactComponent as MotionIco} from "../../img/icons/menu-day/move.svg";
import {ReactComponent as EmotionIco} from "../../img/icons/menu-day/mim.svg";

import dialog from "../../img/icons/menu-day/dialog.svg";
import dialogNight from "../../img/icons/menu-night/dialog-night.svg";

const NavList = () => {
  const isDay = useSelector((state) => state.isDay);
  const dispatch = useDispatch();

  return (
    <ul className="navlist">
      <li className={`${isDay ? "navlist__item_day" : "navlist__item_night"}`}>
        <NavLink
          className={`${isDay ? "navlist__link_day" : "navlist__link_night"}`}
          style={({isActive}) => (
            isDay ?
              {color: isActive ? '#08458E' : '#101420', fill: isActive ? '#08458E' : '#1E85FF'}
              :
              {color: isActive ? '#52EABC' : '#ffffff', fill: isActive ? '#52EABC' : '#DEF8FC'}
          )}
          to="/scenarios"
        >
          <ScenarioIco className="nav-link__ico"/>
          <p>Сценарии</p>
        </NavLink>
      </li>
      <li className={`${isDay ? "navlist__item_day" : "navlist__item_night"}`}>
        <Link
          className={`${isDay ? "navlist__link_day" : "navlist__link_night"}`}
          to="/dialog"
          onClick={() => dispatch(toggleIsDialogPopupOpen())}
        >
          <img alt="иконка меню" src={isDay ? dialog : dialogNight} />
          <p>Диалог</p>
        </Link>
      </li>
      <li className={`${isDay ? "navlist__item_day" : "navlist__item_night"}`}>
        <NavLink
          className={`${isDay ? "navlist__link_day" : "navlist__link_night"}`}
          style={({isActive}) => (
            isDay ?
              {color: isActive ? '#08458E' : '#101420', fill: isActive ? '#08458E' : '#1E85FF', stroke: isActive ? '#08458E' : '#1E85FF'}
              :
              {color: isActive ? '#52EABC' : '#ffffff', fill: isActive ? '#52EABC' : '#DEF8FC', stroke: isActive ? '#52EABC' : '#DEF8FC'}
          )}
          to="/recognition"
        >
          <RecognitionIco className="nav-link__ico"/>
          <p>Распознавание</p>
        </NavLink>
      </li>
      <li className={`${isDay ? "navlist__item_day" : "navlist__item_night"}`}>
        <NavLink
          className={`${isDay ? "navlist__link_day" : "navlist__link_night"}`}
          style={({isActive}) => (
            isDay ?
              {color: isActive ? '#08458E' : '#101420', fill: isActive ? '#08458E' : '#1E85FF', stroke: isActive ? '#08458E' : '#1E85FF'}
              :
              {color: isActive ? '#52EABC' : '#ffffff', fill: isActive ? '#52EABC' : '#DEF8FC', stroke: isActive ? '#52EABC' : '#DEF8FC'}
          )}
          to="/moves"
        >
          <MotionIco className="nav-link__ico" />
          <p>Движения</p>
        </NavLink>
      </li>
      <li className={`${isDay ? "navlist__item_day" : "navlist__item_night"}`}>
        <NavLink
          className={`${isDay ? "navlist__link_day" : "navlist__link_night"}`}
          style={({isActive}) => (
            isDay ?
              {color: isActive ? '#08458E' : '#101420', stroke: isActive ? '#08458E' : '#1E85FF'}
              :
              {color: isActive ? '#52EABC' : '#ffffff', stroke: isActive ? '#52EABC' : '#DEF8FC'}
          )}
          to="/emotions"
        >
          <EmotionIco className="nav-link__ico" />
          <p>Мимика</p>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavList;
