import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { useHttp } from "../../hooks/http.hook";
import { toggleIsRecognitionStartModalOpen } from "../../store/actions";

import {ReactComponent as CloseItemIco} from '../../img/close.svg';
//import { ReactComponent as BackIco } from "../../img/icons/menu-day/back.svg";

import face from '../../img/recognition-face.png';
import sign from '../../img/recognition-sign.png';

import "./ModalRecognition.scss";

const ModalRecognition = ({ isOpen, onClose, type, text}) => {
  const isDay = useSelector((state) => state.isDay);
  const { request, loading } = useHttp();
  const dispatch = useDispatch();

  const handleModalClose = () => {
    onClose();
  };

  /*const goBack = () => {
    onClose();
    dispatch(toggleIsAddRecognitionModalOpen());
  };*/

  const handleClick = () => {
    onClose();
    dispatch(toggleIsRecognitionStartModalOpen());
  }

  console.log(type, text)

  return (
    <div
      className={classNames("modal", {
        "modal-recognition--open": isOpen,
      })}
    >
      <div
        className={classNames("modal-recognition__inner", {
          "modal-recognition__inner--day": isDay,
          "modal-recognition__inner--night": !isDay,
        })}
      >
        <div className="modal-recognition__header">
          <div className="modal-recognition__header-top">
            <div className="modal-recognition__top-container">
              {/*<button
                className={classNames("modal-recognition-start__back", {
                  "modal-recognition-start__back--day": isDay,
                  "modal-recognition-start__back--night": !isDay,
                })}
                onClick={goBack}
              >
                <BackIco />
              </button>*/}
              <h2 className="modal-recognition__title">
                {(!!type & type == 1) ? `Жест “${text}”` : `Лицо “${text}”`}
              </h2>
            </div>
            <button onClick={handleModalClose} className="modal-recognition__close">
              <CloseItemIco />
            </button>
          </div>
        </div>
        <div className="modal-recognition__body">
            {loading ? (
              <h2>Идёт загрузка данных</h2>
            ) : (
              <div className="modal-recognition__container">
                <img src={type == 1 ? sign : face} alt="Recognition" />
              </div>
            )}
          <button
            className={classNames("modal-recognition-btn", {
              "modal-recognition-btn_day": isDay,
              "modal-recognition-btn_night": !isDay,
            })}
            onClick={handleClick}
          >
            Редактировать
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRecognition;
