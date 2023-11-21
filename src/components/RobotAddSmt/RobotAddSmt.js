import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsModalOpen, setIsMove, setImportMimic } from "../../store/actions";
import classNames from "classnames";

import plus from "../../img/plus-day.svg";
import plusNight from "../../img/plus-night.svg";
import {ReactComponent as EmotionIco} from "../../img/icons/menu-day/mim.svg";

import "./RobotAddSmt.scss";

const RobotAddSmt = ({ word, pharsa, handlePhrasaChange, handleMimicChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMimic, setIsMimic] = useState(false);
  const [formValue, setFormValue] = useState(pharsa);
  const isDay = useSelector((state) => state.isDay);
  const importMimic = useSelector((state) => state.importMimic);
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
    e.preventDefault();
    dispatch(setIsMove(false));
    dispatch(toggleIsModalOpen());

    if (!isMimic) {
      setIsMimic(!isMimic);
    }
    if (e.target.tagName === "H3" && isMimic) {
      setIsMimic(!isMimic);
    }
    if (e.target.tagName !== "BUTTON") {
      return;
    }
    console.log(e.target);
    setIsMimic(!isMimic);
    //setIsMimic(false);
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
  const handleMimicClick = (e) => {
    console.log('Кликнули по уже выбранной мимике');
    handleMimicChange({id: importMimic.id, text: importMimic.text});
    setIsMimic(false);
    dispatch(setImportMimic(null));
  }
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
            onClick={(e) => handleMimicClick(e)}
          >
              <EmotionIco />
              <h3>
                { importMimic &&
                  importMimic.text
                }
              </h3>
          </div>
          ) :  null}
    </button>
  );
};

export default RobotAddSmt;
