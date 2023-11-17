import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
//import NavList from "../components/NavList/NavList";
//import { toggleIsModalScriptOpen, setIsMove } from "../store/actions";
import ModalScript from "../components/ModalScript/ModalScript";
import ModalScriptAddMove from "../components/ModalScriptAddMove/ModalScriptAddMove";
import ScriptItem from "../components/ScriptItem/ScriptItem";
//import DelayTimer from "../components/DelayTimer/DelayTimer";

import back from "../img/icons/menu-day/back-day.svg";
import backNight from "../img/icons/menu-night/back-night.svg";
import pen from "../img/pen-day.svg";
import penNight from "../img/pen-night.svg";

import run from "../img/play-day.svg";
import runNight from "../img/play-night.svg";
import save from "../img/save-day.svg";
import saveNight from "../img/save-night.svg";
import plus from "../img/plus-day.svg";
import plusNight from "../img/plus-night.svg";
//import importDay from "../img/import/import-day.svg";
//import importNight from "../img/import/import-night.svg";

import "./RobotScript.scss";

// страница создания и редактирования мимик; где карточки
const RobotScript = () => {
  const isDay = useSelector((state) => state.isDay);
  const { scriptId } = useParams();
  const { request, loading, error, clearError } = useHttp();
  const [inputValue, setInputValue] = useState();
  const [isModalScriptOpen, setIsModalScriptOpen] = useState(false);
  const [isModalScriptAddMoveOpen, setIsModalScriptAddMoveOpen] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [moves, setMoves] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const isTablet = useMediaQuery({
    query: "(max-width: 850px)",
  });

    useEffect(() => {
      if (scriptId) {
        const fetchData = async () => {
          const response = await request(`http://localhost:8000/api/script/${scriptId}`);// получить сценарий по id
          const data = await response;
          //console.log(data)
          //setThisScript(data);
          setInputValue(data.name);
        };
        fetchData();
      } else {
        setInputValue("Новый сценарий");
      }
    }, [])

  const inputRef = useRef(null);
  //const dispatch = useDispatch();
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

  const saveFunc = (obj) => {
    const res = items.map((item) => {
      if (item.id === obj.id) {
        return obj;
      } else {
        return item;
      }
    });
    setItems(res);
    console.log(obj); //данные для put запроса (mimic)
  };

  const addScriptHandler = () => { // для кнопки "создать cсценарий"
    setItems([...items, {
      "name": "test", //имя
      "active": true,
      "triggers": [ //массив id тригерров
        1
      ],
      "move": [ //массив id движений
        1
      ]
    }])
  }
  const saveHandler = () => { // доделать if на put запрос - при редактировании (или пут или пост)
    items.forEach(async(item) => {
      //console.log(item);
      // если есть id то редактирование
      if (item.id) {
        const itemId = item.id;
        delete item.id;
        await request(`http://localhost:8000/api/script/${itemId}/`, "put",
        JSON.stringify(item));
      }
      // создание
      else {
        await request("http://localhost:8000/api/script/", "post",
        JSON.stringify(item));
      }
    })
  }

  const addScriptItemHandler = () => {
    setIsModalScriptOpen(true);
  }
  const addScriptMoveHandler = () => {
    setIsModalScriptAddMoveOpen(true);
  }
  // срабатывает, когда в попапе выбираем тригеры(условия)
  const onTriggerSelect = (triggerFromPopup) => {
    console.log(triggerFromPopup);
    setTriggers([...triggers, triggerFromPopup.triggerServer]);

  }
  const onModalScriptClose = () => {
    setIsModalScriptOpen(false);
    setIsModalScriptAddMoveOpen(false);
  }

  const handlePlayScript = async () => {
    await fetch(`http://localhost:8000/api/run_script/${scriptId}/`, {method:"POST"});
    console.log(scriptId, "run");
  }

  //запрос на сохранение/перезапись сценария
  const handleSaveScript = async () => {

    // const res = await request("http://localhost:8000/api/save_mimic_items/", "post",
    //   JSON.stringify({
    //     id: scriptId,
    //     name: inputValue,
    //     mimic_items: items
    //   }));
    //console.log(res);
    //console.log("navigate to /script")
    navigate(-1);
  }
  // срабатывает когда нажали импорт в попапе с движением
  const onMoveImport = (moveId, moveText) => {
    console.log("onMoveImport", moveId, moveText);
    onModalScriptClose();
    setMoves([...moves, {
      id: moveId,
      text: moveText,
    }]);
  }

  return (
    <div className="robot-script">
      <div
        className={classNames("robot-script__header", {
          "robot-script__header--day": isDay,
          "robot-script__header--night": !isDay,
        })}
      >
        <div className="robot-script__data">
          <Link
            className={classNames("robot-script__back", {
              "robot-script__back--day": isDay,
              "robot-script__back--night": !isDay,
            })}
            to={"/scenarios"}
          >
            <img src={isDay ? back : backNight} alt="Back" />
            <p>Сценарии</p>
          </Link>
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="robot-script__form"
          >
            <input
              className="robot-script__input"
              ref={inputRef} // Привязка рефа к инпуту
              type="text"
              placeholder={inputValue}
              name="inputName"
              id="inputName"
              readOnly
            />
            <label
              onClick={(e) => handleLabelClick(e)}
              htmlFor="inputName"
              className="robot-script__edit"
            >
              <img src={isDay ? pen : penNight} alt="" />
            </label>
          </form>
        </div>
        <div className="robot-script__btns">
          <button
            className="robot-script__btn"
            onClick={handlePlayScript}
          >
            <img src={isDay ? run : runNight} alt="Run" />
          </button>
          <button
            className="robot-script__btn"
            onClick={handleSaveScript}
          >
            <img src={isDay ? save : saveNight} alt="Save" />
          </button>
        </div>
      </div>
      <div className="robot-script__list">
      <ul className="robot-script__reorder">
          {items &&
            items.map((item) => {
              return (
                <ScriptItem
                  card={item}
                  scriptId={item.id}
                  key={item.id}
                  name={item.name}
                  active={item.active}
                  triggers={item.triggers}
                  move={item.move}
                  saveFunc={saveFunc}
                  //deleteScriptItem={deleteScriptItem}
                ></ScriptItem>
              );
            })}
        </ul>
      </div>
      <div className="robot-script__control">
        <div className="robot-script__add-col">
          <div className="robot-script__add-col-title">
            Если:
          </div>
          {triggers.map((triger) => <div>{triger.trigger_type}{triger.name}</div>)}
          <button
            className={classNames("robot-script-add__btn", {
              "robot-script-add__btn--day": isDay,
              "robot-script-add__btn--night": !isDay,
            })}
            onClick={addScriptItemHandler}
          >
            <img src={isDay ? plus : plusNight} alt="Plus" /> Добавить условие
          </button>
        </div>
        <div className="robot-script__add-col">
          <div className="robot-script__add-col-title">
            То:
          </div>
          {moves.map((move) => <div>{move.id}{move.text}</div>)}
          <button
            className={classNames("robot-script-add__btn", {
              "robot-script-add__btn--day": isDay,
              "robot-script-add__btn--night": !isDay,
            })}
            onClick={addScriptMoveHandler}
          >
            <img src={isDay ? plus : plusNight} alt="Plus" /> Добавить действие
          </button>
        </div>
      </div>
      {/*isTablet ? (
        <>
          {isDay ? (
            <div className="App__bottom">
              <NavList></NavList>
            </div>
          ) : (
            <div className="App__bottom--night">
              <NavList></NavList>
            </div>
          )}
        </>
          ) : null*/}
      <ModalScript
          onTriggerSelect={onTriggerSelect}
          isOpen={isModalScriptOpen}
          onClose={onModalScriptClose}
      ></ModalScript>
      <ModalScriptAddMove
          isOpen={isModalScriptAddMoveOpen}
          onClose={onModalScriptClose}
          onMoveImport={onMoveImport}
      ></ModalScriptAddMove>
    </div>
  );
};

export default RobotScript;
