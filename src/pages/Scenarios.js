import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import NavList from "../components/NavList/NavList";
import { useHttp } from "../hooks/http.hook";
import back from "../img/icons/menu-day/back-day.svg";
import backNight from "../img/icons/menu-night/back-night.svg";
import { setScripts } from "../store/actions";

import "./Scenarios.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import ListScript from "../components/ListScript/ListScript";

const Scenarios = () => {
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
      const response = await request("http://localhost:8000/api/script/");
      const data = await response;
      // console.log(data);
      dispatch(setScripts(data));
    };
    fetchData();
  }, []);
  const scripts = useSelector((state) => state.scripts);

  const deleteScript = async (scriptId) => {
    await fetch(`http://localhost:8000/api/script/${scriptId}/`, {method:"DELETE"});

    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/script/");
      const data = await response;
      // console.log(data);
      dispatch(setScripts(data));
    };
    fetchData();
  }

  const [filteredItems, setFilteredItems] = useState(scripts);
  useEffect(() => {
    setFilteredItems(scripts);
  }, [scripts]);
  const handleSearch = (searchTerm) => {
    const filtered = scripts.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  if (loading) {
    return <h1 className="loading-text" style={{ textAlign: "center" }}>Идёт загрузка...</h1>;
  }
  return (
    <div className="scenarios">
      <div
        className={classnames("scenarios__header", {
          scenarios__header_day: isDay,
          scenarios__header_night: !isDay,
        })}
      >
        <button
          onClick={goBack}
          className={classnames("scenarios__back-btn", {
            "scenarios__back-btn_day": isDay,
            "scenarios__back-btn_night": !isDay,
          })}
        >
          <img
            className="scenarios__back-btn-img"
            alt="Back"
            src={isDay ? back : backNight}
          />
          Сценарии
        </button>
        <Link
          to="/new-script"
          className={classnames("scenarios__new-move-btn", {
            "scenarios__new-move-btn_day": isDay,
            "scenarios__new-move-btn_night": !isDay,
          })}
        >
          Создать сценарий
        </Link>
      </div>
      <div className="scenarios__content">
        <SearchBar onSearch={handleSearch} />
        <ul className="scenarios__list">
          {filteredItems.map(({ name, id, active }) => (
            <ListScript key={id} text={name} id={id} deleteScript={deleteScript} active={active}>
            </ListScript>
          ))}
        </ul>
      </div>
      {/*isTablet ? (
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
          ) : null*/}
    </div>
  );
};

export default Scenarios;
