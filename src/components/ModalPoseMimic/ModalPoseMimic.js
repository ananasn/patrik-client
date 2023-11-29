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

const ModalPoseMimic = ({onMoveImport, isOpen, onClose, onMimicSelect}) => {
  const isMove = useSelector((state) => state.isMove);
  const isDay = useSelector((state) => state.isDay);
  // const isModalOpen = useSelector((state) => state.isModalOpen);
  const dispatch = useDispatch();
  const moves = useSelector((state) => state.moves);
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
  // useEffect(() => {
  //   if (isMove === true) {
  //     setFilteredItems(moves);
  //   } else {
  //     setFilteredItems(mimics);
  //   }
  // }, [moves, mimics, isMove]);
  const handleSearch = (searchTerm) => {
    if (isMove === true) {
      const filtered = moves.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      const filtered = mimics.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };
  // const handleModalClose = () => {
  //   dispatch(toggleIsModalOpen());
  // };
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
                      // <ListMimics
                      //   text={item.name}
                      //   id={item.id}
                      //   key={id}
                      //   isModal={true}
                      // ></ListMimics>
                      <div
                        onClick={() => onMimicSelect(mimic)} //mimic которая на сервере
                        key={mimic.id}
                      >
                        {mimic.name}
                      </div>
                      // <li
                      //   className={classnames("mimics__item", {
                      //     mimics__item_day: isDay,
                      //     mimics__item_night: !isDay,
                      //   })}
                      // >
                      //   <p className="mimics__text">{text}</p>
                      //   <div className="mimics__btns">
                      //     {isScene && (
                      //       <button
                      //         className={classnames("mimics__btn", {
                      //           mimics__btn_off_day: isDay,
                      //           mimics__btn_off_night: !isDay,
                      //         })}
                      //       ></button>
                      //     )}
                      //     {isModal ? (
                      //       <button
                      //         className={classnames("mimics__btn", {
                      //           mimics__btn_import_day: isDay,
                      //           mimics__btn_import_night: !isDay,
                      //         })}
                      //         onClick={handleImportMimicData}
                      //       ></button>
                      //     ) : (
                      //       <>
                      //         <button
                      //           className={classnames("mimics__btn", {
                      //             mimics__btn_delete_day: isDay,
                      //             mimics__btn_delete_night: !isDay,
                      //           })}
                      //           onClick={handleDelete}
                      //         ></button>
                      //         <Link
                      //           className={classnames("mimics__btn", {
                      //             mimics__btn_settings_day: isDay,
                      //             mimics__btn_settings_night: !isDay,
                      //           })}
                      //           to={`/emotions/emotion/${id}`}
                      //         ></Link>
                      //       </>
                      //     )}
                      //     <button
                      //       className={classnames("mimics__btn", {
                      //         mimics__btn_play_day: isDay,
                      //         mimics__btn_play_night: !isDay,
                      //       })}
                      //       onClick={handlePlay}
                      //     ></button>
                      //   </div>
                      // </li>
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
