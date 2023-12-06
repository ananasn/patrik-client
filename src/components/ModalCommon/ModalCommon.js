import { useSelector } from "react-redux";
import closeDay from "../../img/movesItem/delete-day.svg";
import closeNight from "../../img/movesItem/delete-night.svg";
import classNames from "classnames";

import "./ModalCommon.scss";

const ModalCommon = ({ isOpen, onClose, content, title }) => {
  const isDay = useSelector((state) => state.isDay);

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
              {title}
            </h2>
            <button onClick={() => onClose()} className="modal-script-add-move__close">
              <img src={isDay ? closeDay : closeNight} alt="Close" />
            </button>
          </div>
        </div>
        <div className="modal-script-add-move__body">
            {content}
        </div>
      </div>
    </div>
  );
};

export default ModalCommon;
