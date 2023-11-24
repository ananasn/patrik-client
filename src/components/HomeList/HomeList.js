import { useState } from "react";
//import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classnames from "classnames";

import HomeListSearchBar from "../SearchBar/SearchBar";

import "./HomeList.scss"; // Подключение стилей

const HomeList = ({ title, items }) => {
  const isDay = useSelector((state) => state.isDay);
  const [filteredItems, setFilteredItems] = useState(items); // Локальное состояние для фильтрованных элементов
  const handleSearch = (searchTerm) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  return (
    <div
      className={classnames("home-list", {
        "home-list_day": isDay,
        "home-list_night": !isDay,
      })}
    >
      <div className="home-list__content">
        <h2 className="home-list__title">{title}</h2>
        <HomeListSearchBar onSearch={handleSearch} />
        <ul className="home-list__list">
          {filteredItems.map((item, idx) => (
            <li
              className={classnames("home-list__item", {
                "home-list__item_day": isDay,
                "home-list__item_night": !isDay,
              })}
              key={idx}
            >
              <p className="home-list__text">{item.name}</p>
              <button
                className={classnames("home-list__btn", {
                  "home-list__btn_day": isDay,
                  "home-list__btn_night": !isDay,
                })}
                onClick={() => console.log("homelist btn clicked")}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeList;
