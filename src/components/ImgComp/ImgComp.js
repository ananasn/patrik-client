const ImgComp = ({ dragControls, children }) => {
  return (
    <button
      onPointerDown={(event) => dragControls.start(event)}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
};

export default ImgComp;
