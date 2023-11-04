import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useMediaQuery } from "react-responsive";
import ControlerMimic from "../ControlerMimic/ControlerMimic";
import {ReactComponent as Down} from "../../img/robot-mimic/down.svg";
import {ReactComponent as Up} from "../../img/robot-mimic/up.svg";
import {ReactComponent as DownNight} from "../../img/robot-mimic-night/down-night.svg";
import {ReactComponent as UpNight} from "../../img/robot-mimic-night/up-night.svg";

import "./Tabs.scss";

let start = 0;
const generateCode = (function (){
  return () => ++start;
}());

const Tabs = ({
  id,
  onChange,
  onToggleTab,
  mimicItemId,
  xLeftEyeStart,
  yLeftEyeStart,
  wLeftEyeStart,
  hLeftEyeStart,
  xRightEyeStart,
  yRightEyeStart,
  wRightEyeStart,
  hRightEyeStart,
  xMouthStart,
  yMouthStart,
  wMouthStart,
  hMouthStart,
  leftEyeStart,
  mouthStart,
  rightEyeStart,
 }) => {
  const isDay = useSelector((state) => state.isDay);
  //"глаз или рот:", toggleState,
  const [toggleState, setToggleState] = useState(1);
  // "вверх, прямой, вниз:", Value)
  const [leftEyeValue, setLeftEyeValue] = useState(leftEyeStart);
  const [mouthValue, setMouthValue] = useState(mouthStart);
  const [rightEyeValue, setRightEyeValue] = useState(rightEyeStart);
  // верхние табы
  const toggleTab = (index) => {
    setToggleState(index);
  }
  const isMobile = useMediaQuery({
    query: "(max-width: 650px)",
  });
  // табы контролерров при мобильном разрешении
  const [toggleMobileControlsTab, setToggleMobileControlsTab] = useState("x");

  const [xLeftEye, setXLeftEye] = useState(xLeftEyeStart);
  const [yLeftEye, setYLeftEye] = useState(yLeftEyeStart);
  const [wLeftEye, setWLeftEye] = useState(wLeftEyeStart);
  const [hLeftEye, setHLeftEye] = useState(hLeftEyeStart);

  const [xRightEye, setXRightEye] = useState(xRightEyeStart);
  const [yRightEye, setYRightEye] = useState(yRightEyeStart);
  const [wRightEye, setWRightEye] = useState(wRightEyeStart);
  const [hRightEye, setHRightEye] = useState(hRightEyeStart);

  const [xMouth, setXMouth] = useState(xMouthStart);
  const [yMouth, setYMouth] = useState(yMouthStart);
  const [wMouth, setWMouth] = useState(wMouthStart);
  const [hMouth, setHMouth] = useState(hMouthStart);

  useEffect(() => {
    onToggleTab({
      xLeftEye,
      yLeftEye,
      wLeftEye,
      hLeftEye,
      xRightEye,
      yRightEye,
      wRightEye,
      hRightEye,
      xMouth,
      yMouth,
      wMouth,
      hMouth,
      leftEyeValue,
      mouthValue,
      rightEyeValue,
    });
  }, [xLeftEye, yLeftEye, wLeftEye, hLeftEye, xRightEye, yRightEye, wRightEye, hRightEye, xMouth, yMouth, wMouth, hMouth, leftEyeValue, mouthValue, rightEyeValue,])

  return (
    <div className="tabs">
      <div
        className={classNames("face__items-container", {
          "face__items-container--day": isDay,
          "face__items-container--night": !isDay,
        })}
      >
        <div
          className={toggleState === 1 ? "face__item-title active" : "face__item-title"}
          onClick={() => toggleTab(1)}
          data-target="tab-1"
        >
          левый глаз
        </div>
        <div
          className={toggleState === 2 ? "face__item-title active" : "face__item-title"}
          onClick={() => toggleTab(2)}
          data-target="tab-2"
        >
          рот
        </div>
        <div
          className={toggleState === 3 ? "face__item-title active" : "face__item-title"}
          onClick={() => toggleTab(3)}
          data-target="tab-3"
        >
          правый глаз
        </div>
      </div>
      <div
        className={toggleState === 1 ? "content active-content" : "content"}
        data-target="tab-1"
        > {/*Tab1*/}
        <div
          className={classNames("face__items-container", {
            "face__items-container--day": isDay,
            "face__items-container--night": !isDay,
          })}
        >
          <div
            className={leftEyeValue === 0 ? "face__item-img active" : "face__item-img"}
            onClick={() => setLeftEyeValue(0)}
          >
            <Down />
          </div>
          <div
            className={leftEyeValue === 1 ? "face__item-img active" : "face__item-img"}
            onClick={() => setLeftEyeValue(1)}
          >
            <div className="line"></div>
          </div>
          <div
            className={leftEyeValue === 2 ? "face__item-img active" : "face__item-img"}
             onClick={() => setLeftEyeValue(2)}
          >
            <Up />
          </div>
        </div>
      </div>
      <div
        className={toggleState === 2 ? "content active-content" : "content"}
        data-target="tab-2"
      >{/*Tab2*/}
        <div
          className={classNames("face__items-container", {
            "face__items-container--day": isDay,
            "face__items-container--night": !isDay,
          })}
        >
          <div
            className={mouthValue === 0 ? "face__item-img active" : "face__item-img"}
            onClick={() => setMouthValue(0)}
          >
            <Down />
          </div>
          <div
            className={mouthValue === 1 ? "face__item-img active" : "face__item-img"}
             onClick={() => setMouthValue(1)}
          >
            <div className="line line--day"></div>
          </div>
          <div
            className={mouthValue === 2 ? "face__item-img active" : "face__item-img"}
            onClick={() => setMouthValue(2)}
          >
            <Up />
          </div>
        </div>
      </div>
      <div
        className={toggleState === 3 ? "content active-content" : "content"}
        data-target="tab-3"
      >{/*Tab3*/}
        <div
          className={classNames("face__items-container", {
            "face__items-container--day": isDay,
            "face__items-container--night": !isDay,
          })}
        >
          <div
            className={rightEyeValue === 0 ? "face__item-img active" : "face__item-img"}
            onClick={() => setRightEyeValue(0)}
          >
            <Down />
          </div>
          <div
            className={rightEyeValue === 1 ? "face__item-img active" : "face__item-img"}
            onClick={() => setRightEyeValue(1)}
          >
            <div className="line"></div>
          </div>
          <div
            className={rightEyeValue === 2 ? "face__item-img active" : "face__item-img"}
            onClick={() => setRightEyeValue(2)}
          >
            <Up />
          </div>
        </div>
      </div>
      <div className={toggleState === 1 ? "content controls-content active-content" : "content"}>
        <div className={classNames("mobile-controls-tabs", {
          "mobile-controls-tabs--day": isDay,
          "mobile-controls-tabs--night": !isDay,
          "mobile-controls-tabs--hide": !isMobile,
          "mobile-controls-tabs--show": isMobile,
        })}>
          <div
            className={toggleMobileControlsTab === "x" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("x")}
            data-target="mobile-tab-x"
          >
            X
          </div>
          <div
            className={toggleMobileControlsTab === "y" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("y")}
            data-target="mobile-tab-y"
          >
            Y
          </div>
          <div
            className={toggleMobileControlsTab === "w" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("w")}
            data-target="mobile-tab-w"
          >
            W
          </div>
          <div
            className={toggleMobileControlsTab === "h" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("h")}
            data-target="mobile-tab-h"
          >
            H
          </div>
        </div>
        <div className="controls-item">
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "x" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="X"
              initialValue={xLeftEye}
              id={"x" + (mimicItemId || generateCode())}
              onChange={(e) => setXLeftEye(e)}
            ></ControlerMimic>
          </div>
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "y" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="Y"
              initialValue={yLeftEye}
              id={"y" + (mimicItemId || generateCode())}
              onChange={(e) => setYLeftEye(e)}
            ></ControlerMimic>
          </div>
        </div>
        <div className="controls-item">
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "w" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="W"
              initialValue={wLeftEye}
              id={"w" + (mimicItemId || generateCode())}
              onChange={(e) => setWLeftEye(e)}
            ></ControlerMimic>
          </div>
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "h" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="H"
              initialValue={hLeftEye}
              id={"h" + (mimicItemId || generateCode())}
              onChange={(e) => setHLeftEye(e)}
            ></ControlerMimic>
          </div>
        </div>
      </div>
      <div className={toggleState === 2 ? "content controls-content active-content" : "content"}>
        <div className={classNames("mobile-controls-tabs", {
            "mobile-controls-tabs--day": isDay,
            "mobile-controls-tabs--night": !isDay,
            "mobile-controls-tabs--hide": !isMobile,
            "mobile-controls-tabs--show": isMobile,
          })}>
          <div
            className={toggleMobileControlsTab === "x" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("x")}
            data-target="mobile-tab-x"
          >
            X
          </div>
          <div
            className={toggleMobileControlsTab === "y" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("y")}
            data-target="mobile-tab-y"
          >
            Y
          </div>
          <div
            className={toggleMobileControlsTab === "w" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("w")}
            data-target="mobile-tab-w"
          >
            W
          </div>
          <div
            className={toggleMobileControlsTab === "h" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("h")}
            data-target="mobile-tab-h"
          >
            H
          </div>
        </div>
        <div className="controls-item">
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "x" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="X"
              initialValue={xMouth}
              id={"x" + (mimicItemId || generateCode())}
              onChange={(e) => setXMouth(e)}
            ></ControlerMimic>
          </div>
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "y" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="Y"
              initialValue={yMouth}
              id={"y" + (mimicItemId || generateCode())}
              onChange={(e) => setYMouth(e)}
            ></ControlerMimic>
          </div>
        </div>
        <div className="controls-item">
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "w" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="W"
              initialValue={wMouth}
              id={"w" + (mimicItemId || generateCode())}
              onChange={(e) => setWMouth(e)}
            ></ControlerMimic>
          </div>
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "h" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="H"
              initialValue={hMouth}
              id={"h" + (mimicItemId || generateCode())}
              onChange={(e) => setHMouth(e)}
            ></ControlerMimic>
          </div>
        </div>
      </div>
      <div className={toggleState === 3 ? "content controls-content active-content" : "content"}>
        <div className={classNames("mobile-controls-tabs", {
            "mobile-controls-tabs--day": isDay,
            "mobile-controls-tabs--night": !isDay,
            "mobile-controls-tabs--hide": !isMobile,
            "mobile-controls-tabs--show": isMobile,
          })}>
          <div
            className={toggleMobileControlsTab === "x" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("x")}
            data-target="mobile-tab-x"
          >
            X
          </div>
          <div
            className={toggleMobileControlsTab === "y" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("y")}
            data-target="mobile-tab-y"
          >
            Y
          </div>
          <div
            className={toggleMobileControlsTab === "w" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("w")}
            data-target="mobile-tab-w"
          >
            W
          </div>
          <div
            className={toggleMobileControlsTab === "h" ? "mobile-controls__item-title active" : "mobile-controls__item-title"}
            onClick={() => setToggleMobileControlsTab("h")}
            data-target="mobile-tab-h"
          >
            H
          </div>
        </div>
        <div className="controls-item">
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "x" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="X"
              initialValue={xRightEye}
              id={"x" + (mimicItemId || generateCode())}
              onChange={(e) => setXRightEye(e)}
            ></ControlerMimic>
          </div>
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "y" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="Y"
              initialValue={yRightEye}
              id={"y" + (mimicItemId || generateCode())}
              onChange={(e) => setYRightEye(e)}
            ></ControlerMimic>
          </div>
        </div>
        <div className="controls-item">
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "w" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="W"
              initialValue={wRightEye}
              id={"w" + (mimicItemId || generateCode())}
              onChange={(e) => setWRightEye(e)}
            ></ControlerMimic>
          </div>
          <div className={!isMobile ? "mimicitem__controller" : toggleMobileControlsTab === "h" ? "mimicitem__controller" : "mimicitem__controller--hide"}>
            <ControlerMimic
              maxValue={3000}
              text="H"
              initialValue={hRightEye}
              id={"h" + (mimicItemId || generateCode())}
              onChange={(e) => setHRightEye(e)}
            ></ControlerMimic>
          </div>
        </div>
      </div>
  </div>
  );
};

export default Tabs;
