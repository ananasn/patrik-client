import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useHttp } from "../../hooks/http.hook";
import plus from "../../img/plus-day.svg";

import plusNight from "../../img/plus-night.svg";
import deleteItem from "../../img/movesItem/delete-day.svg";
import deleteItemNight from "../../img/movesItem/delete-night.svg";
import ModalAddNumberPeriod from "../../components/ModalAddNumberPeriod/ModalAddNumberPeriod";
import { numberTimes } from "../../utils/utils";
import "./ScriptTriggers.scss";


const ScriptTriggers = ({ filteredItems, deleteTrigger, setFilteredItems }) => {
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
    triggerInModal.triggerServer.number = parseFloat(number);
    triggerInModal.triggerServer.period = parseFloat(period);
    setFilteredItems([...filteredItems]);
    setTriggerInModal(null);
  }

  return (
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
                {item.triggerServer.trigger_type === 3 &&
                  <input
                    type="time"
                    value={item.triggerServer.time}
                    onInput={(e) => {
                      console.log(e.target.value);
                      item.triggerServer.time = e.target.value;
                      setFilteredItems([...filteredItems]);
                    }}
                  />
                }
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
                  //ref={inputRef}
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
                  onClick={() => {
                    // setNumberDefaultModal(item.triggerServer.number);
                    // setPeriodDefaultModal(item.triggerServer.period);
                    setTriggerInModal(item);
                    setIsOpenNumberPeriod(true);
                  }}
                >
                  {(item.triggerServer.number == 0 && item.triggerServer.period == 0) ?
                    "не повторять" :
                    `${item.triggerServer.number} ${numberTimes(item.triggerServer.number)}, каждые ${item.triggerServer.period} минут`}
                </button>
                <div>Повторять по дням недели:</div>
                <div>
                  {week.map((day, index) =>
                    <button
                      className={classNames("robot-script-add__btnRepeatTime", {
                        "robot-script-add__btnRepeatTime--day": isDay,
                        "robot-script-add__btnRepeatTime--night": !isDay,
                        "robot-script-add__btnRepeatTime--week-checked": item.triggerServer.week[index] == 1,
                      })}
                      onClick={() => {
                        let arr = item.triggerServer.week.split('');
                        arr[index] = arr[index] == "0" ? "1" : "0";
                        let str = arr.reverse().join('');

                        let weekAsNumber = parseInt(str, 2)
                        console.log(weekAsNumber);
                        item.triggerServer.week = str;
                        setFilteredItems([...filteredItems]);
                      }}
                    >
                      {day.title}
                      {item.triggerServer.week}
                    </button>
                  )}
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
        <ModalAddNumberPeriod
          isOpenNumberPeriod={isOpenNumberPeriod}
          onNumberPeriodClose={onNumberPeriodClose}
          // NumberDefaultModal={NumberDefaultModal}
          // periodDefaultModal={periodDefaultModal}
          triggerInModal={triggerInModal}
        ></ModalAddNumberPeriod>
    </div>
  );
};

export default ScriptTriggers;
