import classnames from "classnames";
import { useSelector } from "react-redux";
import "./ListItemAnimation.scss";

const ListItemAnimation = ({
  text,
  isModal = false,
  onClick,
}) => {
  const isDay = useSelector((state) => state.isDay);
  return (
    <li
      className={classnames("animation__item", {
        animation__item_day: isDay,
        animation__item_night: !isDay,
      })}
      onClick={onClick}
    >
      <div className="animation__btns">
        {isModal ? (
          <button
            className={classnames("animation__btn", {
              animation__btn_animation_play_day: isDay,
              animation__btn_animation_play_night: !isDay,
            })}
          ></button>
        ) : (
          <>
            <button
              className={classnames("animation__btn", {
                animation__btn_delete_day: isDay,
                animation__btn_delete_night: !isDay,
              })}
            ></button>
          </>
        )}
      </div>
      <p
        //className="animation__text"
        className={classnames("animation__text", {
          animation__text_day: isDay,
          animation__text_night: !isDay,
        })}
      >{text}</p>
    </li>
  );
};

export default ListItemAnimation;
