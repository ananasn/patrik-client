import classnames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./ListItem.scss";

const ListItem = ({
  text,
  id,
  isScene = false,
  isModal = false,
  onClick,
}) => {
  const isDay = useSelector((state) => state.isDay);
  return (
    <li
      className={classnames("moves__item", {
        moves__item_day: isDay,
        moves__item_night: !isDay,
      })}
      onClick={onClick}
    >
      <p className="moves__text">{text}</p>
      <div className="moves__btns">
        {isScene && (
          <button
            className={classnames("moves__btn", {
              moves__btn_off_day: isDay,
              moves__btn_off_night: !isDay,
            })}
          ></button>
        )}
        {isModal ? (
          <button
            className={classnames("moves__btn", {
              moves__btn_import_day: isDay,
              moves__btn_import_night: !isDay,
            })}
          ></button>
        ) : (
          <>
            <button
              className={classnames("moves__btn", {
                moves__btn_delete_day: isDay,
                moves__btn_delete_night: !isDay,
              })}
            ></button>
            <Link
              className={classnames("moves__btn", {
                moves__btn_settings_day: isDay,
                moves__btn_settings_night: !isDay,
              })}
              to={`/move/${id}`}
            ></Link>
          </>
        )}
        <button
          className={classnames("moves__btn", {
            moves__btn_play_day: isDay,
            moves__btn_play_night: !isDay,
          })}
        ></button>
      </div>
    </li>
  );
};

export default ListItem;
