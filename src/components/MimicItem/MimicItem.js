import { useState, useEffect, useRef, memo} from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { Draggable } from "react-beautiful-dnd";
import {codeGenerator} from "../../utils/utils";
import Tabs from "../Tabs/Tabs";
import ModalAnimation from "../ModalAnimation/ModalAnimation";
import open from "../../img/movesItem/open-day.svg";
import openNight from "../../img/movesItem/open-night.svg";
import deleteItem from "../../img/movesItem/delete-day.svg";
import deleteItemNight from "../../img/movesItem/delete-night.svg";
import robotFace from "../../img/robot-mimic/fase.svg";
import plus from "../../img/plus-day.svg";
import robotFaceNight from "../../img/robot-mimic-night/fase-night.svg";
import plusNight from "../../img/plus-night.svg";
import pen from "../../img/pen-day.svg";
import penNight from "../../img/pen-night.svg";
import timerDay from "../../img/timer/timer-day.svg";
import timerNight from "../../img/timer/timer-night.svg";
import dots from "../../img/movesItem/dots-day.svg";
import dotsNight from "../../img/movesItem/dots-night.svg";
import animationPlayDay from "../../img/animation/animation-play-day.svg";
import animationPlayNight from "../../img/animation/animation-play-night.svg";


import "./MimicItem.scss";

