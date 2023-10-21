import "./LogData.scss";
import { useSelector } from "react-redux";
import classnames from "classnames";
const LogData = ({ date, text }) => {
  const isDay = useSelector((state) => state.isDay);
  return (
    <li className="logs__item">
      <span
        className={classnames("logs__date", {
          "logs__date--day": isDay,
          "logs__date--night": !isDay,
        })}
      >
        {date}
      </span>
      <p
        className={classnames("logs__text", {
          "logs__text--day": isDay,
          "logs__text--night": !isDay,
        })}
      >
        {text}
      </p>
    </li>
  );
};

export default LogData;
