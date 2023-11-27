import { useSelector } from "react-redux";
import classnames from "classnames";
import HomeList from "../HomeList/HomeList";
import "./RightSidebar.scss";

const RightSidebar = () => {
  const isDay = useSelector((state) => state.isDay);
  const moves = useSelector((state) => state.moves);
  const mimics = useSelector((state) => state.mimics);
  return (
    <div
      className={classnames("right-sidebar", {
        "right-sidebar_day": isDay,
        "right-sidebar_night": !isDay,
      })}
    >
      <HomeList title="Движения" items={moves} />
      <HomeList title="Мимика" items={mimics} />
    </div>
  );
};

export default RightSidebar;
