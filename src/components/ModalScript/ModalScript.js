import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import ListItem from "../ListItem/ListItem";

import closeDay from "../../img/movesItem/delete-day.svg";
import closeNight from "../../img/movesItem/delete-night.svg";

import face from "../../img/script-day/face.svg"
import clock from "../../img/script-day/clock.svg"
import power from "../../img/script-day/power.svg"
import sign from "../../img/script-day/sign.svg"
import phrase from "../../img/script-day/mic.svg"

import faceNight from "../../img/script-night/face-night.svg"
import clockNight from "../../img/script-night/clock-night.svg"
import powerNight from "../../img/script-night/power-night.svg"
import signNight from "../../img/script-night/sign-night.svg"
import phraseNight from "../../img/script-night/mic-night.svg"

import classNames from "classnames";

import "./ModalScript.scss";

const ModalScript = ({onScriptChange, isOpen, onClose, easingStart}) => {
  const isDay = useSelector((state) => state.isDay);

  const { request, loading } = useHttp();
  const [filteredItems, setFilteredItems] = useState([
    {value: "time", title: "Время", ico: clock, icoNight: clockNight},
    {value: "play", title: "Запуск системы", ico: power, icoNight: powerNight},
    {value: "face", title: "Лицо", ico: face, icoNight: faceNight},
    {value: "sign", title: "Жест", ico: sign, icoNight: signNight},
    {value: "phrase", title: "Фраза", ico: phrase, icoNight: phraseNight},
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
                  /*<ListItem
                    text={item.title}
                    id={item.id}
                    key={id}
                    isModal={true}
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
                  ></ListItem>*/
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
