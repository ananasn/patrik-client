import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import ListItem from "../components/ListItem/ListItem";
import { useHttp } from "../hooks/http.hook";
import back from "../img/icons/menu-day/back-day.svg";
import backNight from "../img/icons/menu-night/back-night.svg";
import { setMoves } from "../store/actions";

import "./Moves.scss";
import SearchBar from "../components/SearchBar/SearchBar";

const Moves = () => {
  const isDay = useSelector((state) => state.isDay);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, loading, error, clearError } = useHttp();
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/move/");
      const data = await response;
      // console.log(data);
      dispatch(setMoves(data));
    };
    fetchData();
  }, []);
  const moves = useSelector((state) => state.moves);

  const deleteMove = async (moveId) => {
    await fetch(`http://localhost:8000/api/move/${moveId}/`, {method:"DELETE"});

    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/move/");
      const data = await response;
      dispatch(setMoves(data));
    };
    fetchData();
  }

  const [filteredItems, setFilteredItems] = useState(moves);
  useEffect(() => {
    setFilteredItems(moves);
  }, [moves]);
  const handleSearch = (searchTerm) => {
    const filtered = moves.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  if (loading) {
    return <h1 className="loading-text" style={{ textAlign: "center" }}>Идёт загрузка...</h1>;
  }
  return (
    <div className="moves">
      <div
        className={classnames("moves__header", {
          moves__header_day: isDay,
          moves__header_night: !isDay,
        })}
      >
        <button
          onClick={goBack}
          className={classnames("moves__back-btn", {
            "moves__back-btn_day": isDay,
            "moves__back-btn_night": !isDay,
          })}
        >
          <img
            className="moves__back-btn-img"
            alt="Back"
            src={isDay ? back : backNight}
          />
          Назад
        </button>
        <Link
          to="/moves/new-move"
          className={classnames("moves__new-move-btn", {
            "moves__new-move-btn_day": isDay,
            "moves__new-move-btn_night": !isDay,
          })}
        >
          Создать движение
        </Link>
      </div>
      <div className="moves__content">
        <SearchBar onSearch={handleSearch} />
        <ul className="moves__list">
          {filteredItems.map(({ name, id }) => (
            <ListItem key={id} text={name} id={id} deleteMove={deleteMove}></ListItem>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Moves;
