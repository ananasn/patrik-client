import { useState, useEffect } from "react";
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

import "./ModalScriptAddMove.scss";

const ModalScriptAddMove = ({onScriptChange, isOpen, onClose, easingStart, onMoveImport}) => {
  const isDay = useSelector((state) => state.isDay);

  const { request, loading } = useHttp();
  const [filteredItems, setFilteredItems] = useState([
    {value: "scriptMove", title: "Движение", ico: scriptMove, icoNight: scriptMoveNight},
    {value: "timer", title: "Задержка", ico: timer, icoNight: timerNight},
  ]);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    onClose();
  };
  const handleImport = () => {
    dispatch(setIsMove(true));
    dispatch(toggleIsModalOpen());
  };
  //TODO при клике на задержку в сценарии - открывается попап с задержкой
  const handleDelay = () => {

  };

  return (
    <div
      className={classNames("modal", {
        "modal-script-add-move--open": isOpen,
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
              Добавить действие
            </h2>
            <button onClick={handleModalClose} className="modal-script-add-move__close">
              <img src={isDay ? closeDay : closeNight} alt="Close" />
            </button>
          </div>
        </div>
        <div className="modal-script-add-move__body">
          <ul className="modal-script-add-move__list">
            {loading ? (
              <h2>Идёт загрузка данных</h2>
            ) : (
              <>
                <li
                  className={classNames("modal-script-add-move__item", {
                    "modal-script-add-move__item--day": isDay,
                    "modal-script-add-move__item--night": !isDay,
                  })}
                >
                  <img src={isDay ? scriptMove : scriptMoveNight} alt="Face" />
                  <div
                    onClick={handleImport}
                  >
                    Движение
                  </div>
                </li>
                <li
                  className={classNames("modal-script-add-move__item", {
                    "modal-script-add-move__item--day": isDay,
                    "modal-script-add-move__item--night": !isDay,
                  })}
                >
                  <img src={isDay ? timer : timerNight} alt="Face" />
                  <div
                    onClick={handleDelay}
                  >
                    Задержка
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Modal
        onMoveImport={onMoveImport}
      ></Modal>
    </div>
  );
};

export default ModalScriptAddMove;
