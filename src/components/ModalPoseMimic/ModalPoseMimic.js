import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMoves, setMimics } from "../../store/actions";
import { toggleIsModalOpen } from "../../store/actions";
import { useHttp } from "../../hooks/http.hook";

import SearchBar from "../../components/SearchBar/SearchBar";
import ListItem from "../ListItem/ListItem";
import ListMimics from "../ListMimics/ListMimics";

import closeDay from "../../img/movesItem/delete-day.svg";
import closeNight from "../../img/movesItem/delete-night.svg";

import classNames from "classnames";

import "./ModalPoseMimic.scss";

const ModalPoseMimic = ({isOpen, onClose, onMimicSelect}) => {
  const isDay = useSelector((state) => state.isDay);
  const dispatch = useDispatch();
  const mimics = useSelector((state) => state.mimics);
  const [filteredItems, setFilteredItems] = useState([]);

  const { request, loading } = useHttp();
  useEffect(() => {
      const fetchData = async () => {
        const response = await request("http://localhost:8000/api/mimic/");
        const data = await response;
        dispatch(setMimics(data));
        setFilteredItems(data);
      };
      fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = mimics.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // const handlePlayMimic = async () => {
  //   await fetch(`http://localhost:8000/api/run_mimic/${id}/`, {method:"POST"});
  //   console.log(id, "run mimic");
  // }

  return (
    <div
      className={classNames("modalPoseMimic", {
        "modalPoseMimic--open": isOpen,
      })}
    >
      <div
        className={classNames("modalPoseMimic__inner", {
          "modalPoseMimic__inner--day": isDay,
          "modalPoseMimic__inner--night": !isDay,
        })}
      >
        <div className="modalPoseMimic__header">
          <div className="modalPoseMimic__header-top">
            <h2 className="modalPoseMimic__title">
              Выбор мимики
            </h2>
            <button onClick={onClose} className="modalPoseMimic__close">
              <img src={isDay ? closeDay : closeNight} alt="Close" />
            </button>
          </div>
          <div className="modalPoseMimic__header-bottom">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <div className="modalPoseMimic__body">
          <ul className="modalPoseMimic__list">
            {loading ? (
              <h2>Идёт загрузка данных</h2>
            ) : (
              filteredItems.map((mimic, id) => {
                    return (
                      <div
                        onClick={() => onMimicSelect(mimic)} //mimic которая на сервере
                        key={mimic.id}
                      >
                        {mimic.name}
                        {/* нужны ли тут кнопки импорт и плей? - смотри в ListMimics */}
                        {/* <button
                          className={classNames("mimics__btn", {
                            mimics__btn_import_day: isDay,
                            mimics__btn_import_night: !isDay,
                          })}
                          onClick={handleImportMimicData}
                        ></button>
                        <button
                          className={classNames("mimics__btn", {
                            mimics__btn_play_day: isDay,
                            mimics__btn_play_night: !isDay,
                          })}
                          onClick={handlePlayMimic}
                        ></button> */}
                      </div>
                    );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModalPoseMimic;
