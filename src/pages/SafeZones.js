import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";

import {ReactComponent as BackIco} from "../img/icons/menu-day/back.svg";

import './SafeZones.scss';

const SafeZones = () => {
  const isDay = useSelector((state) => state.isDay);
  const navigate = useNavigate();
    const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="safezones__wrapper">
      <div
        className={classnames("safezones", {
          safezones_day: isDay,
          safezones_night: !isDay,
        })}
      >
        <div className="safezones__content">
          <div
            className={classnames("safezones__header", {
              safezones__header_day: isDay,
              safezones__header_night: !isDay,
            })}
          >
            <button
              onClick={goBack}
              className={classnames("safezones__back-btn", {
                "safezones__back-btn_day": isDay,
                "safezones__back-btn_night": !isDay,
              })}
            >
              <BackIco />
              Безопасные зоны
            </button>
          </div>
          <div className="safezones__container">
            <p className="safezones__description">
              Настройка безопасных зон необходима, чтобы робот в процессе эксплуатации не столкнулся конечностью с внешним припятствием
            </p>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeZones;