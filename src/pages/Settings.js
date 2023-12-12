import { useState, useRef, React, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import Controler from "../components/Controler/Controler";
import back from "../img/icons/menu-day/back-day.svg";
import backNight from "../img/icons/menu-night/back-night.svg";
import pen from "../img/pen-day.svg";
import penNight from "../img/pen-night.svg";
import safety from "../img/settings-day/safety.svg";
import safetyNight from "../img/settings-night/safetyNight.svg";
import key from "../img/settings-day/key.svg";
import keyNight from "../img/settings-night/keyNight.svg";
import userIcon from "../img/settings-day/userIcon.svg";
import userIconNight from "../img/settings-night/userIconNight.svg";
import themeDay from "../img/settings-day/themeDay.svg";
import themeNight from "../img/settings-night/themeNight.svg";
import volumeIco from "../img/settings-day/volume.svg";
import volumeNightIco from "../img/settings-night/volumeNight.svg";
//import { getVolume } from "../api/index";
import { API_PATH } from "../api/index";
import "./Settings.scss";
import { toggleDay } from "../store/actions";


const Settings = () => {
  const { request, loading, error, clearError } = useHttp();
  const [volume, setVolume] = useState("0");
  const isDay = useSelector((state) => state.isDay);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("Патрик 78");
  const [buttonText, setButtonText] = useState(isDay ? 'Темная тема' : 'Светлая тема');
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({
    query: "(max-width: 850px)",
  });
  const goBack = () => {
    navigate(-1);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newValue = inputRef.current.value;
    setInputValue(newValue);
    inputRef.current.value = "";
    inputRef.current.readOnly = true; // Установка readOnly после отправки формы
  };
  const handleLabelClick = (e) => {
    e.preventDefault();
    inputRef.current.readOnly = false;
    inputRef.current.focus();
  };
  function changeTheme() {
    dispatch(toggleDay());
    console.log(isDay)
    localStorage.setItem('light', isDay)
    setButtonText(isDay ? 'Светлая тема' : 'Темная тема');
  }
  useEffect(() => {
    localStorage.setItem('light', isDay)
  }, [isDay, dispatch]);

  const onInputSettings = (e) => {
    setInputValue(e.target.value);
  }
  const handleChange = async (e) => {
    setVolume(e);
    //console.log( e, "изменить громкость")
    const res = await request(`${API_PATH}api/set_volume/`, "post",
    JSON.stringify({
      volume: Number(e)
    }));
    //console.log("сохранить громкость")
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await request(`${API_PATH}api/volume/`);
      const data = await response;
      setVolume(data.volume?.toString());
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await request(`${API_PATH}api/volume/`);
      const data = await response;
      setVolume(data.volume?.toString());
    };
    fetchData();
  }, [request, volume]);

  return (
    <div className="settings__wrapper">
      <div
        className={classnames("settings", {
          settings_day: isDay,
          settings_night: !isDay,
        })}
      >

        <div className="settings__content">
          <div
            className={classnames("settings__header", {
              settings__header_day: isDay,
              settings__header_night: !isDay,
            })}
          >
            <button
              onClick={goBack}
              className={classnames("settings__back-btn", {
                "settings__back-btn_day": isDay,
                "settings__back-btn_night": !isDay,
              })}
            >
              <img
                className="settings__back-btn-img"
                alt="Back"
                src={isDay ? back : backNight}
              />
              Настройки
            </button>

          </div>

          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="settings__content_name"
          >
            <label
              onClick={(e) => handleLabelClick(e)}
              htmlFor="inputName"
              className="settings__content_edit"
            >
              Имя робота:
              <input
                className={classnames("settings__content_input", {
                  settings__content_input_day: isDay,
                  settings__content_input_night: !isDay,
                })}
                ref={inputRef} // Привязка рефа к инпуту
                type="text"
                value={inputValue}
                name="inputName"
                id="inputName"
                readOnly
                //onBlur={handleFormSubmit}
                onInput={onInputSettings}
                style={{width:`${inputValue.length*19 || 10}px`}}
              />
              <img src={isDay ? pen : penNight} alt="" />
            </label>
          </form>
          <div className={classnames("settings__content_items", {
              settings__content_items_day: isDay,
              settings__content_items_night: !isDay,
            })}
          >
            <NavLink
              className={classnames("settings__content_item", {
                settings__content_item_day: isDay,
                settings__content_item_night: !isDay,
              })}
              to='/settings/safe-zones'
            >
              <img
                className="item_img"
                alt="img"
                src={isDay ? safety : safetyNight}
              />
              <div
                className="settings__content_item_safe"
              >
                Настроить безопасные зоны
              </div>
            </NavLink>
            <NavLink
              className={classnames("settings__content_item", {
                settings__content_item_day: isDay,
                settings__content_item_night: !isDay,
              })}
              to='/settings/robot-access'
            >
              <img
                className="item_img"
                alt="img"
                src={isDay ? key : keyNight}
              />
              Доступы к роботу
            </NavLink>
            <NavLink
              className={classnames("settings__content_item", {
                settings__content_item_day: isDay,
                settings__content_item_night: !isDay,
              })}
              to='/settings/account'
            >
              <img
                className="item_img"
                alt="img"
                src={isDay ? userIcon : userIconNight}
              />
              Учетная запись
            </NavLink>
            <button className={classnames("button", ({
              button_day: isDay,
              button_night: !isDay,
              }))}
              onClick={changeTheme}
              style={{ position: "relative"}}>
              <img
                className="item_img"
                alt="img"
                src={isDay ? themeNight : themeDay}
              />
              {buttonText}
            </button>
          </div>
          <div className="settings__content_dinamic">
            <div className={classnames("settings__content_dinamic_text", ({
              settings__content_dinamic_text_day: isDay,
              settings__content_dinamic_text_night: !isDay,
            }))}>Громкость динамика</div>
            <div className="settings__content_dinamic_controler" >
              <Controler
                  maxValue={1000}
                  imgSrc={isDay ? volumeIco : volumeNightIco}
                  initialValue={volume}
                  id={"volume"}
                  onChange={(e) => handleChange(e)}
              ></Controler>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;
