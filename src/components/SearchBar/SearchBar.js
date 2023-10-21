import { useState } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";

import searchIcon from '../../img/icons/menu-day/search.png';
import searchIconNight from '../../img/icons/menu-night/search-night.png';

import "./SearchBar.scss";

const SearchBar = ({ onSearch }) => {
    const isDay = useSelector((state) => state.isDay);

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className={classnames("search-bar", {
        "search-bar_day": isDay,
        "search-bar_night": !isDay,
      })}>
        <img src={isDay? searchIcon : searchIconNight} alt="иконка поиска" className="search-bar__img"/>
    <input
      className={classnames("search-bar__input", {
        "search-bar__input_day": isDay,
        "search-bar__input_night": !isDay,
      })}
      type="text"
      placeholder="Поиск..."
      value={searchTerm}
      onChange={handleChange}
    />
    </div>
  );
};

export default SearchBar;
