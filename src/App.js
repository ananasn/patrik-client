// import { Routes, Route } from "react-router-dom";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import "./App.scss";
// import NavList from "./components/NavList/NavList";
// import RightSidebar from "./components/RightSidebar/RightSidebar";
import NavMenu from "./components/NavMenu/NavMenu";
import Profile from "./components/ProfileLink/Profile";

import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import Main from "./components/Main/Main,";

import { toggleDay } from "./store/actions";
// import DialogPopup from "./components/DialogPopup/DialogPopup";

function App() {
  const dispatch = useDispatch();
  const isDay = useSelector((state) => state.isDay);
  const isTablet = useMediaQuery({
    query: "(max-width: 850px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 650px)",
  });
  function changeTheme() {
    dispatch(toggleDay());
  }
  return (
    <div
      className={classnames("App", {
        App_day: isDay,
        App_night: !isDay,
      })}
    >
      {isTablet ? (
        <div className={`App__top ${isDay ? "" : "App__top--night"}`}>
          {isMobile ? null : <Profile />}
          <NavMenu />
        </div>
      ) : (
        <LeftSidebar />
      )}
      <Main />
      {/* <button onClick={changeTheme} style={{ position: "absolute" }} /> */}
    </div>
  );
}

export default App;
