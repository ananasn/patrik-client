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
  deleteMove
}) => {
  const isDay = useSelector((state) => state.isDay);
  const handleDelete = () => {
    deleteMove(id);
  }
  const handlePlay = async () => {
    await fetch(`http://localhost:8000/api/run_move/${id}/`, {method:"POST"});
    console.log(id, 'run move');
  }
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
              onClick={handleDelete}
            ></button>
            <Link
              className={classnames("moves__btn", {
                moves__btn_settings_day: isDay,
                moves__btn_settings_night: !isDay,
              })}
              to={`/moves/move/${id}`}
            ></Link>
          </>
        )}
        <button
          className={classnames("moves__btn", {
            moves__btn_play_day: isDay,
            moves__btn_play_night: !isDay,
          })}
          onClick={handlePlay}
        ></button>
      </div>
    </li>
  );
};

export default ListItem;
