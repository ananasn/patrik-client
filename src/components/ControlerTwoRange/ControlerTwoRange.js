import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import "./ControlerTwoRange.scss";

const ControlerTwoRange = ({ imgSrc, initialValue, maxValue, minValue, text, id, onChange }) => {
  const isDay = useSelector((state) => state.isDay);
  const [minVal, setMinVal] = useState(minValue);
  const [maxVal, setMaxVal] = useState(maxValue);
  const minValRef = useRef(minValue);
  const maxValRef = useRef(maxValue);
  const range = useRef(null);

    // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - minValue) / (maxValue - minValue)) * 100),
    [minValue, maxValue]
  );

    // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);
      // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ minValue: minVal, maxValue: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="controler">
      {imgSrc ?
        <img src={imgSrc} alt="control" />
        : <span className="controler__title">{text}</span>
      }

      <div>
        <div className="container">
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(value);
              minValRef.current = value;
            }}
            className={classNames("thumb thumb--left", {
              "thumb--day": isDay,
              "thumb--night": !isDay,
            })}
            style={{ zIndex: minVal > maxValue - 100 && "5" }}
            id={id}
          />
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(value);
              maxValRef.current = value;
            }}
            className={classNames("thumb thumb--right", {
              "thumb--day": isDay,
              "thumb--night": !isDay,
            })}
            id={id}
          />

          <div className="slider">
            <div
              className={classNames("slider__track", {
                "slider__track--day": isDay,
                "slider__track--night": !isDay,
              })}
            />
            <div ref={range}
              className={classNames("slider__range", {
                "slider__range--day": isDay,
                "slider__range--night": !isDay,
              })}
            />
            <div
              className={classNames("slider__left-value", {
                "slider__left-value--day": isDay,
                "slider__left-value--night": !isDay,
              })}
            >{minVal}</div>
            <div
              className={classNames("slider__right-value", {
                "slider__right-value--day": isDay,
                "slider__right-value--night": !isDay,
              })}
            >{maxVal}</div>
          </div>
        </div>
        <div>
          {/*<input
            type="number"
            onChange={(event) => {
              //const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(event.target.value);
              minValRef.current = event.target.value;
            }}
            value={minValue}
            min={minValue}
            max={maxValue}
            required
            className={classNames("controler__value inputWidth", {
              "controler__value--day": isDay,
              "controler__value--night": !isDay,
            })}
          />
          <input
            type="number"
            onChange={(event) => {
              //const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(event.target.value);
              maxValRef.current = event.target.value;
            }}
            value={maxValue}
            min={minValue}
            max={maxValue}
            required
            className={classNames("controler__value inputWidth", {
              "controler__value--day": isDay,
              "controler__value--night": !isDay,
            })}
          />*/}
        </div>
      </div>
    </div>
  );
};

export default ControlerTwoRange;

