import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
//import ListItem from "../ListItem/ListItem";

import closeDay from "../../img/movesItem/delete-day.svg";
import closeNight from "../../img/movesItem/delete-night.svg";

import face from "../../img/script-day/face.svg"
import clock from "../../img/script-day/clock.svg"
import { ReactComponent as ClockIco } from "../../img/script-day/clock.svg"
import power from "../../img/script-day/power.svg"
import sign from "../../img/script-day/sign.svg"
import phrase from "../../img/script-day/mic.svg"

import faceNight from "../../img/script-night/face-night.svg"
import clockNight from "../../img/script-night/clock-night.svg"
import powerNight from "../../img/script-night/power-night.svg"
import signNight from "../../img/script-night/sign-night.svg"
import phraseNight from "../../img/script-night/mic-night.svg"

import classNames from "classnames";

import "./ModalScriptAddTrigger.scss";

const ModalScriptAddTrigger = ({onTriggerSelect, isOpen, onClose, easingStart}) => {
  const isDay = useSelector((state) => state.isDay);

  const { request, loading } = useHttp();
  const [filteredItems, setFilteredItems] = useState([
    {value: "time", title: "Время", ico: clock, icoNight: clockNight, triggerServer: {
      "name": "Время",
      "trigger_type": 3,
      "busy": true,
      "phrase": "string",
      "face_encoding": "string",
      "face": "string",
      "gesture_landmarks": "string",
      "time": "string",
      "startup": true,
      "week": "0000000",
      "period": 0,
      "number": 0
    }},
    {value: "play", title: "Запуск системы", ico: power, icoNight: powerNight, triggerServer: {
      "name": "Запуск системы",
      "trigger_type": 4,
      "busy": true,
      "phrase": "string",
      "face_encoding": "string",
      "face": "string",
      "gesture_landmarks": "string",
      "time": "string",
      "startup": true,
      "week": 0,
      "period": 0,
      "number": 0
    }},
    {value: "face", title: "Лицо", ico: face, icoNight: faceNight, triggerServer: {
      "name": "Лицо",
      "trigger_type": 1,
      "busy": true,
      "phrase": "string",
      "face_encoding": "string",
      "face": "string",
      "gesture_landmarks": "string",
      "time": "string",
      "startup": true,
      "week": 0,
      "period": 0,
      "number": 0
    }},
    {value: "sign", title: "Жест", ico: sign, icoNight: signNight, triggerServer: {
      "name": "Жест",
      "trigger_type": 2,
      "busy": true,
      "phrase": "string",
      "face_encoding": "string",
      "face": "string",
      "gesture_landmarks": "string",
      "time": "string",
      "startup": true,
      "week": 0,
      "period": 0,
      "number": 0
    }},
    {value: "phrase", title: "Фраза", ico: phrase, icoNight: phraseNight, triggerServer: {
      "name": "Фраза",
      "trigger_type": 0,
      "busy": true,
      "phrase": "string",
      "face_encoding": "string",
      "face": "string",
      "gesture_landmarks": "string",
      "time": "string",
      "startup": false,
      "week": 0,
      "period": 0,
      "number": 0
    }},
  ]);

  const handleModalClose = () => {
    onClose();
  };

  return (
    <div
      className={classNames("modal", {
        "modal-script--open": isOpen,
      })}
    >
      <div
        className={classNames("modal-script__inner", {
          "modal-script__inner--day": isDay,
          "modal-script__inner--night": !isDay,
        })}
      >
        <div className="modal-script__header">
          <div className="modal-script__header-top">
            <h2 className="modal-script__title">
              Добавить условие
            </h2>
            <button onClick={handleModalClose} className="modal-script__close">
              <img src={isDay ? closeDay : closeNight} alt="Close" />
            </button>
          </div>
        </div>
        <div className="modal-script__body">
          <ul className="modal-script__list">
            {loading ? (
              <h2>Идёт загрузка данных</h2>
            ) : (
              filteredItems.map((item, id) => {
                return (
                  <li
                    className={classNames("modal-script__item", {
                      "modal-script__item--day": isDay,
                      "modal-script__item--night": !isDay,
                    })}
                    onClick={() => {
                      onTriggerSelect(item);
                      // закрыть модальное окно
                      onClose();
                    }}
                    key={id}
                  >
                    <img src={isDay ? item.ico : item.icoNight} alt="Face" />
                    <div>{item.title}</div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalScriptAddTrigger;
