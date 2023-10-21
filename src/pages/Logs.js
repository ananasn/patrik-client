import { useState } from "react";
import LogData from "../components/LogData/LogData";
import "./Logs.scss";

const Logs = () => {
  const [logs, setLogs] = useState([
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
  ]);
  return (
    <ul className="logs">
      {logs.map(({ id, text, date }) => (
        <LogData text={text} date={date} key={id}></LogData>
      ))}
    </ul>
  );
};

export default Logs;
