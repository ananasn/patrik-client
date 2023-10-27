import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import NavList from "../components/NavList/NavList";
//import { toggleIsModalOpen, setIsMove } from "../store/actions";
import MimicItem from "../components/MimicItem/MimicItem";

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

import "./RobotEmotion.scss";

// страница создания и редактирования мимик; где карточки
const RobotEmotion = () => {
  const isDay = useSelector((state) => state.isDay);
  //const dispatch = useDispatch();
  const { mimicId } = useParams();
  const [inputValue, setInputValue] = useState("");

  // получаем имя мимики и id
  useEffect(() => {
    const fetchData = async () => {
      const response = await request(`http://localhost:8000/api/mimic/${mimicId}`);
      const data = await response;
      setInputValue(data.name);
    };
    // при редактировании мимики так делать
    if (mimicId) {
      fetchData();
    } else {
      setInputValue("Новая мимика");
    }
  }, []);

  const { request, loading, error, clearError } = useHttp();
  const [items, setItems] = useState([]);
  const isTablet = useMediaQuery({
    query: "(max-width: 850px)",
  });
  //получаем массив всех мимик,
  //фильтреум - находим карточки у которых id мимики совпадает с параметром,
  //создаем новый массив отфильтрованных карточек
  // todo создать запрос на получение мимики с масивом всех карточек по id чтобы избавиться от фильтрации на фронте
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/mimic_item/");
      const data = await response;
      //console.log(data)
      const result = await data.filter((item) => item.mimic == mimicId );
      setItems(result);
      //console.log(result)
    };
    fetchData();
  }, []);
  const inputRef = useRef(null);
  const handleFormSubmit = async (e) => {
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
  /*const handleImport = () => {
    dispatch(setIsMove(true));
    dispatch(toggleIsModalOpen());
  };*/
  // срабатывает каждый раз при изменении ползунков (из MimicItem)
  const saveFunc = (obj) => {
    const res = items.map((item) => {
      if (item.id === obj.id) {
        return obj;
      } else {
        return item;
      }
    });
    setItems(res);
    // console.log(2, obj); //данные для put запроса (mimic)
  };
  const addMimicItemHandler = () => { // для кнопки "создать мимику"
    setItems([...items, {
      "style_left_eye": 0,
      "x_left_eye": 0,
      "y_left_eye": 0,
      "w_left_eye": 0,
      "h_left_eye": 0,
      "style_right_eye": 0,
      "x_right_eye": 0,
      "y_right_eye": 0,
      "w_right_eye": 0,
      "h_right_eye": 0,
      "style_mouth": 0,
      "x_mouth": 0,
      "y_mouth": 0,
      "w_mouth": 0,
      "h_mouth": 0,
      "delay": 0,
      "easing": "spring"
    }])
  }

  const deleteMimicItem = async (mimicItemId) => {
    await fetch(`http://localhost:8000/api/mimic_item/${mimicItemId}/`, {method:"DELETE"});

    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/mimic_item/");
      const data = await response;
      const result = await data.filter((item) => item.mimic == mimicId );
      setItems(result);
    };
    fetchData();
  }

  const handlePlay = async () => {
    await fetch(`http://localhost:8000/api/run_mimic/${mimicId}/`, {method:"POST"});
    console.log(mimicId, "run");
  }

