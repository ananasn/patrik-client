import "./Robot.scss"; // Подключение стилей

import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { useMediaQuery } from "react-responsive";

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
import robotLeftShoulderActive from "../../img/robot-day/robot-left-shoulder-active.svg";
import robotRightShoulderActive from "../../img/robot-day/robot-right-shoulder-active.svg";


import robotNeckNightActive from "../../img/robot-night/robot-neck-night-active.svg";
import robotArmNightActive from "../../img/robot-night/robot-arm-night-active.svg";
import robotHandNightActive from "../../img/robot-night/robot-hand-night-active.svg";
import robotLeftShoulderNightActive from "../../img/robot-night/robot-left-shoulder-night-active.svg";
import robotRightShoulderNightActive from "../../img/robot-night/robot-right-shoulder-night-active.svg";


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
  const [bottomClickCoordinate, setBottomClickCoordinate] = useState();

  // for (const [key, value] of Object.entries(isActiveStateObject.day)) {
  //   console.log(`${key}: ${value}`);
  // }

  const handleRobotPartChoice = (e, robotPart) => {
    if (activeRobotPart === robotPart) {
      dispatch(resetActiveFlags());
    } else {
      const element = e.target.getBoundingClientRect();
      const parent = e.target.parentNode.getBoundingClientRect();
      //console.log('высота родителя', parent.bottom)
      //console.log('найти координату клика', element, Math.round(element.bottom));
      setBottomClickCoordinate(Math.round(parent.bottom - element.bottom) + 'px');
      //console.log('найти координату клика', bottomClickCoordinate);
      dispatch(setRobotPart(robotPart));
    }
  };
  useEffect(() => {
    setBottomClickCoordinate(bottomClickCoordinate);
  }, [bottomClickCoordinate]);

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
            <img
              alt="лицо робота"
              className="robot__face"
              src={robotFace}
              onClick={(e) => handleRobotPartChoice(e, "neck")}
              />
            <img
              alt="шея робота"
              className="robot__neck"
              src={activeRobotPart === "neck" ? robotNeckDayActive : robotNeck}
              onClick={(e) => handleRobotPartChoice(e, "neck")}
            />
          </div>
          <div className="robot__body">
            <div className="robot__arm">
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "l4" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "l4")}
              />
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "l3" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "l3")}
              />
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "l2" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "l2")}
              />
              <img
                alt="левая рука робота"
                className="robot__arm-item"
                src={activeRobotPart === "l1" ? robotHandDayActive : robotHand}
                onClick={(e) => handleRobotPartChoice(e, "l1")}
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
                src={
                  activeRobotPart === "l5" ? robotLeftShoulderActive : robotLeftShoulder
                }
                onClick={(e) => handleRobotPartChoice(e, "l5")}
              />
              <img
                alt="правое плечо робота"
                className="robot__right-shoulder"
                src={
                  activeRobotPart === "r5" ? robotRightShoulderActive : robotRightShoulder
                }
                onClick={(e) => handleRobotPartChoice(e, "r5")}
              />
            </div>
            <div className="robot__arm">
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "r4" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "r4")}
              />
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "r3" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "r3")}
              />
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "r2" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "r2")}
              />
              <img
                alt="правая рука робота"
                className="robot__arm-item"
                src={activeRobotPart === "r1" ? robotHandDayActive : robotHand}
                onClick={(e) => handleRobotPartChoice(e, "r1")}
              />
            </div>
          </div>
          <RobotControl bottom={bottomClickCoordinate}></RobotControl>
          <InputBottom></InputBottom>
        </>
      ) : (
        <>
          <div className="robot__head">
            <img
              alt="лицо робота"
              className="robot__face"
              src={robotFaceNight}
              onClick={(e) => handleRobotPartChoice(e, "neck")}
            />
            <img
              alt="шея робота"
              className="robot__neck"
              src={
                activeRobotPart === "neck"
                  ? robotNeckNightActive
                  : robotNeckNight
              }
              onClick={(e) => handleRobotPartChoice(e, "neck")}
            />
          </div>
          <div className="robot__body">
            <div className="robot__arm">
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "l4" ? robotArmNightActive : robotArmNight
                }
                onClick={(e) => handleRobotPartChoice(e, "l4")}
              />
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "l3" ? robotArmNightActive : robotArmNight
                }
                onClick={(e) => handleRobotPartChoice(e, "l3")}
              />
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "l2" ? robotArmNightActive : robotArmNight
                }
                onClick={(e) => handleRobotPartChoice(e, "l2")}
              />
              <img
                alt="левая рука робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "l1"
                    ? robotHandNightActive
                    : robotHandNight
                }
                onClick={(e) => handleRobotPartChoice(e, "l1")}
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
                src={
                  activeRobotPart === "l5" ? robotLeftShoulderNightActive : robotLeftShoulderNight
                }
                onClick={(e) => handleRobotPartChoice(e, "l5")}
              />
              <img
                alt="правое плечо робота"
                className="robot__right-shoulder"
                src={
                  activeRobotPart === "r5" ? robotRightShoulderNightActive : robotRightShoulderNight
                }
                onClick={(e) => handleRobotPartChoice(e, "r5")}
              />
            </div>
            <div className="robot__arm">
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "r4" ? robotArmNightActive : robotArmNight
                }
                onClick={(e) => handleRobotPartChoice(e, "r4")}
              />
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "r3" ? robotArmNightActive : robotArmNight
                }
                onClick={(e) => handleRobotPartChoice(e, "r3")}
              />
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "r2" ? robotArmNightActive : robotArmNight
                }
                onClick={(e) => handleRobotPartChoice(e, "r2")}
              />
              <img
                alt="правая рука робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "r1"
                    ? robotHandNightActive
                    : robotHandNight
                }
                onClick={(e) => handleRobotPartChoice(e, "r1")}
              />
            </div>
          </div>
          <RobotControl bottom={bottomClickCoordinate}></RobotControl>
          <InputBottom></InputBottom>
        </>
      )}
    </div>
  );
};

export default Robot;
