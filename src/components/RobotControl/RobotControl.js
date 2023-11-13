import TopBottom from "../../img/robot-control-day/top-bottom.svg";
import RightLeft from "../../img/robot-control-day/right-left.svg";
import TopBottomNight from "../../img/robot-control-night/top-bottom.svg";
import RightLeftNight from "../../img/robot-control-night/right-left.svg";
import { useSelector } from "react-redux";
import "./RobotControl.scss";

import Controler from "../Controler/Controler";

const RobotControl = () => {
  const isDay = useSelector((state) => state.isDay);
  const activeRobotPart = useSelector((state) => state.activeRobotPart);
  const itemClass = `robot__modal-control ${
    activeRobotPart ? `robot__modal-control--active` : ""
  }`;
  console.log(activeRobotPart, itemClass);
  const horizontalInput =
    activeRobotPart === "neck" && isDay ? (
      <>
        <Controler imgSrc={RightLeft} initialValue={150} id={"vertical"} />
        <Controler imgSrc={TopBottom} initialValue={130} id={"horizontal"} />
      </>
    ) : activeRobotPart === "neck" && !isDay ? (
      <>
        <Controler imgSrc={RightLeftNight} initialValue={150} id={"vertical"} />
        <Controler
          imgSrc={TopBottomNight}
          initialValue={130}
          id={"horizontal"}
        />
      </>
    ) : null;

  if (isDay) {
    return (
      <div className={itemClass}>
        {horizontalInput}
        {activeRobotPart === "neck" ? null : (
          <>
            <Controler imgSrc={RightLeft} initialValue={150} id={"vertical"} />
            {/*<Controler imgSrc={TopBottom} initialValue={130} id={"horizontal"} />*/}
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className={`${itemClass} robot__modal-control--night`}>
        {horizontalInput}
        {activeRobotPart === "neck" ? null : (
          <>
            <Controler
              imgSrc={RightLeftNight}
              initialValue={150}
              id={"vertical"}
            />
          {/*<Controler
            imgSrc={TopBottomNight}
            initialValue={130}
            id={"horizontal"}
        />*/}
          </>
        )}
      </div>
    );
  }
};

export default RobotControl;
