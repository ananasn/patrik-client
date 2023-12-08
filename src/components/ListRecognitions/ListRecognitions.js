import classnames from "classnames";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setImportRecognition, toggleIsModalOpen, toggleIsRecognitionModalOpen } from "../../store/actions";
import Portal from '../Portal';
import ModalRecognition from '../ModalRecognition/ModalRecognition';

import {ReactComponent as RecognitionIco} from "../../img/icons/menu-day/recognition.svg";
import {ReactComponent as RecognitionSignIco} from "../../img/script/sign.svg";

import "./ListRecognitions.scss";

const ListRecognitions = ({
  text,
  id,
  type,
  //isScene = false,
  isModal = false,
  deleteRecognition,
  getTitle,
}) => {
  const dispatch = useDispatch();
  const isDay = useSelector((state) => state.isDay);
  const isModalRecognitionOpen = useSelector((state) => state.isModalRecognitionOpen);
  const [title, setTitle] = useState({});

  const handleDelete = () => {
    deleteRecognition(id);
    //console.log(id)
  }
  const handleRecognitionClick = () => {
    console.log("Нажали на сущ триггер", id, type, text);
    getTitle(type, text);
    dispatch(toggleIsRecognitionModalOpen());
  }
  const onModalClose = () => {
    dispatch(toggleIsRecognitionModalOpen());
  }
  const handleImportRecognitionData = () => {
    dispatch(setImportRecognition({id: id, text: text, type: type}))
    console.log(id, text, "add import ");
    dispatch(toggleIsModalOpen());
    console.log(id, text, "add import  data");
  }
  return (
    <>
      <li
        className={classnames("recognition__item", {
          recognition__item_day: isDay,
          recognition__item_night: !isDay,
        })}
      >
        <div className="recognition__name_container">
          <span className="recognition__ico">
            {type == 1 ? <RecognitionIco /> : <RecognitionSignIco />}
          </span>
          <p className="recognition__text">{text}</p>
        </div>
        <div className="recognition__btns">
          {/*isScene && (
            <button
              className={classnames("recognition__btn", {
                recognition__btn_off_day: isDay,
                recognition__btn_off_night: !isDay,
              })}
            ></button>
            )*/}
          {isModal ? (
            <button
              className={classnames("recognition__btn", {
                recognition__btn_import_day: isDay,
                recognition__btn_import_night: !isDay,
              })}
              onClick={handleImportRecognitionData}
            ></button>
          ) : (
            <>
              <button
                className={classnames("recognition__btn", {
                  recognition__btn_delete_day: isDay,
                  recognition__btn_delete_night: !isDay,
                })}
                onClick={handleDelete}
              ></button>
              <button
                className={classnames("recognition__btn", {
                  recognition__btn_settings_day: isDay,
                  recognition__btn_settings_night: !isDay,
                })}
                onClick={() => handleRecognitionClick()}
              ></button>
            </>
          )}
        </div>
      </li>
      {/*<Portal>
        <ModalRecognition
          type={title?.type}
          text={title?.text}
          isOpen={isModalRecognitionOpen}
          onClose={onModalClose}
        />
              </Portal>*/}
    </>
  );
};

export default ListRecognitions;
