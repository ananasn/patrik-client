import { useSelector, /*useDispatch*/ } from "react-redux";
import classNames from "classnames";
import {ReactComponent as UpdateIco} from "../../img/icons/menu-day/update.svg";

import './UpdateMessage.scss';

const UpdateMessage = () => {
  const isDay = useSelector((state) => state.isDay);
  //const dispatch = useDispatch();

  return (
    <div
    className={classNames("updatemessage", {
      updatemessage_day: isDay,
      updatemessage_night: !isDay,
    })}
    >
      <div className="updatemessage__container">
        <UpdateIco />
        <h2
          className={classNames("updatemessage__title", {
            updatemessage__title_day: isDay,
            updatemessage__title_night: !isDay,
          })}
        >
          Доступно обновление
        </h2>
      </div>
      <div className="updatemessage__buttons-container">
        <button
          className={classNames("updatemessage__button_colored", {
            updatemessage__button_colored_day: isDay,
            updatemessage__button_colored_night: !isDay,
          })}
        >
          Обновить сейчас
        </button>
        <button
          className={classNames("updatemessage__button", {
            updatemessage__button_day: isDay,
            updatemessage__button_night: !isDay,
          })}
          //onClick={handleClick}
        >
          Напомнить позже
        </button>
      </div>
    </div>
  );
};

export default UpdateMessage;