import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useHttp } from "../hooks/http.hook";
import back from "../img/icons/menu-day/back-day.svg";
import backNight from "../img/icons/menu-night/back-night.svg";
import { setRecognitions, setTriggers } from "../store/actions";
import { API_PATH } from "../api/index";

import "./Recognition.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import ListRecognitions from "../components/ListRecognitions/ListRecognitions";

const Recognition = () => {
  const isDay = useSelector((state) => state.isDay);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, loading, error, clearError } = useHttp();
  const goBack = () => {
    navigate(-1);
  };
  const isTablet = useMediaQuery({
    query: "(max-width: 850px)",
  });
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
    <div className="recognation">
      <div
        className={classnames("recognation__header", {
          recognation__header_day: isDay,
          recognation__header_night: !isDay,
        })}
      >
        <button
          onClick={goBack}
          className={classnames("recognation__back-btn", {
            "recognation__back-btn_day": isDay,
            "recognation__back-btn_night": !isDay,
          })}
        >
          <img
            className="recognation__back-btn-img"
            alt="Back"
            src={isDay ? back : backNight}
          />
          Распознавание
        </button>
        <button
          //to="/recognations/new-recognation"
          className={classnames("recognation__new-move-btn", {
            "recognation__new-move-btn_day": isDay,
            "recognation__new-move-btn_night": !isDay,
          })}
        >
          Распознать
        </button>
      </div>
      <div className="recognation__content">
        <SearchBar onSearch={handleSearch} />
        <ul className="recognation__list">
          {filteredItems.map(({ name, id, trigger_type }) => (
            <ListRecognitions key={id} text={name} id={id} type={trigger_type} deleteRecognition={deleteRecognition} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recognition;
