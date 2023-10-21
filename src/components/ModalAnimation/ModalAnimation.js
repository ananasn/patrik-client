import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import ListItem from "../ListItem/ListItem";

import closeDay from "../../img/movesItem/delete-day.svg";
import closeNight from "../../img/movesItem/delete-night.svg";

import classNames from "classnames";

import "./ModalAnimation.scss";

const ModalAnimation = ({onAnimationChange, isOpen, onClose, easingStart}) => {
  const isDay = useSelector((state) => state.isDay);
  // const isModalAnimationOpen = useSelector((state) => state.isModalAnimationOpen);
  const { request, loading } = useHttp();
  const [filteredItems, setFilteredItems] = useState([
    {value: "spring", title: "Spring"},
    {value: "elastic", title: "Elastic"},
    {value: "steps", title: "Steps"},
  ]);
  // выбранные анимации
  const [selectedAnimations, setSelectedAnimations] = useState([]);
  useEffect(() => {
    onAnimationChange(selectedAnimations);
  }, [selectedAnimations]);
  // устанавливаем начальное значение анимации
  useEffect(() => {
    const selectedAnimation = filteredItems.find((animation) => animation.value === easingStart);
    //console.log(easingStart, selectedAnimation);
    if (selectedAnimation) {
      setSelectedAnimations([selectedAnimation]);
    }
  }, []);

  const handleModalClose = () => {
    onClose();
  };
  return (
    <div
      className={classNames("modal", {
        "modal-animation--open": isOpen,
      })}
    >
      <div
        className={classNames("modal__inner", {
          "modal-animation__inner--day": isDay,
          "modal-animation__inner--night": !isDay,
        })}
      >
        <div className="modal-animation__header">
          <div className="modal-animation__header-top">
            <h2 className="modal-animation__title">
              Выбор способа анимации
            </h2>
            <button onClick={handleModalClose} className="modal-animation__close">
              <img src={isDay ? closeDay : closeNight} alt="Close" />
            </button>
          </div>
          {/* <div className="modal-animation__header-bottom">
            <SearchBar onSearch={handleSearch} />
          </div> */}
        </div>
        <div className="modal-animation__body">
          <ul className="modal-animation__list">
            {loading ? (
              <h2>Идёт загрузка данных</h2>
            ) : (
              filteredItems.map((item, id) => {
                return (
                  <ListItem
                    text={item.title}
                    id={item.id}
                    key={id}
                    isModal={true}
                    onClick={() => {
                      // если анимация уже выбрана
                      if (selectedAnimations.includes(item)) {
                        let i = selectedAnimations.indexOf(item);
                        selectedAnimations.splice(i, 1);
                        setSelectedAnimations([...selectedAnimations]);
                      } else {
                        // добавляем не больше одной анимации
                        setSelectedAnimations([item]);

                      }
                      // закрыть модальное окно
                      onClose();
                    }}
                  ></ListItem>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalAnimation;
