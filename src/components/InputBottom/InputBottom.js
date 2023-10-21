import { useSelector } from "react-redux";
import "./InputBottom.scss";
import InputDay from "../../img/input-day/send-day.svg";
import InputNight from "../../img/input-night/send.svg";
const InputBottom = () => {
  const isDay = useSelector((state) => state.isDay);
  if (isDay) {
    return (
      <form className="robot__form" action="#">
        <input placeholder="Введите текст для робота" type="text" className="robot__input-day" />
        <button className="robot__send">
          <img src={InputDay} alt="Отправить" />
        </button>
      </form>
    );
  } else {
    return (
      <form className="robot__form" action="#">
        <input placeholder="Введите текст для робота" type="text" className="robot__input-night" />
        <button className="robot__send">
          <img src={InputNight} alt="Отправить" />
        </button>
      </form>
    );
  }
};

export default InputBottom;
