import { useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { useHttp } from "../../hooks/http.hook";
import { toggleIsRecognitionStartModalOpen } from "../../store/actions";
import { API_PATH } from "../../api/index";

import {ReactComponent as CloseItemIco} from '../../img/close.svg';
//import { ReactComponent as BackIco } from "../../img/icons/menu-day/back.svg";

import "./ModalRecognitionName.scss";

const ModalRecognitionName = ({ isOpen, onClose, type}) => {
  const isDay = useSelector((state) => state.isDay);
  const { request, loading } = useHttp();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(type == 1 ? 'Введите название жеста' : 'Введите имя');
  const inputRef = useRef(null);
  const [helperText, setHelperText] = useState("");

  const handleModalClose = () => {
    onClose();
  };

  /*const goBack = () => {
    onClose();
    dispatch(toggleIsAddRecognitionModalOpen());
  };*/

  const handleClick = () => {
    onClose();
    setInputValue(type == 1 ? 'Введите название жеста' : 'Введите имя');
    console.log('сохранить имя жеста или мимики');

  }
  const onRecognitionNameInput = async () => {
    const resInput = await request(`${API_PATH}api/is_script_unique/`, "post",
    JSON.stringify({
      name: inputRef.current.value,
    }));
    //console.log(resInput)
    //console.log(resInput.unique)
    (resInput.unique == false) ? setHelperText("Такое имя уже существует") : setHelperText("");
    setInputValue(inputRef.current.value);
    console.log(inputValue);
  }

  console.log(type, 'name type');

  return (
    <div
      className={classNames("modal", {
        "modal-recognition-name--open": isOpen,
      })}
    >
      <div
        className={classNames("modal-recognition-name__inner", {
          "modal-recognition-name__inner--day": isDay,
          "modal-recognition-name__inner--night": !isDay,
        })}
      >
        <div className="modal-recognition-name__header">
          <div className="modal-recognition-name__header-top">
            <div className="modal-recognition-name__top-container">
              {/*<button
                className={classNames("modal-recognition-name-start__back", {
                  "modal-recognition-name-start__back--day": isDay,
                  "modal-recognition-name-start__back--night": !isDay,
                })}
                onClick={goBack}
              >
                <BackIco />
              </button>*/}
              <h2 className="modal-recognition-name__title">
                {(!!type & type == 1) ? "Как назовём этот жест?" : "Как зовут человека?"}
              </h2>
            </div>
            <button onClick={handleModalClose} className="modal-recognition-name__close">
              <CloseItemIco />
            </button>
          </div>
        </div>
        <div className="modal-recognition-name__body">
              <form
                onSubmit={(e) => e.preventDefault()} // сабмит происходит при нажатии на enter
                className="modal-recognition-name__form"
              >
                <div className="modal-recognition-name__form-container">
                  <input
                    //className="modal-recognition-name__input"
                    className={classNames("modal-recognition-name__input", {
                      "modal-recognition-name__input_day": isDay,
                      "modal-recognition-name__input_night": !isDay,
                    })}
                    ref={inputRef} // Привязка рефа к инпуту
                    type="text"
                    placeholder={inputValue}
                    name="inputName"
                    id="inputName"
                    onInput={onRecognitionNameInput}
                    //style={{width:`${inputValue.length*19 || 10}px`}}
                    //readOnly
                  />
                  <label
                    //onClick={(e) => handleLabelClick(e)}
                    htmlFor="inputName"
                    //className="robotemotion__edit"
                  >
                  </label>
                </div>
                <div className="modal-recognition-name__name-helper-text">{helperText}</div>
              </form>
          <button
            className={classNames("modal-recognition-name-btn", {
              "modal-recognition-name-btn_day": isDay,
              "modal-recognition-name-btn_night": !isDay,
            })}
            onClick={handleClick}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRecognitionName;
