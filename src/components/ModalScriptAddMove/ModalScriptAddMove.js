import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import ListItem from "../ListItem/ListItem";

import closeDay from "../../img/movesItem/delete-day.svg";
import closeNight from "../../img/movesItem/delete-night.svg";

import scriptMove from "../../img/script-day/scriptMove.svg"
import timer from "../../img/script-day/timer.svg"

import scriptMoveNight from "../../img/script-night/scriptMove-night.svg"
import timerNight from "../../img/script-night/timer-night.svg"


import classNames from "classnames";

import "./ModalScriptAddMove.scss";

const ModalScript = ({onScriptChange, isOpen, onClose, easingStart}) => {
  const isDay = useSelector((state) => state.isDay);

  const { request, loading } = useHttp();
  const [filteredItems, setFilteredItems] = useState([
    {value: "scriptMove", title: "Движение", ico: scriptMove, icoNight: scriptMoveNight},
    {value: "timer", title: "Задержка", ico: timer, icoNight: timerNight},
  ]);
  // выбранные
  const [selectedScript, setSelectedScript] = useState([]);
  useEffect(() => {
    onScriptChange(selectedScript);
  }, [selectedScript]);
  // устанавливаем начальное значение
  useEffect(() => {
    const selectedScript = filteredItems.find((script) => script.value === "face");

    if (selectedScript) {
      setSelectedScript([selectedScript]);
    }
  }, []);

  const handleModalClose = () => {
    onClose();
  };
  /*const onClick = () => {
  // если скрипт уже выбран
  if (selectedScript.includes(item)) {
    let i = selectedScript.indexOf(item);
      selectedScript.splice(i, 1);
      setSelectedScript([...selectedScript]);
  } else {
  // добавляем не больше одного скрипта
  setSelectedScript([item]);

  }
  // закрыть модальное окно
  onClose();
  };*/
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
              Добавить действие
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
                      // если скрипт уже выбран
                      if (selectedScript.includes(item)) {
                        let i = selectedScript.indexOf(item);
                        selectedScript.splice(i, 1);
                        setSelectedScript([...selectedScript]);
                      } else {
                        // добавляем не больше одного скрипта
                        setSelectedScript([item]);

                      }
                      // закрыть модальное окно
                      onClose();
                    }}
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

export default ModalScript;
