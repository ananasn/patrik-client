import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Reorder } from "framer-motion";
import timerDay from "../../img/timer/timer-day.svg";
import timerNight from "../../img/timer/timer-night.svg";
import pen from "../../img/pen-day.svg";
import penNight from "../../img/pen-night.svg";
import dots from "../../img/movesItem/dots-day.svg";
import dotsNight from "../../img/movesItem/dots-night.svg";
import deleteItem from "../../img/movesItem/delete-day.svg";
import deleteItemNight from "../../img/movesItem/delete-night.svg";

import "./DelayTimer.scss";
import classNames from "classnames";

const DelayTimer = ({ value }) => {
  const isDay = useSelector((state) => state.isDay);
  const [inputValue, setInputValue] = useState(1000);
  const inputRef = useRef(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputRef.current.value);
  };
  return (
    <li
      className={classNames("delaytimer", {
        "delaytimer--day": isDay,
        "delaytimer--night": !isDay,
      })}
    >
      <div className="delaytimer__info">
        <img src={isDay ? timerDay : timerNight} alt="Timer" />
        <span
          className={classNames("delaytimer__word", {
            "delaytimer__word--day": isDay,
            "delaytimer__word--night": !isDay,
          })}
        >
          Задержка
        </span>
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="delaytimer__form"
        >
          <input
            ref={inputRef}
            defaultValue={inputValue}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="number"
            name="delayinput"
            className={classNames("delaytimer__input", {
              "delaytimer__input--day": isDay,
              "delaytimer__input--night": !isDay,
            })}
          />
          <span className="delaytimer__ms">мс</span>
          <label htmlFor="delayinput">
            <img src={isDay ? pen : penNight} alt="Pen" />
          </label>
        </form>
      </div>
      <div className="delaytimer__buttons">
        <button className="delaytimer__button">
          <img src={isDay ? dots : dotsNight} alt="drag" />
        </button>
        <button className="delaytimer__button">
          <img src={isDay ? deleteItem : deleteItemNight} alt="drag" />
        </button>
      </div>
    </li>
  );
};

export default DelayTimer;
