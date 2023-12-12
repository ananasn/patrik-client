import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useHttp } from "../hooks/http.hook";
import back from "../img/icons/menu-day/back-day.svg";
import backNight from "../img/icons/menu-night/back-night.svg";
import { setRecognitions, setTriggers, toggleIsAddRecognitionModalOpen, toggleIsRecognitionModalOpen } from "../store/actions";
import { API_PATH } from "../api/index";

import ModalScriptAddRecognition from "../components/ModalScriptAddRecognition/ModalScriptAddRecognition";
import Portal from '../components/Portal';
import ModalRecognition from '../components/ModalRecognition/ModalRecognition';

import "./Recognition.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import ListRecognitions from "../components/ListRecognitions/ListRecognitions";

const Recognition = () => {
  const isDay = useSelector((state) => state.isDay);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, loading, error, clearError } = useHttp();
  const isModalAddRecognitionOpen = useSelector((state) => state.isModalAddRecognitionOpen);
  const isModalRecognitionOpen = useSelector((state) => state.isModalRecognitionOpen);
  const [titleModalRecognition, setTitleModalRecognition] = useState({});
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const goBack = () => {
    navigate(-1);
  };
  const isTablet = useMediaQuery({
    query: "(max-width: 850px)",
  });

  const handleClick = () => {
    dispatch(toggleIsAddRecognitionModalOpen());
    //setIsModalOpen(true);
  }

  const onModalClose = () => {
    dispatch(toggleIsAddRecognitionModalOpen());
    //setIsModalOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await request(`${API_PATH}api/trigger/`);
      const data = await response;
      dispatch(setTriggers(data));
      const res = data.filter((item) => item.trigger_type == 1 || item.trigger_type == 2);
      console.log(data)
      console.log(res)
      dispatch(setRecognitions(res));
    };
    fetchData();
  }, []);
  const recognitions = useSelector((state) => state.recognitions);

  const deleteRecognition = async (id) => {
    await fetch(`${API_PATH}api/trigger/${id}/`, {method:"DELETE"});

    /*const fetchData = async () => {
      const response = await request(`${API_PATH}api/trigger/`);
      const data = await response;
      // console.log(data);
      dispatch(setMimics(data));
    };
    fetchData();*/
  }

  const getTitleModalRecognition = (type, text) => {
    setTitleModalRecognition({type: type, text: text});
  }

  const [filteredItems, setFilteredItems] = useState(recognitions);
  useEffect(() => {
    setFilteredItems(recognitions);
  }, [recognitions]);
  const handleSearch = (searchTerm) => {
    const filtered = recognitions.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  if (loading) {
    return <h1 className="loading-text" style={{ textAlign: "center" }}>Идёт загрузка...</h1>;
  }
  return (
    <div className="recognition">
      <div
        className={classnames("recognition__header", {
          recognition__header_day: isDay,
          recognition__header_night: !isDay,
        })}
      >
        <button
          onClick={goBack}
          className={classnames("recognition__back-btn", {
            "recognition__back-btn_day": isDay,
            "recognition__back-btn_night": !isDay,
          })}
        >
          <img
            className="recognition__back-btn-img"
            alt="Back"
            src={isDay ? back : backNight}
          />
          Распознавание
        </button>
        <button
          className={classnames("recognition__new-move-btn", {
            "recognition__new-move-btn_day": isDay,
            "recognition__new-move-btn_night": !isDay,
          })}
          onClick={handleClick}
        >
          Распознать
        </button>
      </div>
      <div className="recognition__content">
        <SearchBar onSearch={handleSearch} />
        <ul className="recognition__list">
          {filteredItems.map(({ name, id, trigger_type }) => (
            <ListRecognitions key={id} text={name} id={id} type={trigger_type} deleteRecognition={deleteRecognition} getTitle={getTitleModalRecognition}/>
          ))}
        </ul>
      </div>
      <ModalScriptAddRecognition
        isOpen={isModalAddRecognitionOpen}
        onClose={onModalClose}
      />
      {/*<Portal>
        <ModalRecognition
          type={titleModalRecognition.type}
          text={titleModalRecognition.text}
          isOpen={isModalRecognitionOpen}
          onClose={dispatch(toggleIsRecognitionModalOpen())}
        />
          </Portal>*/}
    </div>
  );
};

export default Recognition;
