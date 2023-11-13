import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import ListItemAnimation from "../ListItemAnimation/ListItemAnimation";

import closeDay from "../../img/movesItem/delete-day.svg";
import closeNight from "../../img/movesItem/delete-night.svg";

import classNames from "classnames";

import "./ModalNotification.scss";

const ModalNotification = ({isOpen, onClose}) => {
  const isDay = useSelector((state) => state.isDay);


  const handleModalClose = () => {
    onClose();
  };
  return (
    <div
      className={classNames("modal-animation", {
        "modal-animation--open": isOpen,
      })}
    >
      <div
        className={classNames("modal-animation__inner", {
          "modal-animation__inner--day": isDay,
          "modal-animation__inner--night": !isDay,
        })}
      >
        <div className="modal-animation__header">
          <div className="modal-animation__header-top">
            <h2 className="modal-animation__title">
              Ошибка
            </h2>
            <button onClick={handleModalClose} className="modal-animation__close">
              <img src={isDay ? closeDay : closeNight} alt="Close" />
            </button>
          </div>
        </div>
        <div className="modal-animation__body">
          Добавьте анимацию!!!
        </div>
      </div>
    </div>
  );
};

export default ModalNotification;
