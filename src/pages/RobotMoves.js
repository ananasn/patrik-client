import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsModalOpen, setIsMove } from "../store/actions";
import MovesItem from "../components/MovesItem/MovesItem";
//import DelayTimer from "../components/DelayTimer/DelayTimer";

import back from "../img/icons/menu-day/back-day.svg";
import backNight from "../img/icons/menu-night/back-night.svg";
import pen from "../img/pen-day.svg";
import penNight from "../img/pen-night.svg";
import run from "../img/play-day.svg";
import runNight from "../img/play-night.svg";
import save from "../img/save-day.svg";
import saveNight from "../img/save-night.svg";
import plus from "../img/plus-day.svg";
import plusNight from "../img/plus-night.svg";
import importDay from "../img/import/import-day.svg";
import importNight from "../img/import/import-night.svg";

import "./RobotMoves.scss";
import Modal from "../components/Modal/Modal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const RobotMoves = () => {
  const isDay = useSelector((state) => state.isDay);
  const { moveId } = useParams();
  const { request, loading, error, clearError } = useHttp();
  const [inputValue, setInputValue] = useState("Новое движение");
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/pose/");
      const data = await response;
      const result = await data.filter((item) => item.move == moveId);
      setItems(result);
    };
    fetchData();
  }, []);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newValue = inputRef.current.value;
    setInputValue(newValue);
    inputRef.current.value = "";
    inputRef.current.readOnly = true; // Установка readOnly после отправки формы
  };
  const handleLabelClick = (e) => {
    e.preventDefault();
    inputRef.current.readOnly = false;
    inputRef.current.focus();
  };
  const handleImport = () => {
    dispatch(setIsMove(true));
    dispatch(toggleIsModalOpen());
  };
  const saveFunc = (obj) => {
    const res = items.map((item) => {
      if (item.id === obj.id) {
        return obj;
      } else {
        return item;
      }
    });
    setItems(res);
    console.log(res);
  };
  const handleDragDrop = (results) => {
    console.log("drag drop event accured", results);
  }
  return (
    <div className="robotmoves">
      <div
        className={classNames("robotmoves__header", {
          "robotmoves__header--day": isDay,
          "robotmoves__header--night": !isDay,
        })}
      >
        <div className="robotmoves__data">
          <Link
            className={classNames("robotmoves__back", {
              "robotmoves__back--day": isDay,
              "robotmoves__back--night": !isDay,
            })}
            to={"/moves"}
          >
            <img src={isDay ? back : backNight} alt="Back" />
            <p>Движения</p>
          </Link>
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="robotmoves__form"
          >
            <input
              className="robotmoves__input"
              ref={inputRef} // Привязка рефа к инпуту
              type="text"
              placeholder={inputValue}
              name="inputName"
              id="inputName"
              readOnly
            />
            <label
              onClick={(e) => handleLabelClick(e)}
              htmlFor="inputName"
              className="robotmoves__edit"
            >
              <img src={isDay ? pen : penNight} alt="" />
            </label>
          </form>
        </div>
        <div className="robotmoves__btns">
          <button className="robotmoves__btn">
            <img src={isDay ? run : runNight} alt="Run" />
          </button>
          <button className="robotmoves__btn">
            <img src={isDay ? save : saveNight} alt="Save" />
          </button>
        </div>
      </div>
      <div className="robotmoves__list">
        <DragDropContext
          onDragEnd={handleDragDrop}>
          <Droppable droppableId="ROOT2">
            {(provided) => (
              <ul className="robotmoves__reorder" {...provided.droppableProps} ref={provided.innerRef}>
                {items &&
                  items.map((item, index) => {
                    return (
                      <MovesItem
                        card={item}
                        moveId={item.move}
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        l1={item.l1}
                        l2={item.l2}
                        l3={item.l3}
                        l4={item.l4}
                        r1={item.r1}
                        r2={item.r2}
                        r3={item.r3}
                        r4={item.r4}
                        neck={item.neck}
                        head={item.head}
                        delay={item.delay}
                        phrase={item.phrase}
                        mimic={item.mimic}
                        saveFunc={saveFunc}
                        order={item.order}
                        index={index}
                      ></MovesItem>
                    );
                   })
                }
                 {/* <MovesItem></MovesItem>
                   <DelayTimer></DelayTimer> */}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div className="robotmoves__control">
          <div className="robotmoves__add-row">
            <button
              className={classNames("robotmoves-add__btn", {
                "robotmoves-add__btn--day": isDay,
                "robotmoves-add__btn--night": !isDay,
              })}
            >
              <img src={isDay ? plus : plusNight} alt="Plus" /> Поза
            </button>
            <button
              className={classNames("robotmoves-add__btn", {
                "robotmoves-add__btn--day": isDay,
                "robotmoves-add__btn--night": !isDay,
              })}
            >
              <img src={isDay ? plus : plusNight} alt="Plus" /> Задержка
            </button>
            <button
              className={classNames("robotmoves-add__btn", {
                "robotmoves-add__btn--day": isDay,
                "robotmoves-add__btn--night": !isDay,
              })}
              onClick={handleImport}
            >
              <img src={isDay ? importDay : importNight} alt="Import" />{" "}
              Импортировать
            </button>
          </div>
          <div className="robotmoves__add-row">
            <button
              className={classNames("robotmoves-add__btn", {
                "robotmoves-add__btn--day": isDay,
                "robotmoves-add__btn--night": !isDay,
              })}
            >
              <img src={isDay ? save : saveNight} alt="save" /> Сохранить
            </button>
          </div>
        </div>
      </div>
      <Modal></Modal>
    </div>
  );
};

export default RobotMoves;
