import { useSelector, useDispatch } from "react-redux";
//import { useState } from "react";
import classNames from "classnames";
import { useHttp } from "../../hooks/http.hook";
import { toggleIsRecognitionStartModalOpen } from '../../store/actions';

import Portal from '../Portal';
import ModalRecognitionStart from '../ModalRecognitionStart/ModalRecognitionStart';

import {ReactComponent as CloseItemIco} from '../../img/close.svg';
import {ReactComponent as RecognitionIco} from "../../img/icons/menu-day/recognition.svg";
import {ReactComponent as RecognitionSignIco} from "../../img/script/sign.svg";

import "./ModalScriptAddRecognition.scss";

const ModalScriptAddRecognition = ({ isOpen, onClose, item}) => {
  const isDay = useSelector((state) => state.isDay);
  const { request, loading } = useHttp();
  const dispatch = useDispatch();
  const isModalRecognitionStartOpen = useSelector((state) => state.isModalRecognitionStartOpen);

  const handleModalClose = () => {
    onClose();
  };

  const onModalClose = () => {
    dispatch(toggleIsRecognitionStartModalOpen());
  }
  const handleSighRecognition = () => {
    console.log("распознать жест");
    //setIsModalRecognitionStartOpen(true);
    dispatch(toggleIsRecognitionStartModalOpen());
    onClose();
  }
  const handleFaceRecognition = () => {
    console.log("распознать лицо");
    //setIsModalRecognitionStartOpen(true);
    dispatch(toggleIsRecognitionStartModalOpen());
    onClose();
  }

  return (
    <div
      className={classNames("modal", {
        "modal-script-add-recognition--open": isOpen,
      })}
    >
      <div
        className={classNames("modal-script-add-recognition__inner", {
          "modal-script-add-recognition__inner--day": isDay,
          "modal-script-add-recognition__inner--night": !isDay,
        })}
      >
        <div className="modal-script-add-recognition__header">
          <div className="modal-script-add-recognition__header-top">
            <h2 className="modal-script-add-recognition__title">
              Что распознаём?
            </h2>
            <button onClick={handleModalClose} className="modal-script-add-recognition__close">
              <CloseItemIco />
            </button>
          </div>
        </div>
        <div className="modal-script-add-recognition__body">
          <ul className="modal-script-add-recognition__list">
            {loading ? (
              <h2>Идёт загрузка данных</h2>
            ) : (
              <>
                <li
                  className={classNames("modal-script-add-recognition__item", {
                    "modal-script-add-recognition__item--day": isDay,
                    "modal-script-add-recognition__item--night": !isDay,
                  })}
                  onClick={handleSighRecognition}
                >
                  <RecognitionSignIco />
                  <div
                  >
                    Распознать жест
                  </div>
                </li>
                <li
                  className={classNames("modal-script-add-recognition__item", {
                    "modal-script-add-recognition__item--day": isDay,
                    "modal-script-add-recognition__item--night": !isDay,
                  })}
                  onClick={handleFaceRecognition}
                >
                  <RecognitionIco />
                  <div
                  >
                    Распознать лицо
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Portal>
        <ModalRecognitionStart
          isOpen={isModalRecognitionStartOpen}
          onClose={onModalClose}
         />
      </Portal>
    </div>
  );
};

export default ModalScriptAddRecognition;
