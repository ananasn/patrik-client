import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useHttp } from "../../hooks/http.hook";
import plus from "../../img/plus-day.svg";

import plusNight from "../../img/plus-night.svg";
import deleteItem from "../../img/movesItem/delete-day.svg";
import deleteItemNight from "../../img/movesItem/delete-night.svg";
import ModalAddNumberPeriod from "../../components/ModalAddNumberPeriod/ModalAddNumberPeriod";
import ModalCommon from "../../components/ModalCommon/ModalCommon";
import { numberTimes } from "../../utils/utils";
import {ReactComponent as RecognitionSignIco} from "../../img/script/sign.svg";
import "./ScriptTriggers.scss";


const ScriptTriggers = ({ deleteTrigger, triggers, setTriggers }) => {
  const isDay = useSelector((state) => state.isDay);
  const { request } = useHttp();

  const [inputValue, setInputValue] = useState();
  const [isOpenNumberPeriod, setIsOpenNumberPeriod] = useState(false);
  // const [NumberDefaultModal, setNumberDefaultModal] = useState(0);
  // const [periodDefaultModal, setPeriodDefaultModal] = useState(0);
  const [triggerInModal, setTriggerInModal] = useState(0);
  const [week, setWeek] = useState([
    {title: "Пн", value: false},
    {title: "Вт", value: false},
    {title: "Ср", value: false},
    {title: "Чт", value: false},
    {title: "Пт", value: false},
    {title: "Сб", value: false},
    {title: "Вс", value: false},
  ]);

  const [isOpenTime, setIsOpenTime] = useState(false);
  const [hourRecognise, setHourRecognise] = useState(0);
  const [minuteRecognise, setMinuteRecognise] = useState(0);

  // useEffect(() => {
  //   const getTriggers = async () => {
  //     const response = await request(`http://localhost:8000/api/trigger/`);
  //     const data = await response;
  //     console.log("get triggers", data);
  //   };
  //   getTriggers();
  // }, [])

  const onNumberPeriodClose = (number, period) => {
    if (number === "") {
      number = 0;
    }
    if (period === "") {
      period = 0;
    }
    setIsOpenNumberPeriod(false);
    triggerInModal.number = parseFloat(number);
    triggerInModal.period = parseFloat(period);
    setTriggers([...triggers]);
    setTriggerInModal(null);
  }

  const onTimeClose = () => {
    triggerInModal.period = +hourRecognise * 60 + +minuteRecognise;
    triggerInModal.startup = false;
    setIsOpenTime(false);
    setTriggers([...triggers]);
    setTriggerInModal(null);
  }

  return (
    <div className="robot-script__add-col-trigger">
      <div className="robot-script__add-col-trigger--wrapper">
        {triggers.map((trigger) =>
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
                  {/* <img src={isDay ? trigger.ico : trigger.icoNight} alt="Face" /> */}
                  {trigger.trigger_type}
                  {trigger.trigger_type === 2 && <RecognitionSignIco className="test"/>}
                  {trigger.name}
                  {trigger.trigger_type === 3 &&
                    <input
                      className={classNames("robot-script__add-col-trigger-inputTime", {
                        "robot-script__add-col-trigger-inputTime--day": isDay,
                        "robot-script__add-col-trigger-inputTime--night": !isDay,
                      })}
                      // type="time"
                      type="text"
                      value={trigger.time}
                      onInput={(e) => {
                        console.log(e.target.value);
                        trigger.time = e.target.value;
                        setTriggers([...triggers]);
                      }}
                    />
                    // <input
                    //   type="text"
                    //   name="time"
                    //   onFocus={(e) => e.target.type='time'}
                    //   onBlur={(e) => (!e.target.value) ? (e.target.type='text') : (e.target.type='time')}
                    //   value={trigger.time}
                    //   onInput={(e) => {
                    //     console.log(e.target.value);
                    //     trigger.time = e.target.value;
                    //     setTriggers([...triggers]);
                    //   }}
                    // />
                  }
                </div>
                <button className="robot-script__btnDlt" onClick={() => deleteTrigger(trigger)}>
                  <img src={isDay ? deleteItem : deleteItemNight} alt="Delete" />
                </button>
              </div>
              {/* Для Фраза див */}
              {trigger.trigger_type === 0 &&
                <div>
                  <input
                    placeholder="Введите текст для фразы"
                    className={classNames("robot-script__inputPhrase", {
                      "robot-script__inputPhrase--night": !isDay,
                      "robot-script__inputPhrase--day": isDay,
                    })}
                    type="text"
                    value={trigger.phrase}
                    onInput={(e) => {
                      trigger.phrase = e.target.value;
                      setTriggers([...triggers]);
                    }}
                  />
                  {/* <div>Повторно срабатывать</div>
                  <div>
                    <button
                      className={classNames("robot-script-add__btnRepeat", {
                        "robot-script-add__btnRepeat--day": isDay,
                        "robot-script-add__btnRepeat--night": !isDay,
                        "robot-script-add__btnRepeat--startup-checked": trigger.startup ? true : false,
                      })}
                      onClick={() => {
                        trigger.startup = trigger.startup === true ? false : true;
                        setTriggers([...triggers]);
                      }}
                    >
                      каждый раз
                    </button>
                    <button
                      className={classNames("robot-script-add__btnRepeat", {
                        "robot-script-add__btnRepeat--day": isDay,
                        "robot-script-add__btnRepeat--night": !isDay,
                      })}
                      onClick={() => {
                        setTriggerInModal(item);
                        setIsOpenTime(true);
                      }}
                    >
                      через время
                    </button>
                  </div> */}
                </div>
              }
              {/* Для Лицо див */}
              {trigger.trigger_type === 1 &&
                <div>
                  <div>Повторно срабатывать</div>
                  <div>
                    <button
                      className={classNames("robot-script-add__btnRepeat", {
                        "robot-script-add__btnRepeat--day": isDay,
                        "robot-script-add__btnRepeat--night": !isDay,
                        "robot-script-add__btnRepeat--startup-checked": trigger.startup ? true : false,
                      })}
                      onClick={() => {
                        trigger.startup = trigger.startup === true ? false : true;
                        setTriggers([...triggers]);
                      }}
                    >
                      каждый раз
                    </button>
                    <button
                      className={classNames("robot-script-add__btnRepeat", {
                        "robot-script-add__btnRepeat--day": isDay,
                        "robot-script-add__btnRepeat--night": !isDay,
                        "robot-script-add__btnRepeat--startup-checked": !trigger.startup ? true : false,
                      })}
                      onClick={() => {
                        setTriggerInModal(trigger);
                        setIsOpenTime(true);
                        setMinuteRecognise(trigger.period % 60);
                        setHourRecognise(Math.floor(trigger.period / 60));
                        console.log(trigger.period);
                      }}
                    >
                      через время
                    </button>
                  </div>
                </div>
              }
              {/* Для Жест див */}
              {trigger.trigger_type === 2 &&
                <div>
                  <div>Повторно срабатывать</div>
                  <div>
                    <button
                      className={classNames("robot-script-add__btnRepeat", {
                        "robot-script-add__btnRepeat--day": isDay,
                        "robot-script-add__btnRepeat--night": !isDay,
                        "robot-script-add__btnRepeat--startup-checked": trigger.startup ? true : false,
                      })}
                      onClick={() => {
                        trigger.startup = trigger.startup === true ? false : true;
                        setTriggers([...triggers]);
                      }}
                    >
                      каждый раз
                    </button>
                    <button
                      className={classNames("robot-script-add__btnRepeat", {
                        "robot-script-add__btnRepeat--day": isDay,
                        "robot-script-add__btnRepeat--night": !isDay,
                        "robot-script-add__btnRepeat--startup-checked": !trigger.startup ? true : false,
                      })}
                      onClick={() => {
                        setTriggerInModal(trigger);
                        setIsOpenTime(true);
                        setMinuteRecognise(trigger.period % 60);
                        setHourRecognise(Math.floor(trigger.period / 60));
                        console.log(trigger.period);
                      }}
                    >
                      через время
                    </button>
                  </div>
                </div>
              }
              {/* Для времени див */}
              {trigger.trigger_type === 3 &&
                <div className="robot-script__triggerWrapper">
                  <div className="robot-script__triggerTimeText">Повторять после выполнения:</div>
                  <button
                    className={classNames("robot-script-add__btnNotRepeat", {
                      "robot-script-add__btnNotRepeat--day": isDay,
                      "robot-script-add__btnNotRepeat--night": !isDay,
                    })}
                    onClick={() => {
                      setTriggerInModal(trigger);
                      setIsOpenNumberPeriod(true);
                    }}
                  >
                    {(trigger.number == 0 && trigger.period == 0) ?
                      "не повторять" :
                      `${trigger.number} ${numberTimes(trigger.number)}, каждые ${trigger.period} минут`}
                  </button>
                  <div className="robot-script__triggerTimeText">Повторять по дням недели:</div>
                  <div className="robot-script__triggerTimeDays">
                    {week.map((day, index) =>
                      <button
                        className={classNames("robot-script-add__btnRepeatTime", {
                          "robot-script-add__btnRepeatTime--day": isDay,
                          "robot-script-add__btnRepeatTime--night": !isDay,
                          "robot-script-add__btnRepeatTime--week-checked": trigger.week[6-index] == 1,
                        })}
                        onClick={() => {
                          let arr = trigger.week.split('');
                          arr[6-index] = arr[6-index] == "0" ? "1" : "0";
                          let str = arr.join('');
                          trigger.week = str;
                          setTriggers([...triggers]);
                        }}
                      >
                        {day.title}
                        {/* {trigger.week} */}
                      </button>
                    )}
                  </div>
                </div>
              }

              {/* Для Запуск системы див */}
              {trigger.trigger_type === 4 &&
                <div>
                  <div>Повторять:</div>
                  <div>
                    {week.map((day, index) =>
                      <button
                        className={classNames("robot-script-add__btnRepeatTime", {
                          "robot-script-add__btnRepeatTime--day": isDay,
                          "robot-script-add__btnRepeatTime--night": !isDay,
                          "robot-script-add__btnRepeatTime--week-checked": trigger.week[6-index] == 1,
                        })}
                        onClick={() => {
                          let arr = trigger.week.split('');
                          arr[6-index] = arr[6-index] == "0" ? "1" : "0";
                          let str = arr.join('');
                          trigger.week = str;
                          setTriggers([...triggers]);
                        }}
                      >
                        {day.title}
                        {/* {trigger.week} */}
                      </button>
                    )}
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
      <ModalAddNumberPeriod
        isOpenNumberPeriod={isOpenNumberPeriod}
        onNumberPeriodClose={onNumberPeriodClose}
        triggerInModal={triggerInModal}
      ></ModalAddNumberPeriod>
        <ModalCommon
        isOpen={isOpenTime}
        onClose={onTimeClose}
        // triggerInModal={triggerInModal}
        title="Повторно срабатывать"
        content = {
          <>
            <label>
              часы
              <input
                // defaultValue={triggerInModal?.triggerServer?.period}
                // ref={inputPeriodRef}
                type="number"
                min={0}
                value={hourRecognise}
                onInput={(e) => setHourRecognise(e.target.value)}
              />
            </label>
            <label>
              минуты
              <input
                // defaultValue={triggerInModal?.triggerServer?.period}
                // ref={inputPeriodRef}
                type="number"
                min={0}
                value={minuteRecognise}
                onInput={(e) => setMinuteRecognise(e.target.value)}
              />
            </label>
            <button onClick={() => onTimeClose()}>Применить</button>
          </>
        }
      ></ModalCommon>
    </div>
  );
};

export default ScriptTriggers;
