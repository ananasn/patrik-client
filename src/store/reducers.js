import { getTheme } from '../utils/utils';

const initialState = {
  activeRobotPart: null,
  calls: [],
  choosedCall: {},
  isCallModalOpen: false,
  isDay: getTheme(),
  dialog: {
    off: false,
    commandChat: false,
    command: false,
    chat: true,
  },
  isDialogPopupOpen: false,
  isModalOpen: false,
  isModalAnimationOpen: false,
  isModalScriptOpen: false,
  isMove: true,
  moves: [],
  activePoseList: [],
  mimics: [],
  scripts: [],
  importMimic: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IS_MOVE":
      return {
        ...state,
        isMove: action.payload,
      };
    case "SET_MIMICS":
      return {
        ...state,
        mimics: action.payload,
      };
    case "ACTIVE_ROBOT_PART":
      return {
        ...state,
        activeRobotPart: action.payload,
      };
    case "ACTIVE_MIMICS":
      return {
        ...state,
        mimics: action.payload,
      };
    case "SET_ACTIVE_POSE_LIST":
      return {
        ...state,
        activePoseList: action.payload,
      };
    case "TOGGLE_IS_DIALOG_POPUP_OPEN":
      return {
        ...state,
        isDialogPopupOpen: !state.isDialogPopupOpen,
      };
    case "TOGGLE_IS_MODAL_OPEN":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case "TOGGLE_IS_MODAL_ANIMATION_OPEN":
      return {
        ...state,
        isModalAnimationOpen: !state.isModalAnimationOpen,
      };
    case "TOGGLE_IS_MODAL_SCRIPT_OPEN":
      return {
        ...state,
        isModalScriptOpen: !state.isModalScriptOpen,
      };
    case "SET_MOVES":
      return {
        ...state,
        moves: action.payload,
      };
    case "SET_CALLS":
      return {
        ...state,
        calls: action.payload,
      };
    case "SET_CHOOSED_CALL":
      return {
        ...state,
        choosedCall: action.payload,
      };
    case "TOGGLE_CALLMODAL_OPEN":
      return {
        ...state,
        isCallModalOpen: !state.isCallModalOpen,
      };
    case "TOGGLE_DAY":
      return {
        ...state,
        isDay: !state.isDay,
      };
    case "RESET_ACTIVE_FLAGS":
      return {
        ...state,
        activeRobotPart: null,
      };
      case "SET_SCRIPTS":
        return {
          ...state,
          scripts: action.payload,
        };
        case "SET_IMPORT_MIMIC":
          return {
            ...state,
            importMimic: action.payload,
          };

    default:
      return state;
  }
};

export default rootReducer;
