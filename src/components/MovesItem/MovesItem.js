import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import Controler from "../Controler/Controler";
import RobotAddSmt from "../RobotAddSmt/RobotAddSmt";
import { toggleIsModalOpen, setIsMove } from "../../store/actions";

import pen from "../../img/pen-day.svg";
import penNight from "../../img/pen-night.svg";
import open from "../../img/movesItem/open-day.svg";
import openNight from "../../img/movesItem/open-night.svg";
import dots from "../../img/movesItem/dots-day.svg";
import dotsNight from "../../img/movesItem/dots-night.svg";
import deleteItem from "../../img/movesItem/delete-day.svg";
import deleteItemNight from "../../img/movesItem/delete-night.svg";
//import topBottom from "../../img/robot-control-day/top-bottom.svg";
import rightLeft from "../../img/robot-control-day/right-left.svg";
//import topBottomNight from "../../img/robot-control-night/top-bottom.svg";
import rightLeftNight from "../../img/robot-control-night/right-left.svg";

import robotBody from "../../img/robot-day/robot-body.svg";
import robotLeftShoulder from "../../img/robot-day/robot-left-shoulder.svg";
import robotRightShoulder from "../../img/robot-day/robot-right-shoulder.svg";
import robotNeck from "../../img/robot-day/robot-neck.svg";
import robotFace from "../../img/robot-day/robot-face.svg";
import robotArm from "../../img/robot-day/robot-arm.svg";
import robotHand from "../../img/robot-day/robot-hand.svg";
import robotLogo from "../../img/robot-day/robot-logo-day.png";

import robotBodyNight from "../../img/robot-moves-night/robot-body-night.svg";
import robotLeftShoulderNight from "../../img/robot-moves-night/robot-left-shoulder-night.svg";
import robotRightShoulderNight from "../../img/robot-moves-night/robot-right-shoulder-night.svg";
import robotNeckNight from "../../img/robot-moves-night/robot-neck-night.svg";
import robotFaceNight from "../../img/robot-moves-night/robot-face-night.svg";
import robotArmNight from "../../img/robot-moves-night/robot-arm-night.svg";
import robotHandNight from "../../img/robot-moves-night/robot-hand-night.svg";

import robotNeckDayActive from "../../img/robot-day/neck-day-active.svg";
import robotArmDayActive from "../../img/robot-day/arm-day-active.svg";
import robotHandDayActive from "../../img/robot-day/hand-day-active.svg";

import timerDay from "../../img/timer/timer-day.svg";
import timerNight from "../../img/timer/timer-night.svg";

import robotNeckNightActive from "../../img/robot-moves-night/robot-neck-night-active.svg";
import robotArmNightActive from "../../img/robot-moves-night/robot-arm-night-active.svg";
import robotHandNightActive from "../../img/robot-moves-night/robot-hand-night-active.svg";

import {ReactComponent as PlusIco } from "../../img/plus.svg";
import {ReactComponent as EmotionIco} from "../../img/icons/menu-day/mim.svg";

import "./MovesItem.scss";
import { Draggable } from "react-beautiful-dnd";

