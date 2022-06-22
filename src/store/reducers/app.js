import {
  SET_SHOW_TIMETABLES_MODE,
  SET_EDIT_TIMETABLES_MODE,
} from "../actionTypes/app";

const initialState = {
  timetablesMode: "show",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_TIMETABLES_MODE:
      return {
        ...state,
        timetablesMode: "show",
      };
    case SET_EDIT_TIMETABLES_MODE:
      return {
        ...state,
        timetablesMode: "edit",
      };
    default:
      return state;
  }
};
