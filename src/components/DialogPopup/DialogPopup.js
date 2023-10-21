import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

import { toggleIsDialogPopupOpen } from "../../store/actions";

import "./DialogPopup.scss"; // Подключение стилей

const DialogPopup = () => {
  const dispatch = useDispatch();
  const isDay = useSelector((state) => state.isDay);
  const isDialogPopupOpen = useSelector((state) => state.isDialogPopupOpen);
  return (
    <div
      className={classnames("dialog-popup", {
        "dialog-popup_day": isDay,
        "dialog-popup_night": !isDay,
        "dialog-popup_opened": isDialogPopupOpen,
      })}
    >
      <div
        className={classnames("dialog-popup__container", {
          "dialog-popup__container_day": isDay,
          "dialog-popup__container_night": !isDay,
        })}
      >
        <div className="dialog-popup__wrapper">
          <h2 class="dialog-popup__title">Выберите режим диалога</h2>
          <button
            type="button"
            className={classnames("dialog-popup__close", {
              "dialog-popup__close_day": isDay,
              "dialog-popup__close_night": !isDay,
            })}
            aria-label="закрыть"
            onClick={() => dispatch(toggleIsDialogPopupOpen())}
          />
        </div>

        <button
          className={classnames("dialog-popup__btn", {
            "dialog-popup__btn_day": isDay,
            "dialog-popup__btn_night": !isDay,
          })}
        >
          Выключен
        </button>
        <button
          className={classnames("dialog-popup__btn", {
            "dialog-popup__btn_day": isDay,
            "dialog-popup__btn_night": !isDay,
          })}
        >
          Команда + чат
        </button>
        <button
          className={classnames("dialog-popup__btn", {
            "dialog-popup__btn_day": isDay,
            "dialog-popup__btn_night": !isDay,
          })}
        >
          Команда
        </button>
        <button
          className={classnames("dialog-popup__btn", {
            "dialog-popup__btn_day": isDay,
            "dialog-popup__btn_night": !isDay,
          })}
        >
          Чат
        </button>
      </div>
    </div>
  );
};

export default DialogPopup;
