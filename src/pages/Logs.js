import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { useHttp } from "../hooks/http.hook";
import LogData from "../components/LogData/LogData";
import { API_PATH } from "../api/index";
import back from "../img/icons/menu-day/back-day.svg";
import backNight from "../img/icons/menu-night/back-night.svg";
import "./Logs.scss";

const Logs = () => {
  const [logs, setLogs] = useState(/*[
    {
      date: "2023-07-18  07:52:16:149",
      text: "Completed design phase, started development, and scheduled testing phase for next week.",
      id: "1",
    },
    {
      date: "2023-07-18  07:52:16:149",
      text: "Completed design phase, started development, and scheduled testing phase for next week.",
      id: "2",
    },
    {
      date: "2023-07-18  07:52:16:149",
      text: "Completed design phase, started development, and scheduled testing phase for next week.",
      id: "3",
    },
    {
      date: "2023-07-18  07:52:16:149",
      text: "Completed design phase, started development, and scheduled testing phase for next week.",
      id: "4",
    },
    {
      date: "2023-07-18  07:52:16:149",
      text: "Completed design phase, started development, and scheduled testing phase for next week.",
      id: "5",
    },
    {
      date: "2023-07-18  07:52:16:149",
      text: "Completed design phase, started development, and scheduled testing phase for next week.",
      id: "6",
    },
    {
      date: "2023-07-18  07:52:16:149",
      text: "Completed design phase, started development, and scheduled testing phase for next week.",
      id: "7",
    },
    {
      date: "2023-07-18  07:52:16:149",
      text: "Completed design phase, started development, and scheduled testing phase for next week.",
      id: "8",
    },
  ]*/);
  const { request, loading } = useHttp();
  const isDay = useSelector((state) => state.isDay);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await request(`${API_PATH}api/log/`);
      const data = await response;
      console.log(data);
      setLogs(data.logs);
    };
    fetchData();
  }, []);
    if (loading) {
    return <h1 className="loading-text" style={{ textAlign: "center" }}>Идёт загрузка...</h1>;
  }
  return (
    <div className="logs">
      <div
        className={classnames("logs__header", {
          logs__header_day: isDay,
          logs__header_night: !isDay,
        })}
      >
        <button
          onClick={goBack}
          className={classnames("logs__back-btn", {
            "logs__back-btn_day": isDay,
            "logs__back-btn_night": !isDay,
          })}
        >
          <img
            className="logs__back-btn-img"
            alt="Back"
            src={isDay ? back : backNight}
          />
          Логи
        </button>
      </div>
      <div className="logs__content">
        <ul className="logs__list">
          {logs && logs.map(({ id, text, date }) => (
            <LogData text={text} date={date} key={id}></LogData>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default Logs;
