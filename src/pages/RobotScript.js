import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import ModalScriptAddTrigger from "../components/ModalScriptAddTrigger/ModalScriptAddTrigger";
import ModalScriptAddMove from "../components/ModalScriptAddMove/ModalScriptAddMove";
import ScriptTriggers from "../components/ScriptTriggers/ScriptTriggers";

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
  // const [filteredItems, setFilteredItems] = useState([]);
  const [buttonText, setButtonText] = useState('или');
  const [delayValue, setDelayValue] = useState(0); //delay из бека
  const [script, setScript] = useState({});
  // 0 - кнопка Добавить задержку 1 - инпут 2 - значение без инпута
  const [delayView, setDelayView] = useState(delayValue === 0 ? 0 : 2);
  const delayRef = useRef(null);
  //константа для колонки с действиями
  const [expressions, setExpressions] = useState([]);
  // const moves = useSelector((state) => state.moves);
  const isTablet = useMediaQuery({
    query: "(max-width: 850px)",
  });

  const fetchData = async () => {
    const response = await request(`http://localhost:8000/api/script/${scriptId}`);// получить сценарий по id
    const data = await response;
    console.log(data)
    //setThisScript(data);
    setInputValue(data.name);
    setExpressions(data.expressions);
    data.triggers.forEach(trigger => {
      trigger.week = trigger.week.toString(2);
      trigger.time = trigger.time.slice(0, 5);
      if (trigger.period === null) {
        trigger.period = 0;
      }
    });
    setTriggers(data.triggers);
    setScript(data);
  };

  useEffect(() => {
    if (scriptId) {
      fetchData();
    } else {
      setInputValue("Новый сценарий");
    }
    (async () => {
      const response = await request("http://localhost:8000/api/move/");
      const data = await response;
      setMoves(data);
    })();
  }, [])
    // console.log(moves);

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

  const addScriptItemHandler = () => {
    setIsModalScriptOpen(true);
  }
  const addScriptMoveHandler = () => {
    setIsModalScriptAddMoveOpen(true);
  }
  // срабатывает, когда в попапе выбираем тригеры(условия)
  const onTriggerSelect = (triggerFromPopup) => {
    console.log(triggerFromPopup);
    if (triggerFromPopup.triggerServer.trigger_type == 3) {
      const nowTime = new Date();
      let hours = nowTime.getHours();
      let minutes = nowTime.getMinutes();
      if (hours <= 9) {
        hours = `0${hours}`;
      }
      if (minutes <= 9) {
        minutes = `0${minutes}`;
      }
      triggerFromPopup.triggerServer.time = `${hours}:${minutes}`
    }
    setTriggers([...triggers, triggerFromPopup.triggerServer]);
    // setFilteredItems([...filteredItems, triggerFromPopup]);
  }
  const onModalScriptClose = () => {
    setIsModalScriptOpen(false);
    setIsModalScriptAddMoveOpen(false);
  }

  const handlePlayScript = async () => {
    await fetch(`http://localhost:8000/api/run_script/${scriptId}/`, {method:"POST"});
    //console.log(scriptId, "run");
  }

  //запрос на сохранение/перезапись сценария на сервер
  const handleSaveScript = async () => {
    const triggersServer = triggers.map(item => {
      // item.triggerServer.week = parseInt(item.triggerServer.week, 2);
      // return item.triggerServer;
      const trigger = {
        ...item,
        week: parseInt(item.week, 2),
      };
      //если период не выбран то удаляем его - потому что 0 на сервере не сохраняется
      if (trigger.period === 0) {
        delete trigger.period;
      }
      return trigger;
    });
    // console.log(triggers);
    //TODO: loading
    const res = await request("http://localhost:8000/api/save_script/", "post",
      JSON.stringify({
        id: script.id,
        active: script.active,
        name: script.name,
        triggers: triggersServer,
        expressions: expressions,
      })
    );
    await fetchData();
    console.log(res);
    // console.log("navigate to /script")
    // navigate(-1);
  }
  // срабатывает когда нажали импорт в попапе с движением
  const onMoveImport = (moveId, moveText) => {
    console.log("onMoveImport", moveId, moveText);
    onModalScriptClose();
    // setMoves([...moves, {
    //   id: moveId,
    //   text: moveText,
    // }]);
    setExpressions([...expressions, {
      move_id: moveId,
      delay: null,
      operation: 1,
    }]);
  }

  const onDelayAdd = () => {
    setExpressions([...expressions, {
      // move_id: null,
      delay: 100,
      operation: 1,
    }]);
  }

  //меняем текст на кнопке ИЛИ\И по клику
  const onBtnIliTextChange = () => {
    setButtonText(buttonText === 'или' ? 'и' : 'или');
  }

  const deleteTrigger = (item) => {
    console.log("triger delete", item, triggers);
    let index = triggers.indexOf(item);
    setTriggers([...triggers.slice(0, index), ...triggers.slice(index + 1)]);
  }

  const deleteExpression = (expression) => {
    let index = expressions.indexOf(expression);
    //console.log("delete expression", expression);
    expressions.splice(index, 1);
    setExpressions([...expressions]);
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
      <div className="robot-script__control">
        <div className="robot-script__add-col">
          <div className="robot-script__add-col-title">
            Если:
          </div>
          <ScriptTriggers
            triggers={triggers}
            setTriggers={setTriggers}
            deleteTrigger={deleteTrigger}
          ></ScriptTriggers>

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
            {expressions.map((expression, index) => {
              const expressionPrev = expressions[index - 1];
              const expressionNext = expressions[index + 1];
              let roundTopClass = "";
              let roundBottomClass = "";

              // если пред. нет, то скругляем сверху
              if (!expressionPrev) {
                roundTopClass = "expression__line--roundTop";
              }
              // если в предыдущем ИЛИ то скругляем сверху
              if (expressionPrev?.operation === 1) {
                roundTopClass = "expression__line--roundTop";
                // roundBottomClass = "expression__line--roundBottom";
              }
              // если текущий ИЛИ, то скругляем снизу
              if (expression?.operation === 1) {
                roundBottomClass = "expression__line--roundBottom";
              //  roundTopClass = "expression__line--roundTop";
              }
              // если след. нет, то скругляем снизу
              if (!expressionNext) {
                roundBottomClass = "expression__line--roundBottom";
              }

              // console.log(roundTopClass, roundBottomClass, index, expressions, expressionPrev, expressionNext);
              return <div className="expression" key={expression.id}>
                {expression.move_id &&  <div className="robot-script__add-col-importedMoves">
                  <div className={`expression__line ${roundTopClass} ${roundBottomClass} ${isDay ? "expression__line--day" : "expression__line--night"}`}></div>
                  <div className={classNames("robot-script__add-col-importedMoves-move", {
                    "robot-script__add-col-importedMoves-move--day": isDay,
                    "robot-script__add-col-importedMoves-move--night": !isDay,
                  })}>
                    <div className="robot-script__add-col-importedMoves-move-text">
                      <img src={isDay ? scriptMove : scriptMoveNight} alt="Face" />
                      {moves.find(move => move.id === expression.move_id)?.name}
                      {/* {JSON.stringify(expression)}
                      {expression.move} */}
                    </div>
                    <button className="robot-script__btnDlt"onClick={() => deleteExpression(expression)}>
                      <img src={isDay ? deleteItem : deleteItemNight} alt="Delete" />
                    </button>
                  </div>
                </div>}

                {/* задержка */}
                {expression.delay && <div
                    className={classNames("delay__container delay__wraper", {
                      "delay__container--day": isDay,
                      "delay__container--night": !isDay,
                    })}
                  >
                    <div className={`expression__line ${roundTopClass} ${roundBottomClass}`}></div>
                    {/* <div
                      className={classNames(`expression__line ${roundTopClass} ${roundBottomClass}`, {
                      "expression__line--day": isDay,
                      "expression__line--night": !isDay,
                    })}></div> */}
                    <div
                      className={classNames("delay mimicitem-add__last", {
                        "mimicitem-add__last--day": isDay,
                        "mimicitem-add__last--night": !isDay,
                      })}
                      onClick={(e) => {
                        const delayWraper = e.target.closest(".delay__wraper");
                        delayWraper.classList.add("delay--editable");
                        const delayInput = delayWraper.querySelector(".delay__input");
                        delayInput.focus();
                      }}
                    >
                      <img src={isDay ? timerDay : timerNight} alt="" />
                      <input
                        className={classNames("controler__value delay__input", {
                          "controler__value--day": isDay,
                          "controler__value--night": !isDay,
                        })}
                        defaultValue={expression.delay}
                        type="number"
                        onBlur={ function(e){
                          expression.delay = e.target.value;
                          setExpressions([...expressions]);
                          e.target.closest(".delay__wraper").classList.remove("delay--editable");
                        }}
                      />
                      <span className="delay__value">{expression.delay}</span> мс
                      <img src={isDay ? pen : penNight} alt="" />
                    </div>
                    <span
                      className="delete-btn"
                      onClick={() => deleteExpression(expression)}
                    >
                      <CloseItemIco />
                    </span>
                  </div>}
                {/* кнопка и/или */}
                <div
                  className="operation"
                  onClick={() => {
                    expression.operation = (expression.operation === 1) ? 2 : 1;
                    setExpressions([...expressions]);
                  }}
                >
                  <div className={`expression__line${expression.operation === 1 ? " expression__line--hidden" : ""}`}></div>
                  <button
                    className={classNames("robot-script-add__btnILi", {
                      "robot-script-add__btnIli--day": isDay,
                      "robot-script-add__btnIli--night": !isDay,
                    })}
                    onClick={onBtnIliTextChange}
                  >
                    {expression.operation === 1 ? "или" : "и"}
                  </button>
                </div>
              </div>
            })}
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
          onDelayAdd={onDelayAdd}
      ></ModalScriptAddMove>
    </div>
  );
};

export default RobotScript;
