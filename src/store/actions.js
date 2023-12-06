export const setImages = (move) => ({
  type: "SET_MOVES",
  payload: move,
});

export const toggleDay = () => {
  return {
    type: "TOGGLE_DAY",
  };
};
export const setMoves = (payload) => {
  return {
    type: "SET_MOVES",
    payload,
  };
};
export const setTriggers = (payload) => {
  return {
    type: "SET_TRIGGERS",
    payload,
  };
};
export const setRecognitions = (payload) => {
  return {
    type: "SET_RECOGNITIONS",
    payload,
  };
};
export const toggleIsDialogPopupOpen = () => ({
  type: "TOGGLE_IS_DIALOG_POPUP_OPEN",
});
export const toggleIsRecognitionStartModalOpen = () => ({
  type: "TOGGLE_IS_RECOGNITION_START_POPUP_OPEN",
});
export const toggleIsAddRecognitionModalOpen = () => ({
  type: "TOGGLE_IS_ADD_RECOGNITION_OPEN",
});
export const activePoseList = (payload) => ({
  type: "SET_ACTIVE_POSE_LIST",
  payload,
});
export const setMimics = (payload) => ({
  type: "SET_MIMICS",
  payload,
});
export const setIsMove = (payload) => ({
  type: "SET_IS_MOVE",
  payload,
});
export const toggleIsModalOpen = () => ({
  type: "TOGGLE_IS_MODAL_OPEN",
});

export const toggleIsModalAnimationOpen = () => ({
  type: "TOGGLE_IS_MODAL_ANIMATION_OPEN",
});

export const toggleIsModalScriptOpen = () => ({
  type: "TOGGLE_IS_MODAL_SCRIPT_OPEN",
});


export const setRobotPart = (payload) => {
  return {
    type: "ACTIVE_ROBOT_PART",
    payload,
  };
};
export const resetActiveFlags = () => {
  return {
    type: "RESET_ACTIVE_FLAGS",
  };
};
export const setScripts = (payload) => ({
  type: "SET_SCRIPTS",
  payload,
});

export const setImportMimic = (payload) => ({
  type: "SET_IMPORT_MIMIC",
  payload,
});

export const setImportMove = (payload) => ({
  type: "SET_IMPORT_MOVE",
  payload,
});

export const setImportRecognition = (payload) => ({
  type: "SET_IMPORT_RECOGNITION",
  payload,
});

export const setUpdate = (payload) => ({
  type: "SET_UPDATE",
  payload,
});


