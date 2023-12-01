import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import TopBottom from "../../img/robot-control-day/top-bottom.svg";
import RightLeft from "../../img/robot-control-day/right-left.svg";
import TopBottomNight from "../../img/robot-control-night/top-bottom.svg";
import RightLeftNight from "../../img/robot-control-night/right-left.svg";

import "./RobotControl.scss";

import Controler from "../Controler/Controler";

const RobotControl = ({bottom}) => {
  const isDay = useSelector((state) => state.isDay);
  const activeRobotPart = useSelector((state) => state.activeRobotPart);
  const itemClass = `robot__modal-control ${
    activeRobotPart ? `robot__modal-control--active` : ""
  }`;
  //console.log(activeRobotPart, itemClass);
  //console.log('передать значение', bottom)
  const isTablet = useMediaQuery({
    query: "(max-width: 850px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 650px)",
  });
  const bottomStyle = !isTablet & !isMobile & !(activeRobotPart === "neck") ? bottom : null;
  //console.log('применить стили только для пк', bottomStyle)
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
      <div className={itemClass} style={{bottom: bottomStyle}}>
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
      <div className={`${itemClass} robot__modal-control--night`} style={{bottom: bottomStyle}}>
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
