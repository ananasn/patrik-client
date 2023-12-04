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
import Update from "../../pages/Update";
import SafeZones from "../../pages/SafeZones";
import Recognition from "../../pages/Recognition";

const Main = () => {
  // const isDay = useSelector((state) => state.isDay);
  return (
    <div className="main">
      <div className="main__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/logs" element={<Logs></Logs>} />
          <Route path="/update" element={<Update></Update>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/safe-zones" element={<SafeZones />} />
          <Route path="/settings/account" element={<h1> Account </h1>} />
          <Route path="/settings/robot-access" element={<h1> Access </h1>} />
          <Route path="/scenarios" element={<Scenarios></Scenarios>} />
          <Route path="/script/:scriptId" element={<RobotScript></RobotScript>} />
          <Route path="/new-script" element={<RobotScript></RobotScript>} />
          <Route path="/dialog" element={<Home />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="/moves" element={<Moves />} />
          <Route path="/emotions" element={<Emotions></Emotions>} />
          <Route path="/moves/move" element={<RobotMoves></RobotMoves>} />
          <Route path="/moves/move/:moveId" element={<RobotMoves></RobotMoves>} />
          <Route path="/moves/new-move" element={<RobotMoves></RobotMoves>} />
          <Route path="/emotions/emotion" element={<RobotEmotion></RobotEmotion>} />
          <Route path="/emotions/emotion/:mimicId" element={<RobotEmotion></RobotEmotion>} />
          <Route path="/emotions/new-emotion" element={<RobotEmotion></RobotEmotion>} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
