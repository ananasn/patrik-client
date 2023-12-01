import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";

import Controler from "../components/Controler/Controler";

import {ReactComponent as BackIco} from "../img/icons/menu-day/back.svg";

//robot
import {ReactComponent as RobotFaceIco} from "../img/robot/robot-face.svg";
import {ReactComponent as RobotNeckIco} from "../img/robot/robot-neck.svg";
import {ReactComponent as RobotArmIco} from "../img/robot/robot-arm.svg";
import {ReactComponent as RobotLogoIco} from "../img/robot/robot-logo.svg";
import {ReactComponent as RobotBodyIco} from "../img/robot/robot-body.svg";
import {ReactComponent as RobotLeftShoulderIco} from "../img/robot/robot-left-shoulder.svg";
import {ReactComponent as RobotRightShoulderIco} from "../img/robot/robot-right-shoulder.svg";


import rightLeft from "../img/robot-control-day/right-left.svg";
import rightLeftNight from "../img/robot-control-night/right-left.svg";

import './SafeZones.scss';

const SafeZones = () => {
  const isDay = useSelector((state) => state.isDay);
  const navigate = useNavigate();
    const goBack = () => {
    navigate(-1);
  };
  const [activeRobotPart, setActiveRobotPart] = useState(null);
  const [activeRobotPartName, setActiveRobotPartName] = useState(null);

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
        case "l5":
          setActiveRobotPartName("левой руки 5");
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
        case "r5":
          setActiveRobotPartName("правой руки 5");
          break;
        default:
          setActiveRobotPartName(null);
          break;
      }
    }
  };
  const changeControlState = (robotPart, e) => {
    /*if (robotPart === "r1") {
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
    }*/
    /*saveFunc({
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
      mimic: mimicData,
    });*/
  };
  console.log(activeRobotPart === "neck" & isDay, activeRobotPart === "neck", isDay)
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
              <div className="safezones__body-item">
                <div
                  className={classnames("safezones__robot", {
                    safezones__robot_day: isDay,
                    safezones__robot_night: !isDay,
                  })}
                >
                  <div className="safezones__head">
                    <span
                      className={classnames("safezones__face", {
                        safezones__face_day: isDay,
                        safezones__face_night: !isDay,
                      })}
                      onClick={() => handleRobotPartChoice("neck")}
                    >
                      <RobotFaceIco />
                    </span>
                    <span
                      className={classnames("safezones__neck", {
                        safezones__neck_day: isDay,
                        safezones__neck_night: !isDay,
                        active_robot_part_day: activeRobotPart === "neck" & isDay,
                        active_robot_part_night: activeRobotPart === "neck" & !isDay,
                      })}
                      onClick={() => handleRobotPartChoice("neck")}
                    >
                      <RobotNeckIco />
                    </span>
                  </div>
                  <div className="safezones__body">
                    <div className="safezones__arm">
                      <span
                        className={classnames("safezones__armitem", {
                          safezones__armitem_day: isDay,
                          safezones__armitem_night: !isDay,
                          active_robot_part_day: activeRobotPart === "l4" & isDay,
                          active_robot_part_night: activeRobotPart === "l4" & !isDay,
                        })}
                        onClick={() => handleRobotPartChoice("l4")}
                      >
                        <RobotArmIco />
                      </span>
                      <span
                        className={classnames("safezones__armitem", {
                          safezones__armitem_day: isDay,
                          safezones__armitem_night: !isDay,
                          active_robot_part_day: activeRobotPart === "l3" & isDay,
                          active_robot_part_night: activeRobotPart === "l3" & !isDay,
                        })}
                        onClick={() => handleRobotPartChoice("l3")}
                      >
                        <RobotArmIco />
                      </span>
                      <span
                        className={classnames("safezones__armitem", {
                          safezones__armitem_day: isDay,
                          safezones__armitem_night: !isDay,
                          active_robot_part_day: activeRobotPart === "l2" & isDay,
                          active_robot_part_night: activeRobotPart === "l2" & !isDay,
                        })}
                        onClick={() => handleRobotPartChoice("l2")}
                      >
                        <RobotArmIco />
                      </span>
                      <span
                        className={classnames("safezones__armitem", {
                          safezones__armitem_day: isDay,
                          safezones__armitem_night: !isDay,
                          active_robot_part_day: activeRobotPart === "l1" & isDay,
                          active_robot_part_night: activeRobotPart === "l1" & !isDay,
                        })}
                        onClick={() => handleRobotPartChoice("l1")}
                      >
                        <RobotArmIco />
                      </span>
                    </div>
                    <div className="safezones__torso">
                      <span
                        className={classnames("safezones__logo", {
                          safezones__logo_day: isDay,
                          safezones__logo_night: !isDay,
                        })}
                      >
                        <RobotLogoIco />
                      </span>
                      <span
                        className={classnames("safezones__breast", {
                          safezones__breast_day: isDay,
                          safezones__breast_night: !isDay,
                        })}
                      >
                        <RobotBodyIco />
                      </span>
                      <span
                        className={classnames("safezones__left_shoulder", {
                          safezones__left_shoulder_day: isDay,
                          safezones__left_shoulder_night: !isDay,
                          active_robot_part_day: activeRobotPart === "l5" & isDay,
                          active_robot_part_night: activeRobotPart === "l5" & !isDay,
                        })}
                        onClick={() => handleRobotPartChoice("l5")}
                      >
                        <RobotLeftShoulderIco />
                      </span>
                      <span
                        className={classnames("safezones__right_shoulder", {
                          safezones__right_shoulder_day: isDay,
                          safezones__right_shoulder_night: !isDay,
                          active_robot_part_day: activeRobotPart === "r5" & isDay,
                          active_robot_part_night: activeRobotPart === "r5" & !isDay,
                        })}
                        onClick={() => handleRobotPartChoice("r5")}
                      >
                        <RobotRightShoulderIco />
                      </span>
                    </div>
                    <div className="safezones__arm">
                      <span
                        className={classnames("safezones__armitem", {
                          safezones__armitem_day: isDay,
                          safezones__armitem_night: !isDay,
                          active_robot_part_day: activeRobotPart === "r4" & isDay,
                          active_robot_part_night: activeRobotPart === "r4" & !isDay,
                        })}
                        onClick={() => handleRobotPartChoice("r4")}
                      >
                        <RobotArmIco />
                      </span>
                      <span
                        className={classnames("safezones__armitem", {
                          safezones__armitem_day: isDay,
                          safezones__armitem_night: !isDay,
                          active_robot_part_day: activeRobotPart === "r3" & isDay,
                          active_robot_part_night: activeRobotPart === "r3" & !isDay,
                        })}
                        onClick={() => handleRobotPartChoice("r3")}
                      >
                        <RobotArmIco />
                      </span>
                      <span
                        className={classnames("safezones__armitem", {
                          safezones__armitem_day: isDay,
                          safezones__armitem_night: !isDay,
                          active_robot_part_day: activeRobotPart === "r2" & isDay,
                          active_robot_part_night: activeRobotPart === "r2" & !isDay,
                        })}
                        onClick={() => handleRobotPartChoice("r2")}
                      >
                        <RobotArmIco />
                      </span>
                      <span
                        className={classnames("safezones__armitem", {
                          safezones__armitem_day: isDay,
                          safezones__armitem_night: !isDay,
                          active_robot_part_day: activeRobotPart === "r1" & isDay,
                          active_robot_part_night: activeRobotPart === "r1" & !isDay,
                        })}
                        onClick={() => handleRobotPartChoice("r1")}
                      >
                        <RobotArmIco />
                      </span>
                    </div>
                  </div>
                </div>
                {/*<div className="movesitem__control">
                  <h2 className="movesitem__control-name">
                    {activeRobotPartName
                      ? `Позиция ${activeRobotPartName}`
                      : "Выберите конечность робота для настройки"}
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
                    </div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeZones;