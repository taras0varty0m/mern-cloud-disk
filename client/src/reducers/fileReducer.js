const SET_FILE = "SET_FILE";
const SER_CURRENT_DIR = "SER_CURRENT_DIR";
const ADD_FILE = "ADD_FILE";
const PUSH_TO_STACK = "PUSH_TO_STACK";

const defaultState = {
  files: [],
  currentDir: null,
  dirStack: [],
};

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILE:
      return {
        ...state,
        files: action.payload,
      };
    case SER_CURRENT_DIR:
      return {
        ...state,
        currentDir: action.payload,
      };
    case ADD_FILE: {
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    }
    case PUSH_TO_STACK: {
      return { ...state, dirStack: [...state.dirStack, action.payload] };
    }
    default:
      return state;
  }
}
const setFiles = (files) => ({ type: SET_FILE, payload: files });
const addFile = (file) => ({ type: ADD_FILE, payload: file });
const setCurrentDir = (dir) => ({ type: SER_CURRENT_DIR, payload: dir });
const pushToStack = (dir) => ({ type: PUSH_TO_STACK, payload: dir });

export { setFiles, setCurrentDir, addFile, pushToStack };
