import classnames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import "./ListScript.scss";
import { useState } from "react";

const ListScript = ({
  text,
  id,
  active,
  isScene = false,
  isModal = false,
  deleteScript
}) => {
  const isDay = useSelector((state) => state.isDay);
  const { request, loading } = useHttp();
  //active приходит с сервера в списке скриптов
  const [power, setPower] = useState(active);

  const handleDelete = () => {
    deleteScript(id);
    //console.log(id)
  }
  const handlePlay = async () => {
    await fetch(`http://localhost:8000/api/run_script/${id}/`, {method:"POST"});
    // console.log(id, "run script");
  }

  const handlePower = async () => {
    const res = await request(`http://localhost:8000/api/activate_script/${id}/`, "post",
      JSON.stringify({
        active: !power,
      }));
    console.log(id, "run power");
    setPower(!power);
  }
  if (loading) {
    return <h1 className="loading-text" style={{ textAlign: "center" }}>Идёт загрузка...</h1>;
  }
  return (
    <li
      className={classnames("script__item", {
        script__item_day: isDay,
        script_item_night: !isDay,
      })}
    >
      <p className="script__text">{text}</p>
      <div className="script__btns">
        {isScene && (
          <button
            className={classnames("script__btn", {
              script__btn_off_day: isDay,
              script__btn_off_night: !isDay,
            })}
          ></button>
        )}
        {isModal ? (
          <button
            className={classnames("script__btn", {
              script__btn_import_day: isDay,
              script__btn_import_night: !isDay,
            })}
          ></button>
        ) : (
          <>
            <button
              className={classnames("script__btn", {
                script__btn_power_day: isDay,
                script__btn_power_night: !isDay,
                script__btn_power_disabled: power == false,
                script__btn_power_disabled_night: !isDay & power == false,
              })}
              onClick={handlePower}
            ></button>
            <button
              className={classnames("script__btn", {
                script__btn_delete_day: isDay,
                script__btn_delete_night: !isDay,
              })}
              onClick={handleDelete}
            ></button>
            <Link
              className={classnames("script__btn", {
                script__btn_settings_day: isDay,
                script__btn_settings_night: !isDay,
              })}
              to={`/script/${id}`}
            ></Link>
          </>
        )}
        <button
          className={classnames("script__btn", {
            script__btn_play_day: isDay,
            script__btn_play_night: !isDay,
          })}
          onClick={handlePlay}
        ></button>
      </div>
    </li>
  );
};

export default ListScript;
