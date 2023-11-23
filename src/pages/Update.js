import { useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import {ReactComponent as UpdateIco} from "../img/icons/menu-day/update.svg";

import "./Update.scss";

const Update = () => {
  const isDay = useSelector((state) => state.isDay);
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <div
      className={classNames("update", {
        update_day: isDay,
        update_night: !isDay,
      })}
    >
      <UpdateIco />
      <h2
        className={classNames("update__title", {
          update__title_day: isDay,
          update__title_night: !isDay,
        })}
      >
        {isUpdate ? "Доступно обновление" : "У вас последняя версия ПО"}
      </h2>
      <p
        className={classNames("update__version", {
          update__version_day: isDay,
          update__version_night: !isDay,
        })}
      >
        версия 3.33.9
      </p>
      {isUpdate ? (
        <p className="update__description">В новой версии доступны трали вали и прочие чудеса</p>
      ): null}
      {isUpdate ? (
        <div className="update__buttons-container">
          <button
            className={classNames("update__button_colored", {
              update__button_colored_day: isDay,
              update__button_colored_night: !isDay,
            })}
          >
            Обновить сейчас
          </button>
          <button
            className={classNames("update__button", {
              update__button_day: isDay,
              update__button_night: !isDay,
            })}
          >
            Напомнить позже
          </button>
        </div>
      ): null}
    </div>
  );
};
export default Update;