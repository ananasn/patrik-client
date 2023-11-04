import "./Robot.scss"; // Подключение стилей

import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { useMediaQuery } from "react-responsive";

import NavList from "../NavList/NavList";
import RightSidebar from "../RightSidebar/RightSidebar";

import robotBody from "../../img/robot-day/robot-body.svg";
import robotLeftShoulder from "../../img/robot-day/robot-left-shoulder.svg";
import robotRightShoulder from "../../img/robot-day/robot-right-shoulder.svg";
import robotNeck from "../../img/robot-day/robot-neck.svg";
import robotFace from "../../img/robot-day/robot-face.svg";
import robotArm from "../../img/robot-day/robot-arm.svg";
import robotHand from "../../img/robot-day/robot-hand.svg";
import robotLogo from "../../img/robot-day/robot-logo-day.png";

import robotBodyNight from "../../img/robot-night/robot-body-night.svg";
import robotLeftShoulderNight from "../../img/robot-night/robot-left-shoulder-night.svg";
import robotRightShoulderNight from "../../img/robot-night/robot-right-shoulder-night.svg";
import robotNeckNight from "../../img/robot-night/robot-neck-night.svg";
import robotFaceNight from "../../img/robot-night/robot-face-night.svg";
import robotArmNight from "../../img/robot-night/robot-arm-night.svg";
import robotHandNight from "../../img/robot-night/robot-hand-night.svg";

import robotNeckDayActive from "../../img/robot-day/neck-day-active.svg";
import robotArmDayActive from "../../img/robot-day/arm-day-active.svg";
import robotHandDayActive from "../../img/robot-day/hand-day-active.svg";

import robotNeckNightActive from "../../img/robot-night/robot-neck-night-active.svg";
import robotArmNightActive from "../../img/robot-night/robot-arm-night-active.svg";
import robotHandNightActive from "../../img/robot-night/robot-hand-night-active.svg";

import { resetActiveFlags, setRobotPart } from "../../store/actions";
import InputBottom from "../InputBottom/InputBottom";
import RobotControl from "../RobotControl/RobotControl";

const Robot = () => {
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({
    query: "(max-width: 850px)",
  });
  const activeRobotPart = useSelector((state) => state.activeRobotPart);

  const isDay = useSelector((state) => state.isDay);

  // for (const [key, value] of Object.entries(isActiveStateObject.day)) {
  //   console.log(`${key}: ${value}`);
  // }

  const handleRobotPartChoice = (robotPart) => {
    if (activeRobotPart === robotPart) {
      dispatch(resetActiveFlags());
    } else {
      dispatch(setRobotPart(robotPart));
    }
  };
  return (
    <div
      className={classnames("robot", {
        robot_day: isDay,
        robot_night: !isDay,
      })}
    >
      {isDay ? (
        <>
          <div className="robot__head">
            <img alt="лицо робота" className="robot__face" src={robotFace} />
            <img
              alt="шея робота"
              className="robot__neck"
              src={activeRobotPart === "neck" ? robotNeckDayActive : robotNeck}
              onClick={() => handleRobotPartChoice("neck")}
            />
          </div>
          <div className="robot__body">
            <div className="robot__arm">
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "l1" ? robotArmDayActive : robotArm}
                onClick={() => handleRobotPartChoice("l1")}
              />
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "l2" ? robotArmDayActive : robotArm}
                onClick={() => handleRobotPartChoice("l2")}
              />
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "l3" ? robotArmDayActive : robotArm}
                onClick={() => handleRobotPartChoice("l3")}
              />
              <img
                alt="левая рука робота"
                className="robot__arm-item"
                src={activeRobotPart === "l4" ? robotHandDayActive : robotHand}
                onClick={() => handleRobotPartChoice("l4")}
              />
            </div>
            <div className="robot__torso">
              <img
                alt="логотип робота"
                className="robot__logo"
                src={robotLogo}
              />
              <img
                alt="тело робота"
                className="robot__breast"
                src={robotBody}
              />
              <img
                alt="левое плечо робота"
                className="robot__left-shoulder"
                src={robotLeftShoulder}
              />
              <img
                alt="правое плечо робота"
                className="robot__right-shoulder"
                src={robotRightShoulder}
              />
            </div>
            <div className="robot__arm">
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "r1" ? robotArmDayActive : robotArm}
                onClick={() => handleRobotPartChoice("r1")}
              />
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "r2" ? robotArmDayActive : robotArm}
                onClick={() => handleRobotPartChoice("r2")}
              />
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "r3" ? robotArmDayActive : robotArm}
                onClick={() => handleRobotPartChoice("r3")}
              />
              <img
                alt="правая рука робота"
                className="robot__arm-item"
                src={activeRobotPart === "r4" ? robotHandDayActive : robotHand}
                onClick={() => handleRobotPartChoice("r4")}
              />
            </div>
          </div>
          <RobotControl></RobotControl>
          {isTablet ? null : <InputBottom></InputBottom>}
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
        </>
      ) : (
        <>
          <div className="robot__head">
            <img
              alt="лицо робота"
              className="robot__face"
              src={robotFaceNight}
            />
            <img
              alt="шея робота"
              className="robot__neck"
              src={
                activeRobotPart === "neck"
                  ? robotNeckNightActive
                  : robotNeckNight
              }
              onClick={() => handleRobotPartChoice("neck")}
            />
          </div>
          <div className="robot__body">
            <div className="robot__arm">
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "l1" ? robotArmNightActive : robotArmNight
                }
                onClick={() => handleRobotPartChoice("l1")}
              />
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "l2" ? robotArmNightActive : robotArmNight
                }
                onClick={() => handleRobotPartChoice("l2")}
              />
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "l3" ? robotArmNightActive : robotArmNight
                }
                onClick={() => handleRobotPartChoice("l3")}
              />
              <img
                alt="левая рука робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "l4"
                    ? robotHandNightActive
                    : robotHandNight
                }
                onClick={() => handleRobotPartChoice("l4")}
              />
            </div>
            <div className="robot__torso">
              <img
                alt="логотип робота"
                className="robot__logo"
                src={robotLogo}
              />
              <img
                alt="тело робота"
                className="robot__breast"
                src={robotBodyNight}
              />
              <img
                alt="левое плечо робота"
                className="robot__left-shoulder"
                src={robotLeftShoulderNight}
              />
              <img
                alt="правое плечо робота"
                className="robot__right-shoulder"
                src={robotRightShoulderNight}
              />
            </div>
            <div className="robot__arm">
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "r1" ? robotArmNightActive : robotArmNight
                }
                onClick={() => handleRobotPartChoice("r1")}
              />
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "r2" ? robotArmNightActive : robotArmNight
                }
                onClick={() => handleRobotPartChoice("r2")}
              />
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "r3" ? robotArmNightActive : robotArmNight
                }
                onClick={() => handleRobotPartChoice("r3")}
              />
              <img
                alt="правая рука робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "r4"
                    ? robotHandNightActive
                    : robotHandNight
                }
                onClick={() => handleRobotPartChoice("r4")}
              />
            </div>
          </div>
          <RobotControl></RobotControl>
          {isTablet ? null : <InputBottom></InputBottom>}
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
        </>
      )}
    </div>
  );
};

export default Robot;
