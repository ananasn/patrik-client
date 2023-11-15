import classnames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./ListMimics.scss";
// страница - список мимик
const ListMimics = ({
  text,
  id,
  isScene = false,
  isModal = false,
  deleteMimic
}) => {
  const isDay = useSelector((state) => state.isDay);
  const handleDelete = () => {
    deleteMimic(id);
    //console.log(id)
  }
  const handlePlay = async () => {
    await fetch(`http://localhost:8000/api/run_mimic/${id}/`, {method:"POST"});
    console.log(id, "run mimic");
  }
  return (
    <li
      className={classnames("mimics__item", {
        mimics__item_day: isDay,
        mimics__item_night: !isDay,
      })}
    >
      <p className="mimics__text">{text}</p>
      <div className="mimics__btns">
        {isScene && (
          <button
            className={classnames("mimics__btn", {
              mimics__btn_off_day: isDay,
              mimics__btn_off_night: !isDay,
            })}
          ></button>
        )}
        {isModal ? (
          <button
            className={classnames("mimics__btn", {
              mimics__btn_import_day: isDay,
              mimics__btn_import_night: !isDay,
            })}
          ></button>
        ) : (
          <>
            <button
              className={classnames("mimics__btn", {
                mimics__btn_delete_day: isDay,
                mimics__btn_delete_night: !isDay,
              })}
              onClick={handleDelete}
            ></button>
            <Link
              className={classnames("mimics__btn", {
                mimics__btn_settings_day: isDay,
                mimics__btn_settings_night: !isDay,
              })}
              to={`/emotions/emotion/${id}`}
            ></Link>
          </>
        )}
        <button
          className={classnames("mimics__btn", {
            mimics__btn_play_day: isDay,
            mimics__btn_play_night: !isDay,
          })}
          onClick={handlePlay}
        ></button>
      </div>
    </li>
  );
};

export default ListMimics;
