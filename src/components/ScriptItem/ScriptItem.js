import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import plus from "../../img/plus-day.svg";

import plusNight from "../../img/plus-night.svg";


import "./ScriptItem.scss";
let start = 0;
const generateCode = (function (){
  return () => ++start;
}());
// блок с лицом
const ScriptItem = ({
  card,
  scriptId,
  name,
  triggers,
  move,
  saveFunc,
}) => {


  const [isReadOnly, setIsReadOnly] = useState(true);
  const [showItem, setShowItem] = useState(true);
  const isDay = useSelector((state) => state.isDay);

  return (
    <li
      className={classNames("script-item", {
        "script-item--day": isDay,
        "script-item--night": !isDay,
        "script-item--show": showItem,
        "script-item--hide": !showItem,
      })}
    >
      <div className="script-item__body-item">
        <div
          className={classNames("script-item-robot", {
            robot_day: isDay,
            robot_night: !isDay,
          })}
        >
          {isDay ? (
            <>
              <div>
                trigger            move
              </div>
              <div>
                Или
              </div>
            </>
          ) : (
            <>
              <div>
                trigger            move
              </div>
              <div>
                Или
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default ScriptItem;
