import "./Robot.scss"; // Подключение стилей

import React, {useState, useEffect} from "react";
//import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { useMediaQuery } from "react-responsive";

//import NavList from "../NavList/NavList";
//import RightSidebar from "../RightSidebar/RightSidebar";

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
  const [bottomClickCoordinate, setBottomClickCoordinate] = useState();

  // for (const [key, value] of Object.entries(isActiveStateObject.day)) {
  //   console.log(`${key}: ${value}`);
  // }

  const handleRobotPartChoice = (e, robotPart) => {
    if (activeRobotPart === robotPart) {
      dispatch(resetActiveFlags());
    } else {
      const element = e.target.getBoundingClientRect();
      console.log('найти координату клика', element, Math.round(element.bottom));
      setBottomClickCoordinate(Math.round(element.bottom) + 'px');
      console.log('найти координату клика', bottomClickCoordinate);
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
                src={activeRobotPart === "l1" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "l1")}
              />
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "l2" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "l2")}
              />
              <img
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "l3" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "l3")}
              />
              <img
                alt="левая рука робота"
                className="robot__arm-item"
                src={activeRobotPart === "l4" ? robotHandDayActive : robotHand}
                onClick={(e) => handleRobotPartChoice(e, "l4")}
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
                onClick={(e) => handleRobotPartChoice(e, "r1")}
              />
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "r2" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "r2")}
              />
              <img
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={activeRobotPart === "r3" ? robotArmDayActive : robotArm}
                onClick={(e) => handleRobotPartChoice(e, "r3")}
              />
              <img
                alt="правая рука робота"
                className="robot__arm-item"
                src={activeRobotPart === "r4" ? robotHandDayActive : robotHand}
                onClick={(e) => handleRobotPartChoice(e, "r4")}
              />
            </div>
          </div>
          <RobotControl bottom={bottomClickCoordinate}></RobotControl>
          {isTablet ? <InputBottom></InputBottom> : <InputBottom></InputBottom>}
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
                  activeRobotPart === "l1" ? robotArmNightActive : robotArmNight
                }
                onClick={(e) => handleRobotPartChoice(e, "l1")}
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
                alt="левое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "l3" ? robotArmNightActive : robotArmNight
                }
                onClick={(e) => handleRobotPartChoice(e, "l3")}
              />
              <img
                alt="левая рука робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "l4"
                    ? robotHandNightActive
                    : robotHandNight
                }
                onClick={(e) => handleRobotPartChoice(e, "l4")}
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
                onClick={(e) => handleRobotPartChoice(e, "r1")}
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
                alt="правое предплечье робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "r3" ? robotArmNightActive : robotArmNight
                }
                onClick={(e) => handleRobotPartChoice(e, "r3")}
              />
              <img
                alt="правая рука робота"
                className="robot__arm-item"
                src={
                  activeRobotPart === "r4"
                    ? robotHandNightActive
                    : robotHandNight
                }
                onClick={(e) => handleRobotPartChoice(e, "r4")}
              />
            </div>
          </div>
          <RobotControl bottom={bottomClickCoordinate}></RobotControl>
          {isTablet ? null : <InputBottom></InputBottom>}
        </>
      )}
    </div>
  );
};

export default Robot;
