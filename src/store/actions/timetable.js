import {fetchTimetable} from "../../api/timetable";
import {
  SUCCESS_GET_TIMETABLE,
  FAIL_GET_TIMETABLE,
} from "../actionTypes/timetable";

export const successGetTimetable = timetable => {
  return {
    type: SUCCESS_GET_TIMETABLE,
    payload: timetable,
  };
};

export const failGetTimetable = errors => {
  return {
    type: FAIL_GET_TIMETABLE,
    payload: errors,
  };
};

export const getTimetable = timetableId => {
  return async (dispatch, getState) => {
    fetchTimetable(getState().auth.accessToken, timetableId)
      .then(res => {
        dispatch(successGetTimetable(res.data));
      })
      .catch(() => {
        dispatch(failGetTimetable(["Ошибка при получении расписания"]));
      });
  };
};