//запрос на сохранение/перезапись имени и всех карточек мимики
  const handleSaveMimic = async () => {
    console.log(items)
    const res = await request("http://localhost:8000/api/save_mimic_items/", "post",
      JSON.stringify({
        name: inputValue,
        mimic_items: items
      }));
    console.log(res);
  }

  const handleDragDrop = (results) => {
    //console.log("drag drop event occured", results);
    const {destination, source/*, draggableId*/} = results;
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

    const [removedItems] = reorderedItems.splice(sourceIndex, 1);
    reorderedItems.splice(destinationIndex, 0, removedItems)

    return setItems(reorderedItems);
  }
  return (
    <div className="robotemotion">
      <div
        className={classNames("robotemotion__header", {
          "robotemotion__header--day": isDay,
          "robotemotion__header--night": !isDay,
        })}
      >
        <div className="robotemotion__data">
          <Link
            className={classNames("robotemotion__back", {
              "robotemotion__back--day": isDay,
              "robotemotion__back--night": !isDay,
            })}
            to={"/emotions"}
          >
            <img src={isDay ? back : backNight} alt="Back" />
            <p>Мимика</p>
          </Link>
          <form
            onSubmit={(e) => handleFormSubmit(e)} // сабмит происходит при нажатии на enter
            className="robotemotion__form"
          >
            <input
              className="robotemotion__input"
              ref={inputRef} // Привязка рефа к инпуту
              type="text"
              placeholder={inputValue}
              name="inputName"
              id="inputName"
              //readOnly
            />
            <label
              onClick={(e) => handleLabelClick(e)}
              htmlFor="inputName"
              className="robotemotion__edit"
            >
              <img src={isDay ? pen : penNight} alt="" />
            </label>
          </form>
        </div>
        <div className="robotemotion__btns">
          <button className="robotemotion__btn" onClick={handlePlay}>
            <img src={isDay ? run : runNight} alt="Run" />
          </button>
          <button className="robotemotion__btn" onClick={handleSaveMimic}> {/* пост запрос на сохранение всей мимики */}
            <img src={isDay ? save : saveNight} alt="Save" />
          </button>
        </div>
      </div>
      <div className="robotemotion__list">
      <DragDropContext
          onDragEnd={handleDragDrop}>
          <Droppable droppableId="ROOT1">
            {(provided) => (
              <ul className="robotemotion__reorder" {...provided.droppableProps} ref={provided.innerRef}>
                  {items &&
                    items.map((item, index) => {
                      return (
                        <MimicItem
                          card={item}
                          mimicId={item.mimic}
                          key={item.id}
                          index={index}
                          mimicItemId={item.id} // id карточки mimic_item
                          delayStart={item.delay}
                          easing={item.easing}
                          mimic={item.mimic}
                          order={item.order}
                          saveFunc={saveFunc}
                          deleteMimicItem={deleteMimicItem}
                          xLeftEyeStart={item.x_left_eye}
                          yLeftEyeStart={item.y_left_eye}
                          wLeftEyeStart={item.w_left_eye}
                          hLeftEyeStart={item.h_left_eye}

                          xRightEyeStart={item.x_right_eye}
                          yRightEyeStart={item.y_right_eye}
                          wRightEyeStart={item.w_right_eye}
                          hRightEyeStart={item.h_right_eye}

                          xMouthStart={item.x_mouth}
                          yMouthStart={item.y_mouth}
                          wMouthStart={item.w_mouth}
                          hMouthStart={item.h_mouth}

                          leftEyeStart={item.style_left_eye}
                          mouthStart={item.style_mouth}
                          rightEyeStart={item.style_right_eye}
                        ></MimicItem>
                      );
                  })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div className="robotemotion__control">
          <div className="robotemotion__add-row">
            <button
              className={classNames("robotemotion-add__btn", {
                "robotemotion-add__btn--day": isDay,
                "robotemotion-add__btn--night": !isDay,
              })}
              onClick={addMimicItemHandler}
            >
              <img src={isDay ? plus : plusNight} alt="Plus" /> Добавить мимику
            </button>
            <button
              className={classNames("robotemotion-add__btn", {
                "robotemotion-add__btn--day": isDay,
                "robotemotion-add__btn--night": !isDay,
              })}
              onClick={handleSaveMimic}
            >
              <img src={isDay ? save : saveNight} alt="save" /> Сохранить {/* пост запрос на сохранение всей мимики */}
            </button>
          </div>
        </div>
      </div>

      {isTablet ? (
        <>
          {isDay ? (
            <div className="App__bottom">
              <NavList></NavList>
            </div>
          ) : (
            <div className="App__bottom--night">
              <NavList></NavList>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default RobotEmotion;
