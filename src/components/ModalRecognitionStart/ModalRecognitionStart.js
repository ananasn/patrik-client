import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { useHttp } from "../../hooks/http.hook";
import { toggleIsAddRecognitionModalOpen } from "../../store/actions";

import Portal from '../Portal';
import ModalRecognitionName from '../ModalRecognitionName/ModalRecognitionName';

import {ReactComponent as CloseItemIco} from '../../img/close.svg';
import { ReactComponent as BackIco } from "../../img/icons/menu-day/back.svg";

import "./ModalRecognitionStart.scss";

const ModalRecognitionStart = ({ isOpen, onClose}) => {
  const isDay = useSelector((state) => state.isDay);
  const { request, loading } = useHttp();
  const dispatch = useDispatch();
  const [isModalRecognitionNameOpen, setIsModalRecognitionNameOpen] = useState(false);

  const handleModalClose = () => {
    onClose();
  };

  const goBack = () => {
    onClose();
    dispatch(toggleIsAddRecognitionModalOpen());
  };

  const handleClick = () => {
    onClose();
    setIsModalRecognitionNameOpen(true);
  }

  const onModalClose = () => {
    setIsModalRecognitionNameOpen(false);
  }

  return (
    <div
      className={classNames("modal", {
        "modal-recognition-start--open": isOpen,
      })}
    >
      <div
        className={classNames("modal-recognition-start__inner", {
          "modal-recognition-start__inner--day": isDay,
          "modal-recognition-start__inner--night": !isDay,
        })}
      >
        <div className="modal-recognition-start__header">
          <div className="modal-recognition-start__header-top">
            <div className="modal-recognition-start__top-container">
              <button
                className={classNames("modal-recognition-start__back", {
                  "modal-recognition-start__back--day": isDay,
                  "modal-recognition-start__back--night": !isDay,
                })}
                onClick={goBack}
              >
                <BackIco />
              </button>
              <h2 className="modal-recognition-start__title">
                Дайте роботу присмотреться
              </h2>
            </div>
            <button onClick={handleModalClose} className="modal-recognition-start__close">
              <CloseItemIco />
            </button>
          </div>
        </div>
        <div className="modal-recognition-start__body">
          <p className="modal-recognition-start__description">После нажмите или скажите готово</p>
            {loading ? (
              <h2>Идёт загрузка данных</h2>
            ) : (
              <div className="modal-recognition-start__container">
                Video
              </div>
            )}
          <button
            className={classNames("modal-recognition-start-btn", {
              "modal-recognition-start-btn_day": isDay,
              "modal-recognition-start-btn_night": !isDay,
            })}
            onClick={handleClick}
          >
            Готово
          </button>
        </div>
      </div>
      <Portal>
        <ModalRecognitionName
          isOpen={isModalRecognitionNameOpen}
          onClose={onModalClose}
         />
      </Portal>
    </div>
  );
};

export default ModalRecognitionStart;
