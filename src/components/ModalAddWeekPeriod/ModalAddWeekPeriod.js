import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import ListItem from "../ListItem/ListItem";

import closeDay from "../../img/movesItem/delete-day.svg";
import closeNight from "../../img/movesItem/delete-night.svg";

import scriptMove from "../../img/script-day/scriptMove.svg"
import scriptMoveNight from "../../img/script-night/scriptMove-night.svg"
import timer from "../../img/script-day/timer.svg"
import { toggleIsModalOpen, setIsMove } from "../../store/actions";
import timerNight from "../../img/script-night/timer-night.svg"
import Modal from "../../components/Modal/Modal";


import classNames from "classnames";

import "./ModalAddWeekPeriod.scss";

const ModalAddWeekPeriod = ({ isOpenWeekPeriod, onWeekPeriodClose, weekDefaultModal, periodDefaultModal}) => {
  const isDay = useSelector((state) => state.isDay);

  const inputWeekRef = useRef(null);
  const inputPeriodRef = useRef(null);

  return (
    <div
      className={classNames("modal", {
        "modal-script-add-move--open": isOpenWeekPeriod,
      })}
    >
      <div
        className={classNames("modal-script-add-move__inner", {
          "modal-script-add-move__inner--day": isDay,
          "modal-script-add-move__inner--night": !isDay,
        })}
      >
        <div className="modal-script-add-move__header">
          <div className="modal-script-add-move__header-top">
            <h2 className="modal-script-add-move__title">
              Повторно срабатывать
            </h2>
            <button onClick={onWeekPeriodClose} className="modal-script-add-move__close">
              <img src={isDay ? closeDay : closeNight} alt="Close" />
            </button>
          </div>
        </div>
        <div className="modal-script-add-move__body">
                  <input
                    defaultValue={weekDefaultModal}
                    ref={inputWeekRef}
                  />
                  <span>раз через каждые</span>

                  <input
                    defaultValue={periodDefaultModal}
                    ref={inputPeriodRef}
                  />
                  <span>минут</span>
        </div>
        <button onClick={() => onWeekPeriodClose(inputWeekRef.current.value, inputPeriodRef.current.value)}>Применить</button>
      </div>
    </div>
  );
};

export default ModalAddWeekPeriod;
