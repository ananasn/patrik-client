import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import ModalScriptAddTrigger from "../components/ModalScriptAddTrigger/ModalScriptAddTrigger";
import ModalScriptAddMove from "../components/ModalScriptAddMove/ModalScriptAddMove";
//import ScriptItem from "../components/ScriptItem/ScriptItem";

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
import scriptMove from "../img/script-day/scriptMove.svg";
import scriptMoveNight from "../img/script-night/scriptMove-night.svg";
import deleteItem from "../img/movesItem/delete-day.svg";
import deleteItemNight from "../img/movesItem/delete-night.svg";
import timerDay from "../img/timer/timer-day.svg";
import timerNight from "../img/timer/timer-night.svg";

import {ReactComponent as CloseItemIco} from '../img/close.svg';

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
  const dispatch = useDispatch();
  const [moves, setMoves] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [buttonText, setButtonText] = useState('или');
  const [delayValue, setDelayValue] = useState(0); //delay из бека
  // 0 - кнопка Добавить задержку 1 - инпут 2 - значение без инпута
  const [delayView, setDelayView] = useState(delayValue === 0 ? 0 : 2);
  const delayRef = useRef(null);
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

  // const saveFunc = (obj) => {
  //   const res = items.map((item) => {
  //     if (item.id === obj.id) {
  //       return obj;
  //     } else {
  //       return item;
  //     }
  //   });
  //   setItems(res);
  //   console.log(obj); //данные для put запроса (mimic)
  // };

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
    //console.log(triggerFromPopup);
    setTriggers([...triggers, triggerFromPopup.triggerServer]);
    setFilteredItems([...filteredItems, triggerFromPopup]);

  }
  const onModalScriptClose = () => {
    setIsModalScriptOpen(false);
    setIsModalScriptAddMoveOpen(false);
  }

  const handlePlayScript = async () => {
    await fetch(`http://localhost:8000/api/run_script/${scriptId}/`, {method:"POST"});
    //console.log(scriptId, "run");
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

  //меняем текст на кнопке ИЛИ\И по клику
  const onBtnIliTextChange = () => {
    setButtonText(buttonText === 'или' ? 'и' : 'или');
  }
//todo: реализовать одну ф-ю вместо трех
  const deleteMove = (move) => {
    let index = moves.indexOf(move);
    setMoves([...moves.slice(0, index), ...moves.slice(index + 1)]);
  }

  const deleteTrigger = (item) => {
    console.log("triger delete");
    let index = filteredItems.indexOf(item);
    setFilteredItems([...filteredItems.slice(0, index), ...filteredItems.slice(index + 1)]);
  }

  //удалить задержку
  const handleDelete = () => {
    setDelayView(0);
    setDelayValue(0);
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
      {/*<div className="robot-script__list">
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
          </div>*/}
      <div className="robot-script__control">
        <div className="robot-script__add-col">
          <div className="robot-script__add-col-title">
            Если:
          </div>
          <div className="robot-script__add-col-trigger">
            {filteredItems.map((item) =>
              <div className="robot-script__add-col-trigger-items">
                <div
                  className={classNames("robot-script__add-col-trigger-item", {
                    "robot-script__add-col-trigger-item--day": isDay,
                    "robot-script__add-col-trigger-item--night": !isDay,
                  })}
                >
                  <div className="robot-script__add-col-trigger-name">
                    <div
                      className={classNames("robot-script__add-col-trigger-name-inner", {
                        "robot-script__add-col-trigger-name-inner--day": isDay,
                        "robot-script__add-col-trigger-name-inner--night": !isDay,
                      })}
                    >
                      <img src={isDay ? item.ico : item.icoNight} alt="Face" />
                      {item.triggerServer.name}
                      {item.triggerServer.trigger_type === 3 && <div>12:15</div>}
                    </div>
                    <button className="robot-script__btnDlt" onClick={() => deleteTrigger(item)}>
                      <img src={isDay ? deleteItem : deleteItemNight} alt="Delete" />
                    </button>
                  </div>
                  {/* Для Фраза див */}
                  {item.triggerServer.trigger_type === 0 &&
                    <div>
                      <input
                        placeholder="Введите текст для фразы"
                        className={classNames("robot-script__inputPhrase", {
                          "robot-script__inputPhrase--night": !isDay,
                          "robot-script__inputPhrase--day": isDay,
                        })}
                        // onKeyDown={(e) => handleSubmit(e)}
                        type="text"
                        ref={inputRef}
                      />
                      <div>Повторно срабатывать</div>
                      <div>
                        <button
                          className={classNames("robot-script-add__btnRepeat", {
                            "robot-script-add__btnRepeat--day": isDay,
                            "robot-script-add__btnRepeat--night": !isDay,
                          })}
                        >
                          каждый раз
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeat", {
                            "robot-script-add__btnRepeat--day": isDay,
                            "robot-script-add__btnRepeat--night": !isDay,
                          })}
                        >
                          через время
                        </button>
                      </div>
                    </div>
                  }
                   {/* Для Лицо див */}
                  {item.triggerServer.trigger_type === 1 &&
                    <div>
                      <div>Повторно срабатывать</div>
                      <div>
                        <button
                          className={classNames("robot-script-add__btnRepeat", {
                            "robot-script-add__btnRepeat--day": isDay,
                            "robot-script-add__btnRepeat--night": !isDay,
                          })}
                        >
                          каждый раз
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeat", {
                            "robot-script-add__btnRepeat--day": isDay,
                            "robot-script-add__btnRepeat--night": !isDay,
                          })}
                        >
                          через время
                        </button>
                      </div>
                    </div>
                  }
                  {/* Для Жест див */}
                  {item.triggerServer.trigger_type === 2 &&
                    <div>
                      <div>Повторно срабатывать</div>
                      <div>
                        <button
                          className={classNames("robot-script-add__btnRepeat", {
                            "robot-script-add__btnRepeat--day": isDay,
                            "robot-script-add__btnRepeat--night": !isDay,
                          })}
                        >
                          каждый раз
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeat", {
                            "robot-script-add__btnRepeat--day": isDay,
                            "robot-script-add__btnRepeat--night": !isDay,
                          })}
                        >
                          через время
                        </button>
                      </div>
                    </div>
                  }
                  {/* Для времени див */}
                  {item.triggerServer.trigger_type === 3 &&
                    <div>
                      <div>Повторять после выполнения:</div>
                      <button
                        className={classNames("robot-script-add__btnNotRepeat", {
                          "robot-script-add__btnNotRepeat--day": isDay,
                          "robot-script-add__btnNotRepeat--night": !isDay,
                        })}
                      >
                        не повторять/5 раз, каждые 3000 минут
                      </button>
                      <div>Повторять по дням недели:</div>
                      <div>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Пн
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Вт
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Ср
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Чт
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Пт
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Сб
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Вс
                        </button>
                      </div>
                  </div>
                  }

                  {/* Для Запуск системы див */}
                  {item.triggerServer.trigger_type === 4 &&
                    <div>
                      <div>Повторять</div>
                      <div>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Пн
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Вт
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Ср
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Чт
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Пт
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Сб
                        </button>
                        <button
                          className={classNames("robot-script-add__btnRepeatTime", {
                            "robot-script-add__btnRepeatTime--day": isDay,
                            "robot-script-add__btnRepeatTime--night": !isDay,
                          })}
                        >
                          Вс
                        </button>
                      </div>
                    </div>
                  }
                </div>
                <button
                  className={classNames("robot-script-add__btnILi", {
                    "robot-script-add__btnIli--day": isDay,
                    "robot-script-add__btnIli--night": !isDay,
                  })}
                >
                  или
                </button>
              </div>)}
          </div>
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
          <div className="robot-script__add-col-importedMovesWraper">
            {moves.map((move) => <div className="robot-script__add-col-importedMoves">
              <div className={classNames("robot-script__add-col-importedMoves-move", {
                "robot-script__add-col-importedMoves-move--day": isDay,
                "robot-script__add-col-importedMoves-move--night": !isDay,
              })}>
                <div className="robot-script__add-col-importedMoves-move-text">
                  <img src={isDay ? scriptMove : scriptMoveNight} alt="Face" />
                  {move.text}
                </div>
                <button className="robot-script__btnDlt"onClick={() => deleteMove(move)}>
                  <img src={isDay ? deleteItem : deleteItemNight} alt="Delete" />
                </button>
              </div>
              <button
                className={classNames("robot-script-add__btnILi", {
                  "robot-script-add__btnIli--day": isDay,
                  "robot-script-add__btnIli--night": !isDay,
                })}
                onClick={onBtnIliTextChange}
              >
                {buttonText}
              </button>
            </div>)}
          </div>
          <div className="robot-script__add-col-importedDelayWrapper">
            {/* Задержка */}
            { delayView === 0 && <span></span>}
            <div className="mimicitem__controller">
              {delayView === 1 && <input
                className={classNames("controler__value", {
                  "controler__value--day": isDay,
                  "controler__value--night": !isDay,
                })}
                ref={delayRef}
                value={delayValue}
                onBlur={ function(){
                  setDelayView(2);
                }}
                onInput={() => setDelayValue(delayRef.current.value) }
              />}
            </div>

            {delayView === 2 &&
              <div
                className={classNames("delay__container", {
                  "delay__container--day": isDay,
                  "delay__container--night": !isDay,
                })}
              >
                <div
                  className={classNames("delay mimicitem-add__last", {
                    "mimicitem-add__last--day": isDay,
                    "mimicitem-add__last--night": !isDay,
                  })}
                  onClick={() => setDelayView(1)}
                >
                  <img src={isDay ? timerDay : timerNight} alt="" />
                  {delayValue} мс
                  <img src={isDay ? pen : penNight} alt="" />
                </div>
                <span
                  className="delete-btn"
                  onClick={handleDelete}
                >
                  <CloseItemIco />
                </span>
              </div>}
          </div>
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
      <ModalScriptAddTrigger
          onTriggerSelect={onTriggerSelect}
          isOpen={isModalScriptOpen}
          onClose={onModalScriptClose}
      ></ModalScriptAddTrigger>
      <ModalScriptAddMove
          isOpen={isModalScriptAddMoveOpen}
          onClose={onModalScriptClose}
          onMoveImport={onMoveImport}
          setDelayView={setDelayView}
      ></ModalScriptAddMove>
    </div>
  );
};

export default RobotScript;