const MovesItem = ({
  card,
  id,
  l1,
  l2,
  l3,
  l4,
  r1,
  r2,
  r3,
  r4,
  neck,
  head,
  name,
  phrase,
  mimic,
  saveFunc,
  moveId,
  order,
  index,
  delay,
}) => {
  const [l1Deg, setL1] = useState(l1);
  const [l2Deg, setL2] = useState(l2);
  const [l3Deg, setL3] = useState(l3);
  const [l4Deg, setL4] = useState(l4);
  const [r1Deg, setR1] = useState(r1);
  const [r2Deg, setR2] = useState(r2);
  const [r3Deg, setR3] = useState(r3);
  const [r4Deg, setR4] = useState(r4);
  const [neckDeg, setNeck] = useState(neck);
  const [headDeg, setHead] = useState(head);
  const [phraseData, setPhrase] = useState(phrase);
  const [mimicData, setMimic] = useState(mimic);
  const [inputValue, setInputValue] = useState(name);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [activeRobotPart, setActiveRobotPart] = useState(null);
  const [activeRobotPartName, setActiveRobotPartName] = useState(null);
  const [showItem, setShowItem] = useState(true);
  const inputRef = useRef(null);
  const isDay = useSelector((state) => state.isDay);
  const importMimic = useSelector((state) => state.importMimic);
  const dispatch = useDispatch();
  console.log(importMimic);


  const [delayValue, setDelayValue] = useState(delay);
  // 0 - кнопка Добавить задержку 1 - инпут 2 - значение без инпута
  const [delayView, setDelayView] = useState(delayValue === 0 ? 0 : 2);
  const delayRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newValue = e.target.movename.value;
    console.log(newValue);
    setInputValue(newValue);
    setIsReadOnly(true);
    inputRef.current.blur();
  };
  const handlePhrasaChange = (newPhrase) => {
    setPhrase(newPhrase);
    saveFunc({
      id: id,
      name: inputValue,
      l1: parseInt(l1Deg),
      l2: parseInt(l2Deg),
      l3: parseInt(l3Deg),
      l4: parseInt(l4Deg),
      neck: parseInt(neckDeg),
      head: parseInt(headDeg),
      r1: parseInt(r1Deg),
      r2: parseInt(r2Deg),
      r3: parseInt(r3Deg),
      r4: parseInt(r4Deg),
      phrase: newPhrase,
      delay: delayValue,
      order: order,
      move: moveId,
      mimic: importMimic ? importMimic.id : null,
    });
  };
  const handleRobotPartChoice = (robotPart) => {
    if (activeRobotPart === robotPart) {
      setActiveRobotPart(null);
      setActiveRobotPartName(null);
    } else {
      setActiveRobotPart(robotPart);
      switch (robotPart) {
        case "neck":
          setActiveRobotPartName("шеи");
          break;
        case "l1":
          setActiveRobotPartName("левой руки 1");
          break;
        case "l2":
          setActiveRobotPartName("левой руки 2");
          break;
        case "l3":
          setActiveRobotPartName("левой руки 3");
          break;
        case "l4":
          setActiveRobotPartName("левой руки 4");
          break;
        case "r1":
          setActiveRobotPartName("правой руки 1");
          break;
        case "r2":
          setActiveRobotPartName("правой руки 2");
          break;
        case "r3":
          setActiveRobotPartName("правой руки 3");
          break;
        case "r4":
          setActiveRobotPartName("правой руки 4");
          break;
        default:
          setActiveRobotPartName(null);
          break;
      }
    }
  };
  const handlePenClick = (e) => {
    setIsReadOnly(false);
    inputRef.current.focus();
  };
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
  const changeControlState = (robotPart, e) => {
    if (robotPart === "r1") {
      setR1(e);
    } else if (robotPart === "r2") {
      setR2(e);
    } else if (robotPart === "r3") {
      setR3(e);
    } else if (robotPart === "r4") {
      setR4(e);
    } else if (robotPart === "l1") {
      setL1(e);
    } else if (robotPart === "l2") {
      setL2(e);
    } else if (robotPart === "l3") {
      setL3(e);
    } else if (robotPart === "l4") {
      setL4(e);
    } else if (robotPart === "neck") {
      setNeck(e);
    } else if (robotPart === "head") {
      setHead(e);
    }
    saveFunc({
      id: id,
      name: inputValue,
      l1: parseInt(l1Deg),
      l2: parseInt(l2Deg),
      l3: parseInt(l3Deg),
      l4: parseInt(l4Deg),
      neck: parseInt(neckDeg),
      head: parseInt(headDeg),
      r1: parseInt(r1Deg),
      r2: parseInt(r2Deg),
      r3: parseInt(r3Deg),
      r4: parseInt(r4Deg),
      phrase: phraseData,
      delay: delayValue,
      order: order,
      move: moveId,
      mimic: importMimic ? importMimic.id : null,
    });
  };
  const handleMimicOpen = (e) => {
    e.preventDefault();
    dispatch(setIsMove(false));
    dispatch(toggleIsModalOpen());
  };
  return (
    <Draggable draggableId={order.toString()} index={index}>
      {(provided) => (
        <li
         ref={provided.innerRef}
         {...provided.dragHandleProps}
         {...provided.draggableProps}
        className={classnames("movesitem", {
          "movesitem--day": isDay,
          "movesitem--night": !isDay,
          "movesitem--show": showItem,
          "movesitem--hide": !showItem,
        })}
      >
        <div className="movesitem__header">
          <div className="movesitem__name">
            <form
              onSubmit={(e) => handleFormSubmit(e)}
              className="movesitem__form"
            >
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                readOnly={isReadOnly}
                type="text"
                name="movename"
                className={classnames("movesitem__input", {
                  "movesitem__input--day": isDay,
                  "movesitem__input--night": !isDay,
                })}
                ref={inputRef}
              />
              <label onClick={(e) => handlePenClick(e)} htmlFor="movename">
                <img src={isDay ? pen : penNight} alt="Pen" />
              </label>
            </form>
          </div>
          <div className="movesitem__btns">
            <button onClick={(e) => handleItemOpen(e)} className="movesitem__btn">
              <img
                className={classnames({
                  "movesitem__btn-show--close": !showItem,
                  "movesitem__btn-show--open": showItem,
                })}
                src={isDay ? open : openNight}
                alt="Open"
              />
            </button>
            <div
              draggable={true}
              //onDragStart={(e) => dragStartHandler(e, card)}
              //onDragLeave={(e) => dragLeaveHandler(e)}
              //onDragEnd={(e) => dragEndHandler(e)}
              //onDragOver={(e) => dragOverHandler(e)}
              //onDrop={(e) => dropHandler(e, card)}
              className="movesitem__btn-draggable"
            >
              <img src={isDay ? dots : dotsNight} alt="More" />
            </div>
            <button className="movesitem__btn">
              <img src={isDay ? deleteItem : deleteItemNight} alt="Delete" />
            </button>
          </div>
        </div>
        <div className="movesitem__body-item">
          <div
            className={classnames("movesitem-robot", {
              robot_day: isDay,
              robot_night: !isDay,
            })}
          >
            {isDay ? (
              <>
                <div className="movesitem__head">
                  <img
                    alt="лицо робота"
                    className="movesitem__face"
                    src={robotFace}
                    onClick={() => handleRobotPartChoice("neck")}
                  />
                  <img
                    alt="шея робота"
                    className="movesitem__neck"
                    src={
                      activeRobotPart === "neck" ? robotNeckDayActive : robotNeck
                    }
                    onClick={() => handleRobotPartChoice("neck")}
                  />
                </div>
                <div className="movesitem__body">
                  <div className="movesitem__arm">
                    <img
                      alt="левое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "l1" ? robotArmDayActive : robotArm
                      }
                      onClick={() => handleRobotPartChoice("l1")}
                    />
                    <img
                      alt="левое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "l2" ? robotArmDayActive : robotArm
                      }
                      onClick={() => handleRobotPartChoice("l2")}
                    />
                    <img
                      alt="левое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "l3" ? robotArmDayActive : robotArm
                      }
                      onClick={() => handleRobotPartChoice("l3")}
                    />
                    <img
                      alt="левая рука робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "l4" ? robotHandDayActive : robotHand
                      }
                      onClick={() => handleRobotPartChoice("l4")}
                    />
                  </div>
                  <div className="movesitem__torso">
                    <img
                      alt="логотип робота"
                      className="movesitem__logo"
                      src={robotLogo}
                    />
                    <img
                      alt="тело робота"
                      className="movesitem__breast"
                      src={robotBody}
                    />
                    <img
                      alt="левое плечо робота"
                      className="movesitem__left-shoulder"
                      src={robotLeftShoulder}
                    />
                    <img
                      alt="правое плечо робота"
                      className="movesitem__right-shoulder"
                      src={robotRightShoulder}
                    />
                  </div>
                  <div className="movesitem__arm">
                    <img
                      alt="правое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "r1" ? robotArmDayActive : robotArm
                      }
                      onClick={() => handleRobotPartChoice("r1")}
                    />
                    <img
                      alt="правое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "r2" ? robotArmDayActive : robotArm
                      }
                      onClick={() => handleRobotPartChoice("r2")}
                    />
                    <img
                      alt="правое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "r3" ? robotArmDayActive : robotArm
                      }
                      onClick={() => handleRobotPartChoice("r3")}
                    />
                    <img
                      alt="правая рука робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "r4" ? robotHandDayActive : robotHand
                      }
                      onClick={() => handleRobotPartChoice("r4")}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="movesitem__head">
                  <img
                    alt="лицо робота"
                    className="movesitem__face"
                    src={robotFaceNight}
                  />
                  <img
                    alt="шея робота"
                    className="movesitem__neck"
                    src={
                      activeRobotPart === "neck"
                        ? robotNeckNightActive
                        : robotNeckNight
                    }
                    onClick={() => handleRobotPartChoice("neck")}
                  />
                </div>
                <div className="movesitem__body">
                  <div className="movesitem__arm">
                    <img
                      alt="левое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "l1"
                          ? robotArmNightActive
                          : robotArmNight
                      }
                      onClick={() => handleRobotPartChoice("l1")}
                    />
                    <img
                      alt="левое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "l2"
                          ? robotArmNightActive
                          : robotArmNight
                      }
                      onClick={() => handleRobotPartChoice("l2")}
                    />
                    <img
                      alt="левое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "l3"
                          ? robotArmNightActive
                          : robotArmNight
                      }
                      onClick={() => handleRobotPartChoice("l3")}
                    />
                    <img
                      alt="левая рука робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "l4"
                          ? robotHandNightActive
                          : robotHandNight
                      }
                      onClick={() => handleRobotPartChoice("l4")}
                    />
                  </div>
                  <div className="movesitem__torso">
                    <img
                      alt="логотип робота"
                      className="movesitem__logo"
                      src={robotLogo}
                    />
                    <img
                      alt="тело робота"
                      className="movesitem__breast"
                      src={robotBodyNight}
                    />
                    <img
                      alt="левое плечо робота"
                      className="movesitem__left-shoulder"
                      src={robotLeftShoulderNight}
                    />
                    <img
                      alt="правое плечо робота"
                      className="movesitem__right-shoulder"
                      src={robotRightShoulderNight}
                    />
                  </div>
                  <div className="movesitem__arm">
                    <img
                      alt="правое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "r1"
                          ? robotArmNightActive
                          : robotArmNight
                      }
                      onClick={() => handleRobotPartChoice("r1")}
                    />
                    <img
                      alt="правое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "r2"
                          ? robotArmNightActive
                          : robotArmNight
                      }
                      onClick={() => handleRobotPartChoice("r2")}
                    />
                    <img
                      alt="правое предплечье робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "r3"
                          ? robotArmNightActive
                          : robotArmNight
                      }
                      onClick={() => handleRobotPartChoice("r3")}
                    />
                    <img
                      alt="правая рука робота"
                      className="movesitem__arm-item"
                      src={
                        activeRobotPart === "r4"
                          ? robotHandNightActive
                          : robotHandNight
                      }
                      onClick={() => handleRobotPartChoice("r4")}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="movesitem__control">
            <h2 className="movesitem__control-name">
              {activeRobotPartName
                ? `Позиция ${activeRobotPartName}`
                : "Выберите часть робота"}
            </h2>
            <div className="movesitem__controller">
              {activeRobotPart === "r1" ? (
                <Controler
                  maxValue={360}
                  imgSrc={isDay ? rightLeft : rightLeftNight}
                  initialValue={r1Deg}
                  id={"horizontal"}
                  onChange={(e) => changeControlState("r1", e)}
                ></Controler>
              ) : null}
              {activeRobotPart === "r2" ? (
                <Controler
                  maxValue={360}
                  imgSrc={isDay ? rightLeft : rightLeftNight}
                  initialValue={r2Deg}
                  id={"horizontal"}
                  onChange={(e) => changeControlState("r2", e)}
                ></Controler>
              ) : null}
              {activeRobotPart === "r3" ? (
                <Controler
                  maxValue={360}
                  imgSrc={isDay ? rightLeft : rightLeftNight}
                  initialValue={r3Deg}
                  id={"horizontal"}
                  onChange={(e) => changeControlState("r3", e)}
                ></Controler>
              ) : null}
              {activeRobotPart === "r4" ? (
                <Controler
                  maxValue={360}
                  imgSrc={isDay ? rightLeft : rightLeftNight}
                  initialValue={r4Deg}
                  id={"horizontal"}
                  onChange={(e) => changeControlState("r4", e)}
                ></Controler>
              ) : null}
              {activeRobotPart === "l1" ? (
                <Controler
                  maxValue={360}
                  imgSrc={isDay ? rightLeft : rightLeftNight}
                  initialValue={l1Deg}
                  id={"horizontal"}
                  onChange={(e) => changeControlState("l1", e)}
                ></Controler>
              ) : null}
              {activeRobotPart === "l2" ? (
                <Controler
                  maxValue={360}
                  imgSrc={isDay ? rightLeft : rightLeftNight}
                  initialValue={l2Deg}
                  id={"horizontal"}
                  onChange={(e) => changeControlState("l2", e)}
                ></Controler>
              ) : null}
              {activeRobotPart === "l3" ? (
                <Controler
                  maxValue={360}
                  imgSrc={isDay ? rightLeft : rightLeftNight}
                  initialValue={l3Deg}
                  id={"horizontal"}
                  onChange={(e) => changeControlState("l3", e)}
                ></Controler>
              ) : null}
              {activeRobotPart === "l4" ? (
                <Controler
                  maxValue={360}
                  imgSrc={isDay ? rightLeft : rightLeftNight}
                  initialValue={l4Deg}
                  id={"horizontal"}
                  onChange={(e) => changeControlState("l4", e)}
                ></Controler>
              ) : null}
              {activeRobotPart === "neck" ? (
                <>
                  <Controler
                    maxValue={360}
                    imgSrc={isDay ? rightLeft : rightLeftNight}
                    initialValue={neckDeg}
                    id={"horizontal"}
                    onChange={(e) => changeControlState("neck", e)}
                  ></Controler>
                  <Controler
                    maxValue={360}
                    imgSrc={isDay ? rightLeft : rightLeftNight}
                    initialValue={headDeg}
                    id={"vertical"}
                    onChange={(e) => changeControlState("head", e)}
                  ></Controler>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="movesitem__footer">
          {importMimic ? (
            <button
              className={classnames("robotaddsmt", {
                "robotaddsmt--night": !isDay,
                "robotaddsmt--day": isDay,
              })}
              onClick={handleMimicOpen}
            >
              <EmotionIco />
              <h3
                className={classnames("robotaddsmt__text", {
                  "robotaddsmt__text--night": !isDay,
                  "robotaddsmt__text--day": isDay,
                })}
              >
                {importMimic.text}
              </h3>
            </button>
          ) :  (
            <RobotAddSmt
              word={"мимику"}
            ></RobotAddSmt>
          )}
          <RobotAddSmt
            pharsa={phraseData}
            handlePhrasaChange={handlePhrasaChange}
            word={"фразу"}
          ></RobotAddSmt>
          {/* Задержка */}
          { delayView === 0 && <button
            className={classnames("movesitem-add__btn", {
              "movesitem-add__btn--day": isDay,
              "movesitem-add__btn--night": !isDay,
            })}
            onClick={() => setDelayView(1)}
            >
              <PlusIco />
              <span>Задержка</span>
            </button>}
              <div  className="mimicitem__controller">
                {delayView === 1 && <input
                  className={classnames("controler__value", {
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
                className={classnames("mimicitem-add__last", {
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
      </li>
      )}

    </Draggable>
  );
};

export default MovesItem;
