import React from "react";
import { Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";

import "./Main.scss";

import Home from "../../pages/Home";
import Settings from "../../pages/Settings";
// import DialogPopup from "../DialogPopup/DialogPopup";
import Moves from "../../pages/Moves";
import RobotMoves from "../../pages/RobotMoves";
import Emotions from "../../pages/Emotions";
import Logs from "../../pages/Logs";
import RobotEmotion from "../../pages/RobotEmotion";
import Scenarios from "../../pages/Scenarios";
import RobotScript from "../../pages/RobotScript";

const Main = () => {
  // const isDay = useSelector((state) => state.isDay);
  return (
    <div className="main">
      <div className="main__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/logs" element={<Logs></Logs>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/scenarios" element={<Scenarios></Scenarios>} />
          <Route path="/script/:scriptId" element={<RobotScript></RobotScript>} />
          <Route path="/new-script" element={<RobotScript></RobotScript>} />
          <Route path="/dialog" element={<Home />} />
          <Route path="/motion-recognition" element={<h1>motion</h1>} />
          <Route path="/moves" element={<Moves />} />
          <Route path="/emotions" element={<Emotions></Emotions>} />
          <Route path="/move" element={<RobotMoves></RobotMoves>} />
          <Route path="/move/:moveId" element={<RobotMoves></RobotMoves>} />
          <Route path="/new-move" element={<RobotMoves></RobotMoves>} />
          <Route path="/emotion" element={<RobotEmotion></RobotEmotion>} />
          <Route path="/emotion/:mimicId" element={<RobotEmotion></RobotEmotion>} />
          <Route path="/new-emotion" element={<RobotEmotion></RobotEmotion>} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
