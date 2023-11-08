import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import NavList from "../components/NavList/NavList";
import { useHttp } from "../hooks/http.hook";
import back from "../img/icons/menu-day/back-day.svg";
import backNight from "../img/icons/menu-night/back-night.svg";
import { setMimics } from "../store/actions";
//import NavList from "../components/NavList/NavList";

import "./Emotions.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import ListMimics from "../components/ListMimics/ListMimics";

const Emotions = () => {
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
      const response = await request("http://localhost:8000/api/mimic/");
      const data = await response;
      // console.log(data);
      dispatch(setMimics(data));
    };
    fetchData();
  }, []);
  const mimics = useSelector((state) => state.mimics);

  const deleteMimic = async (mimicId) => {
    await fetch(`http://localhost:8000/api/mimic/${mimicId}/`, {method:"DELETE"});

    const fetchData = async () => {
      const response = await request("http://localhost:8000/api/mimic/");
      const data = await response;
      // console.log(data);
      dispatch(setMimics(data));
    };
    fetchData();
  }

  const [filteredItems, setFilteredItems] = useState(mimics);
  useEffect(() => {
    setFilteredItems(mimics);
  }, [mimics]);
  const handleSearch = (searchTerm) => {
    const filtered = mimics.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  if (loading) {
    return <h1 className="loading-text" style={{ textAlign: "center" }}>Идёт загрузка...</h1>;
  }
  return (
    <div className="emotion">
      <div
        className={classnames("emotion__header", {
          emotion__header_day: isDay,
          emotion__header_night: !isDay,
        })}
      >
        <button
          onClick={goBack}
          className={classnames("emotion__back-btn", {
            "emotion__back-btn_day": isDay,
            "emotion__back-btn_night": !isDay,
          })}
        >
          <img
            className="emotion__back-btn-img"
            alt="Back"
            src={isDay ? back : backNight}
          />
          Мимика
        </button>
        <Link
          to="/new-emotion"
          className={classnames("emotion__new-move-btn", {
            "emotion__new-move-btn_day": isDay,
            "emotion__new-move-btn_night": !isDay,
          })}
        >
          Создать мимику
        </Link>
      </div>
      <div className="emotion__content">
        <SearchBar onSearch={handleSearch} />
        <ul className="emotion__list">
          {filteredItems.map(({ name, id }) => (
            <ListMimics key={id} text={name} id={id} deleteMimic={deleteMimic}>
            </ListMimics>
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

export default Emotions;
