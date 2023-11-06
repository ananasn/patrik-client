import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import "./ControlerMimic.scss";

const Controler = ({ imgSrc, initialValue, maxValue, text, id, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const isDay = useSelector((state) => state.isDay);
  const changeValue = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  useEffect(() => {
    const slider = document.querySelector(`#${id}`);
    // console.log(slider, id);
    slider.style.setProperty("--value", value);
    slider.style.setProperty("--min", slider.min === "" ? "0" : slider.min);
    slider.style.setProperty("--max", slider.max === "" ? "100" : slider.max);
    slider.addEventListener("input", () =>
      slider.style.setProperty("--value", slider.value)
    );
  }, [value]);

  return (
    <div className="controler">
      {imgSrc ?
        <img src={imgSrc} alt="control" />
        : <span className="controler__title">{text}</span>
      }
      <input
        type="range"
        onChange={(e) => changeValue(e)}
        value={value}
        min={0}
        max={maxValue}
        className={classNames("controler-input slider-progress", {
          "controler-input--day slider-progress--day": isDay,
          "controler-input--night slider-progress--night": !isDay,
        })}
        //className="controler-input slider-progress"
        id={id}
      />
      <div
        className={classNames("controler__value", {
          "controler__value--day": isDay,
          "controler__value--night": !isDay,
        })}
      >
        {value}
      </div>
    </div>
  );
};

export default Controler;