// блок с лицом
const MimicItem = ({
  //card,
  mimicItemId,
  //object,
  xLeftEyeStart,
  yLeftEyeStart,
  wLeftEyeStart,
  hLeftEyeStart,
  xRightEyeStart,
  yRightEyeStart,
  wRightEyeStart,
  hRightEyeStart,
  xMouthStart,
  yMouthStart,
  wMouthStart,
  hMouthStart,
  leftEyeStart,
  mouthStart,
  rightEyeStart,
  easingServerStart,
  easingError,
  delayStart,
  dragId,
  order,
  index,
  saveFunc,
  deleteMimicItem
}) => {
  // с сервера easing 'steps(100)'
  let easing = easingServerStart;
  let stepsStart = 1;
  if (easingServerStart?.includes("steps")) {
    easing = "steps";
    let values = easingServerStart.match(/\d+/g);
    stepsStart = values ? values[0] : 1;
    //console.log("easingServerStart", easingServerStart, values);
  }
  // с сервера easing 'spring(10, 100, 10, 0)'
  let springMassStart = 1;
  let springStiffnessStart = 100;
  let springDampingStart = 10;
  let springVelocityStart = 0;

  if (easingServerStart?.includes("spring")) {
    easing = "spring";
    let values = easingServerStart.match(/\d+/g);
    springMassStart = values ? values[0] : 1;
    springStiffnessStart = values ? values[1] : 100;
    springDampingStart = values ? values[2] : 10;
    springVelocityStart = values ? values[3] : 0;
    console.log("easingServerStart", easingServerStart, values);
  }

  //const [mimicData, setMimic] = useState(mimic);
  //const [isReadOnly, setIsReadOnly] = useState(true);
  const [showItem, setShowItem] = useState(true);
  //const [objectValue, setObjectValue] = useState(object);
  //const dispatch = useDispatch();
  const isDay = useSelector((state) => state.isDay);
  //const [selectedAnimations, setSelectedAnimations] = useState([]);
  const [isModalAnimationOpen, setIsModalAnimationOpen] = useState(false);
  const [easingValue, setEasingValue] = useState(easing);
  const [stepsValue, setStepsValue] = useState(stepsStart);
  const [springMassValue, setSpringMassValue] = useState(springMassStart);
  const [springStiffnessValue, setSpringStiffnessValue] = useState(springStiffnessStart);
  const [springDampingValue, setSpringDampingValue] = useState(springDampingStart);
  const [springVelocityValue, setSpringVelocityValue] = useState(springVelocityStart);
  const [tabValues, setTabValues] = useState({});
  const [delayValue, setDelayValue] = useState(delayStart);
  // 0 - кнопка Добавить задержку 1 - инпут 2 - значение без инпута
  const [delayView, setDelayView] = useState(delayValue === 0 ? 0 : 2);
  const delayRef = useRef(null);
  //console.log(easing, easingValue);

  const handleClick = () => {
    deleteMimicItem(mimicItemId);
  }

  const handleItemOpen = (e) => {
    e.preventDefault();
    setShowItem(!showItem);
  };
  /*const dragStartHandler = (e, card) => {
    e.preventDefault();
    console.log(card);
  };
  const dragLeaveHandler = (e) => {};
  const dragEndHandler = (e) => {};
  const dragOverHandler = (e) => {
    e.preventDefault();
  };
  const dropHandler = (e, card) => {
    e.preventDefault();
    console.log(card);
  };*/

  //срабатывает при переключении табов
  const onToggleTab = (tabValues) => {
    //console.log(easingValue);
    setTabValues(tabValues);
  }
  const addMimicItemHandler = () => {
    //dispatch(toggleIsModalAnimationOpen());
    setIsModalAnimationOpen(true);
  }
  const onAnimationChange = (animations) => {
    console.log(animations[0]);
    setEasingValue(animations[0] && animations[0].value);
  }
  const onModalAnimationClose = () => {
    setIsModalAnimationOpen(false);
  }
  // подготовка данных к отправке на сервер
  useEffect(() => {
    //console.log(delayValue);
    // easing в формате для сервера 'steps(100)'
    let easingValueServer = easingValue;
    if (easingValue === 'steps') {
      easingValueServer = `${easingValue}(${stepsValue || 1})`

    } else if (easingValue === 'spring') {
      //'spring(mass, stiffness, damping, velocity)'
      easingValueServer = `spring(${springMassValue || 1}, ${springStiffnessValue || 100},  ${springDampingValue || 10},  ${springVelocityValue || 0})`
    }

    saveFunc({
      id: mimicItemId,

      x_left_eye: parseInt(tabValues.xLeftEye),
      y_left_eye: parseInt(tabValues.yLeftEye),
      w_left_eye: parseInt(tabValues.wLeftEye),
      h_left_eye: parseInt(tabValues.hLeftEye),

      x_right_eye: parseInt(tabValues.xRightEye),
      y_right_eye: parseInt(tabValues.yRightEye),
      w_right_eye: parseInt(tabValues.wRightEye),
      h_right_eye: parseInt(tabValues.hRightEye),

      x_mouth: parseInt(tabValues.xMouth),
      y_mouth: parseInt(tabValues.yMouth),
      w_mouth: parseInt(tabValues.wMouth),
      h_mouth: parseInt(tabValues.hMouth),

      style_left_eye: parseInt(tabValues.leftEyeValue),
      style_right_eye: parseInt(tabValues.rightEyeValue),
      style_mouth: parseInt(tabValues.mouthValue),

      delay: delayValue,
      //order: order,
      //mimic: mimic,
      easing: easingValueServer,
    });
  },[easingValue, tabValues, delayValue, stepsValue, springMassValue, springStiffnessValue, springDampingValue, springVelocityValue])

  //const dragId = codeGenerator(0);

  //console.log(dragId, dragId.toString())
  //const dragIdNew = mimicItemId ? mimicItemId.toString() : 'card ' + dragId.toString();
  //console.log(dragIdNew);
  //console.log("сколько раз отрисовали",codeGenerator(0))
  console.log("порядок", order)

  return (
    <Draggable draggableId={order.toString()} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className={classNames("mimicitem", {
            "mimicitem--day": isDay,
            "mimicitem--night": !isDay,
            "mimicitem--show": showItem,
            "mimicitem--hide": !showItem,
          })}
        >
          <div className="mimicitem__body-item">
            <div
              className={classNames("mimicitem-robot", {
                robot_day: isDay,
                robot_night: !isDay,
              })}
            >
              {isDay ? (
                <>
                  <div className="mimicitem__face-container">
                    <div className="mimicitem__face mimicitem__face--day">
                      <img
                        alt="лицо робота"
                        //className="robot__face"
                        src={robotFace}
                      />
                    </div>
                    <Tabs
                      onToggleTab={onToggleTab}
                      xLeftEyeStart={xLeftEyeStart}
                      yLeftEyeStart={yLeftEyeStart}
                      wLeftEyeStart={wLeftEyeStart}
                      hLeftEyeStart={hLeftEyeStart}
                      xRightEyeStart={xRightEyeStart}
                      yRightEyeStart={yRightEyeStart}
                      wRightEyeStart={wRightEyeStart}
                      hRightEyeStart={hRightEyeStart}
                      xMouthStart={xMouthStart}
                      yMouthStart={yMouthStart}
                      wMouthStart={wMouthStart}
                      hMouthStart={hMouthStart}
                      leftEyeStart={leftEyeStart}
                      mouthStart={mouthStart}
                      rightEyeStart={rightEyeStart}
                    />
                    <div className="mimicitem__btns">
                      <button onClick={(e) => handleItemOpen(e)} className="mimicitem__btn">
                        <img
                          className={classNames({
                            "mimicitem__btn-show--close": !showItem,
                            "mimicitem__btn-show--open": showItem,
                          })}
                          src={isDay ? open : openNight}
                          alt="Open"
                        />
                      </button>
                      <button
                        draggable={true}
                        className="mimicitem__btn mimicitem__btn-draggable"
                      >
                        <img src={isDay ? dots : dotsNight} alt="More" />
                      </button>
                      <button className="mimicitem__btn" onClick={handleClick}>
                        <img src={isDay ? deleteItem : deleteItemNight} alt="Delete" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mimicitem__face-container">
                    <div className="mimicitem__face mimicitem__face--night">
                      <img
                        alt="лицо робота"
                        //className="robot__face"
                        src={robotFaceNight}
                      />
                    </div>
                    <Tabs
                      onToggleTab={onToggleTab}
                      xLeftEyeStart={xLeftEyeStart}
                      yLeftEyeStart={yLeftEyeStart}
                      wLeftEyeStart={wLeftEyeStart}
                      hLeftEyeStart={hLeftEyeStart}
                      xRightEyeStart={xRightEyeStart}
                      yRightEyeStart={yRightEyeStart}
                      wRightEyeStart={wRightEyeStart}
                      hRightEyeStart={hRightEyeStart}
                      xMouthStart={xMouthStart}
                      yMouthStart={yMouthStart}
                      wMouthStart={wMouthStart}
                      hMouthStart={hMouthStart}
                    />
                    <div className="mimicitem__btns">
                      <button onClick={(e) => handleItemOpen(e)} className="mimicitem__btn">
                        <img
                          className={classNames({
                            "mimicitem__btn-show--close": !showItem,
                            "mimicitem__btn-show--open": showItem,
                          })}
                          src={isDay ? open : openNight}
                          alt="Open"
                        />
                      </button>
                      <button
                        draggable={true}
                        className="mimicitem__btn"
                      >
                        <img src={isDay ? dots : dotsNight} alt="More" />
                      </button>
                      <button className="mimicitem__btn">
                        <img src={isDay ? deleteItem : deleteItemNight} alt="Delete" />
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="mimicitem__control">
                <div className="mimicitem__add-row">
                  {!easingValue && <button
                    className={classNames("mimicitem-add__btn", {
                      "mimicitem-add__btn--day": isDay,
                      "mimicitem-add__btn--night": !isDay,
                    })}
                    onClick={addMimicItemHandler}
                  >
                    <img src={isDay ? plus : plusNight} alt="Plus" />
                    Добавить анимацию
                  </button>}
                  {/* <div className="mimicitem__easingError">{easingError ? <ModalNotification isOpen={easingError}></ModalNotification> : ""}</div> */}
                  {easingValue === "linear" && <div
                    className={classNames("mimicitem-add__easingSelected", {
                      "mimicitem-add__btn--day": isDay,
                      "mimicitem-add__btn--night": !isDay,
                    })}
                  >
                    <img className={classNames("mimicitem-add__easingSelected_play")} src={isDay ? animationPlayDay : animationPlayNight} alt="" />
                    Linear
                    <img
                      onClick={addMimicItemHandler}
                      src={isDay ? pen : penNight}
                      alt=""
                    />
                  </div>}
                  {easingValue === "steps" && <div
                    className={classNames("mimicitem-add__easingSelected", {
                      "mimicitem-add__btn--day": isDay,
                      "mimicitem-add__btn--night": !isDay,
                    })}
                  >
                    <img className={classNames("mimicitem-add__easingSelected_play")} src={isDay ? animationPlayDay : animationPlayNight} alt="" />
                    Steps
                    <img
                      onClick={addMimicItemHandler}
                      src={isDay ? pen : penNight}
                      alt=""
                    />
                    <div className="mimicitem__controller gap">
                      <div>Number of steps</div>
                      <input
                        type="number"
                        onChange={(e) => setStepsValue(e.target.value)}
                        value={stepsValue}
                        required
                        min={0}
                        className={classNames("controler__value", {
                          "controler__value--day": isDay,
                          "controler__value--night": !isDay,
                        })}
                      />
                    </div>
                  </div>}
                  {easingValue === "spring" && <div
                    className={classNames("mimicitem-add__easingSelected", {
                      "mimicitem-add__btn--day": isDay,
                      "mimicitem-add__btn--night": !isDay,
                    })}
                  >
                    <img className={classNames("mimicitem-add__easingSelected_play")} src={isDay ? animationPlayDay : animationPlayNight} alt="" />
                    Spring
                    <img
                      onClick={addMimicItemHandler}
                      src={isDay ? pen : penNight}
                      alt=""
                    />
                    <div className="mimicitem__controllerAll">
                      <div className="mimicitem__controller gap">
                        <div>Mass</div>
                        <input
                          type="number"
                          onChange={(e) => setSpringMassValue(e.target.value)}
                          value={springMassValue}
                          required
                          min={0}
                          max={100}
                          className={classNames("controler__value", {
                            "controler__value--day": isDay,
                            "controler__value--night": !isDay,
                          })}
                        />
                      </div>
                      <div className="mimicitem__controller gap">
                        <div>Stiffness</div>
                        <input
                          type="number"
                          onChange={(e) => setSpringStiffnessValue(e.target.value)}
                          value={springStiffnessValue}
                          required
                          min={0}
                          max={100}
                          className={classNames("controler__value", {
                            "controler__value--day": isDay,
                            "controler__value--night": !isDay,
                          })}
                        />
                      </div>
                      <div className="mimicitem__controller gap">
                        <div>Damping</div>
                        <input
                          type="number"
                          onChange={(e) => setSpringDampingValue(e.target.value)}
                          value={springDampingValue}
                          required
                          min={0}
                          max={100}
                          className={classNames("controler__value", {
                            "controler__value--day": isDay,
                            "controler__value--night": !isDay,
                          })}
                        />
                      </div>
                      <div className="mimicitem__controller gap">
                        <div>Velocity</div>
                        <input
                          type="number"
                          onChange={(e) => setSpringVelocityValue(e.target.value)}
                          value={springVelocityValue}
                          required
                          min={0}
                          max={100}
                          className={classNames("controler__value", {
                            "controler__value--day": isDay,
                            "controler__value--night": !isDay,
                          })}
                        />
                      </div>
                    </div>
                  </div>}
                  {/* Задержка */}
                  { delayView === 0 && <button
                    className={classNames("mimicitem-add__btn", {
                      "mimicitem-add__btn--day": isDay,
                      "mimicitem-add__btn--night": !isDay,
                    })}
                    onClick={() => setDelayView(1)}
                  >
                    <img src={isDay ? plus : plusNight} alt="Plus" /> Добавить задержку
                  </button>}
                  <div  className="mimicitem__controller">
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

                  {delayView === 2 && <div
                    className={classNames("mimicitem-add__last", {
                      "mimicitem-add__last--day": isDay,
                      "mimicitem-add__last--night": !isDay,
                    })}
                    onClick={() => setDelayView(1)}
                  >
                    <img src={isDay ? timerDay : timerNight} alt="" />
                    {delayValue} мс
                    <img src={isDay ? pen : penNight} alt="" />
                  </div>}
                </div>
              </div>
            </div>
          </div>
          <ModalAnimation
              onAnimationChange={onAnimationChange}
              isOpen={isModalAnimationOpen}
              onClose={onModalAnimationClose}
              easingStart={easing}
          ></ModalAnimation>
        </li>
      )}
    </Draggable>
  );
};

export default React.memo(MimicItem);
