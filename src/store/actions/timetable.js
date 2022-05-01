import {fetchTimetables} from "../../api/timetable";
import {
  SUCCESS_GET_TIMETABLES,
  FAIL_GET_TIMETABLES,
  ADD_TIMETABLE,
} from "../actionTypes/timetable";

export const successGetTimetables = timetables => {
  return {
    type: SUCCESS_GET_TIMETABLES,
    payload: timetables,
  };
};

export const failGetTimetables = errors => {
  return {
    type: FAIL_GET_TIMETABLES,
    payload: errors,
  };
};

export const addTimetable = ({id, name}) => {
  return {
    type: ADD_TIMETABLE,
    payload: {id, name, createdAt: Date.now(), updatedAt: Date.now()},
  };
};

export const getTimetables = ({parsed}) => {
  return async (dispatch, getState) => {
    fetchTimetables(getState().auth.accessToken, {parsed})
      .then(res => {
        dispatch(successGetTimetables(res.data));
      })
      .catch(() => {
        dispatch(failGetTimetables(["Ошибка при получении расписания"]));
      });
  };
};
