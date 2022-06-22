import {
  SET_SHOW_TIMETABLES_MODE,
  SET_EDIT_TIMETABLES_MODE,
} from "../actionTypes/app";

export const setShowTimetablesMode = () => {
  return {
    type: SET_SHOW_TIMETABLES_MODE,
  };
};

export const setEditTimetablesMode = () => {
  return {
    type: SET_EDIT_TIMETABLES_MODE,
  };
};
