import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsModalOpen, setIsMove, setImportMimic } from "../../store/actions";
import classNames from "classnames";

import plus from "../../img/plus-day.svg";
import plusNight from "../../img/plus-night.svg";
import {ReactComponent as EmotionIco} from "../../img/icons/menu-day/mim.svg";

import "./RobotAddSmt.scss";

const RobotAddSmt = ({ word, pharsa, handlePhrasaChange, mimic, handleMimicChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMimic, setIsMimic] = useState(mimic ? true : false);
  const [addMimic, setAddMimic] = useState(mimic);
  const [formValue, setFormValue] = useState(pharsa);
  const isDay = useSelector((state) => state.isDay);
  const importMimic = useSelector((state) => state.importMimic);
  const mimics = useSelector((state) => state.mimics);
  //получать мимику при первом рендеринге
  console.log(mimics)
  const [importMimicName, setImportMimicName] = useState(mimic ? mimics.filter((item) => item.id == mimic).name : null);
  console.log(importMimic)
  const dispatch = useDispatch();
  const inputRef = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    if (!isOpen) {
      setIsOpen(!isOpen);
    }
    if (e.target.tagName === "H3" && isOpen) {
      setIsOpen(!isOpen);
    }
    if (e.target.tagName !== "BUTTON") {
      return;
    }
    console.log(e.target);
    setIsOpen(!isOpen);
  };
  const handleMimicOpen = (e) => {
    //e.preventDefault();
    dispatch(setIsMove(false));
    dispatch(toggleIsModalOpen());
    if(!isMimic) {
      setIsMimic(false);
    }
    if(isMimic) {
      setIsMimic(false);
    }
    setIsMimic(true);
    handleMimicChange(addMimic);
    console.log(addMimic, "handleMimicChange")
    /*if (importMimic) {
      console.log("import mim exist");
      setAddMimic(importMimic.id);
      handleMimicChange(importMimic.id);
      setImportMimicName(importMimic.test);
    }
    setAddMimic(importMimic ? importMimic.id : mimic);
    handleMimicChange(importMimic ? importMimic.id : mimic);

    //dispatch(setImportMimic(null));

    //const findMimic = mimics.filter((item) => item.id == mimic);
    setImportMimicName(importMimic ? importMimic.text : null);*/
    console.log(importMimicName)
  };
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputValue = inputRef.current.value;
      setFormValue(inputValue);
      handlePhrasaChange(inputValue);

      setIsOpen(false);
      inputRef.current.value = "";
    }
  };
  useEffect(() => {
    //const findMimic = mimics.filter((item) => item.id == mimic);
    //setImportMimicName(findMimic.name);
    /*if (importMimic) {
      setImportMimicName(importMimicName);
      setAddMimic(addMimic);
    }*/
    setImportMimicName(importMimic ? importMimic.text : mimics.filter((item) => item.id == mimic).name);
    setAddMimic(importMimic ? importMimic.id : mimic);
    //handleMimicChange(addMimic);
  }, [addMimic, importMimicName, mimic, importMimic, mimics, handleMimicChange]);
  return (
    <button
      onClick={
        word === "фразу" ? (e) => handleClick(e) : (e) => handleMimicOpen(e)
      }
      className={classNames("robotaddsmt", {
        "robotaddsmt--night": !isDay,
        "robotaddsmt--day": isDay,
        "robotaddsmt--active": isOpen || isMimic,
      })}
    >
      <img
        className={isOpen || isMimic ? "robotaddsmt__img--active" : ""}
        src={isDay ? plus : plusNight}
        alt="Plus"
      />
      <h3
        className={classNames("robotaddsmt__text", {
          "robotaddsmt__text--night": !isDay,
          "robotaddsmt__text--day": isDay,
          "robotaddsmt__text--hidden": isMimic,
        })}
      >
        {formValue ? formValue : `Добавить ${word}`}
      </h3>
      {isOpen ? (
        // <form className="robotaddsmt__form" onSubmit={handleSubmit}>
        <input
          placeholder="Введите текст для робота"
          className={classNames("robotaddsmt__input", {
            "robotaddsmt__input--night": !isDay,
            "robotaddsmt__input--day": isDay,
          })}
          onKeyDown={(e) => handleSubmit(e)}
          type="text"
          ref={inputRef}
        />
      ) : // </form>
      null}
      {isMimic ? (
          <div
            className="robotaddsmt__mimic-container"
          >
              <EmotionIco />
              <h3
                className={classNames("robotaddsmt__text", {
                  "robotaddsmt__text--night": !isDay,
                  "robotaddsmt__text--day": isDay,
                })}
              >
                {mimic}
                {/*mimic ? importMimicName : null*/}
                {addMimic ? importMimicName : null}
                {/*addMimic*/}
              </h3>
          </div>
          ) :  null}
    </button>
  );
};

export default RobotAddSmt;
