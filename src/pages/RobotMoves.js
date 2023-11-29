import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { toggleIsModalOpen, setIsMove, setImportMove, setMimics } from "../store/actions";
import MovesItem from "../components/MovesItem/MovesItem";
import {codeGenerator} from "../utils/utils";
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
import ModalPoseMimic from "../components/ModalPoseMimic/ModalPoseMimic";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const RobotMoves = () => {
  const isDay = useSelector((state) => state.isDay);
  const { moveId } = useParams();
  const { request, loading, error, clearError } = useHttp();
  const [inputValue, setInputValue] = useState("");
  const [helperText, setHelperText] = useState("");
  const [items, setItems] = useState([]);
  const [allMove, setAllMove] = useState([]);
  const [isModalPoseMimicOpen, setIsModalPoseMimicOpen] = useState(false);
  //поза для которой открыто модальное окно
  const [poseInModal, setPoseInModal] = useState(null);
  const [mimics, setMimics] = useState([]);

    // получаем имя движения и id
    useEffect(() => {
      const fetchData = async () => {
        const response = await request(`http://localhost:8000/api/move/${moveId}`);
        const data = await response;
        setInputValue(data.name);
      };
      // при редактировании движения так делать
      if (moveId) {
        fetchData();
      } else {
        setInputValue("Новое движение");
      }
    }, []);

    //получаем все движения
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/pose/");
      const data = await response;
      //const result = await data.filter((item) => item.move == moveId);
      //setItems(result);
      setAllMove(data);
      //console.log(result);
    };
    fetchData();
  }, []);

  //получаем все позы выбранного движения
  useEffect(() => {
    const fetchData = async () => {
      const response = await request(`http://localhost:8000/api/list_poses/${moveId}/`);
      const data = await response;
      //const result = await data.filter((item) => item.move == moveId);
      setItems(data);
      //setAllMove(data);
      //console.log(data);
    };
    if (moveId) {
      fetchData();
    }
  }, []);
  //получение списка мимик
  useEffect(() => {
      const fetchData = async () => {
        const response = await request("http://localhost:8000/api/mimic/");
        const data = await response;
        setMimics(data);
        // dispatch(setMimics(data));
        // setFilteredItems(data);
      };
      fetchData();
  }, []);

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const importMove = useSelector((state) => state.importMove);
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
  const deletePose = async (poseId) => {
    await fetch(`http://localhost:8000/api/pose/${poseId}/`, {method:"DELETE"});

    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/pose/");
      const data = await response;
      const result = await data.filter((item) => item.move == moveId );
      setItems(result);
    };
    fetchData();
  }

  const handlePlay = async () => {
    await fetch(`http://localhost:8000/api/run_mimic/${moveId}/`, {method:"POST"});
    console.log(moveId, "run");
  }
  const saveFunc = (obj) => {
    console.log(obj);
    const res = items.map((item) => {
      if (item.id === obj.id) {
        // сюда приходит карточка которую мы поменяли
        return obj;
      } else {
        // сюда приходят карточки из бэка которые мы не меняли
        const id = item.mimic;
        if (typeof id == "number") {

        } else {
          item.mimic = item.mimic?.id;
        }

        console.log("item.mimic", item.mimic);
        return item;
      }
    });
    setItems(res);
  };
  const addPoseHandler = () => { // для кнопки "создать pose"
    const i = codeGenerator() + 1;
    setItems([...items, {
      "name": `Поза ${i}`,
      "l1": 0,
      "l2": 0,
      "l3": 0,
      "l4": 0,
      "l5": 0,
      "neck": 0,
      "head": 0,
      "r1": 0,
      "r2": 0,
      "r3": 0,
      "r4": 0,
      "r5": 0,
      "phrase": "Добавить фразу",
      "delay": 0,
      "order": i,
      "id": i,
      "mimic": null
    }])
    //console.log(items)
  }
  const handleDragDrop = (results) => {
    //console.log("drag drop event accured", results);
    const {destination, source} = results;
    //console.log(destination, source, draggableId);
    if(!destination) return;
    if(
      source.droppableId === destination.droppableId &&
      source.index === destination.index
      )
      return;
    const reorderedItems = [...items];
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    //console.log(sourceIndex, destinationIndex)

    const [removedItems] = reorderedItems.splice(sourceIndex, 1);
    reorderedItems.splice(destinationIndex, 0, removedItems);

    return setItems(reorderedItems);
  }
  //запрос на сохранение/перезапись имени и всех карточек движения(поз)
  const handleSaveMove = async () => {
    /*console.log(importMove, 'добавляем движ при сохранении', importMove.id);
    if (importMove) {
      const importItems = allMove.filter((item) => item.move == importMove.id);
      console.log(allMove, allMove.move, importItems, importItems.poses);
      console.log([...items, ...importItems]); //соединяем два массива
      setItems([...items, ...importItems]);
      //setItems(items.slice())
    }*/
     setItems(items.slice()) // чтобы стейт обновился нужен новый массив
    console.log(items);
    const res = await request("http://localhost:8000/api/save_poses/", "post",
    JSON.stringify({
      id: moveId,
      name: inputValue,
      poses: items
    }));
    console.log("Сохранение движения");
    dispatch(setImportMove(null));
    navigate(-1);
  }
  const onMoveNameInput = async () => {
    //console.log(inputRef.current.value)
    //const newValue = inputRef.current.value;
    //setInputValue(newValue);
    const resInput = await request("http://localhost:8000/api/is_move_unique/", "post",
    JSON.stringify({
      name: inputRef.current.value,
    }));
    //console.log(resInput)
    //console.log(resInput.unique)
    (resInput.unique == false) ? setHelperText("Такое движение уже существует") : setHelperText("");
    setInputValue(inputRef.current.value);
    //inputRef.current.value = "";
    //inputRef.current.readOnly = true; // Установка readOnly после отправки формы
  }
  useEffect(() => {
    //console.log(importMove, 'добавляем движ при сохранении', importMove.id);
    if (importMove) {
      const importItems = allMove.filter((item) => item.move == importMove.id);
      console.log(allMove, allMove.move, importItems, importItems.poses);
      console.log([...items, ...importItems]); //соединяем два массива
      setItems([...items, ...importItems]);
      //setItems(items.slice())
    }
  }, [importMove]);
  //pose -поза с сервера объект;
  // срабатывает при клике на добавить мимику
  const onModalPoseMimicOpen = (pose) => {
    setPoseInModal(pose);
    setIsModalPoseMimicOpen(true);
  }
  //срабатывает при выборе мимики в модальном окне
  const onMimicSelect = (mimic) => {
    console.log("mimic, poseInModal", mimic, poseInModal);
    saveFunc({...poseInModal, mimic: mimic.id});
    setIsModalPoseMimicOpen(false);
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
            <div className="robotmoves__form-container">
              <input
                className={classNames("robotmoves__input", {
                  "robotmoves__input--day": isDay,
                  "robotmoves__input--night": !isDay,
                })}
                ref={inputRef} // Привязка рефа к инпуту
                type="text"
                placeholder={inputValue}
                name="inputName"
                id="inputName"
                onInput={onMoveNameInput}
                style={{width:`${inputValue.length*19 || 10}px`}}
                //readOnly
              />
              <label
                onClick={(e) => handleLabelClick(e)}
                htmlFor="inputName"
                className="robotmoves__edit"
              >
                <img src={isDay ? pen : penNight} alt="" />
              </label>
            </div>
            <div className="robotmoves__name-helper-text">{helperText}</div>
          </form>
        </div>
        <div className="robotmoves__btns">
          <button className="robotmoves__btn" onClick={handlePlay}>
            <img src={isDay ? run : runNight} alt="Run" />
          </button>
          <button className="robotmoves__btn" onClick={handleSaveMove}>
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
                        key={item.id}//id
                        id={item.id}//id
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
                        mimicName={mimics.find(mimicServer => mimicServer.id == item.mimic)?.name}
                        saveFunc={saveFunc}
                        deletePose={deletePose}
                        order={item.id}
                        index={index}
                        onModalPoseMimicOpen={onModalPoseMimicOpen}
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
              onClick={addPoseHandler}
            >
              <img src={isDay ? plus : plusNight} alt="Plus" /> Поза
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
              onClick={handleSaveMove}
            >
              <img src={isDay ? save : saveNight} alt="save" /> Сохранить
            </button>
          </div>
        </div>
      </div>
      <Modal></Modal>
      <ModalPoseMimic isOpen={isModalPoseMimicOpen} onClose={() => {setIsModalPoseMimicOpen(false); setPoseInModal(null)}} onMimicSelect={onMimicSelect}></ModalPoseMimic>
    </div>
  );
};

export default RobotMoves;
