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
import Modal from "../Modal/Modal";

import { numberTimes } from "../../utils/utils";
import classNames from "classnames";

import "./ModalAddNumberPeriod.scss";

const ModalAddNumberPeriod = ({ isOpenNumberPeriod, onNumberPeriodClose, triggerInModal }) => {
  const isDay = useSelector((state) => state.isDay);

  const inputNumberRef = useRef(null);
  const inputPeriodRef = useRef(null);
  const [numberValue, setNumberValue] = useState(triggerInModal?.triggerServer?.number);

  return (
    <div
      className={classNames("modal", {
        "modal-script-add-move--open": isOpenNumberPeriod,
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
            <button onClick={() => onNumberPeriodClose(inputNumberRef.current.value, inputPeriodRef.current.value)} className="modal-script-add-move__close">
              <img src={isDay ? closeDay : closeNight} alt="Close" />
            </button>
          </div>
        </div>
        <div className="modal-script-add-move__body">
                  <input
                    defaultValue={triggerInModal?.triggerServer?.number}
                    ref={inputNumberRef}
                    type="number"
                    min={0}
                    onInput={e => setNumberValue(e.target.value)}
                  />
                  <span>{numberTimes(inputNumberRef?.current?.value)} через каждые</span>

                  <input
                    defaultValue={triggerInModal?.triggerServer?.period}
                    ref={inputPeriodRef}
                    type="number"
                    min={0}
                  />
                  <span>минут</span>
        </div>
        <button onClick={() => onNumberPeriodClose(inputNumberRef.current.value, inputPeriodRef.current.value)}>Применить</button>
      </div>
    </div>
  );
};

export default ModalAddNumberPeriod;
