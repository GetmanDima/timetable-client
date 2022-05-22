import {fetchTimetable} from "../../api/timetable";
import {
  SUCCESS_GET_TIMETABLE,
  FAIL_GET_TIMETABLE,
  SET_WEEK_TYPES,
  SET_CLASS_TIMES,
  SET_TEACHERS,
  SET_SUBJECTS,
  START_LOADING_TIMETABLE,
  RESET_TIMETABLE_ERRORS,
} from "../actionTypes/timetable";

export const startLoadingTimetable = timetableId => {
  return {
    type: START_LOADING_TIMETABLE,
    payload: {timetableId},
  };
};

export const resetTimetableErrors = timetableId => {
  return {
    type: RESET_TIMETABLE_ERRORS,
    payload: {timetableId},
  };
};

export const successGetTimetable = timetable => {
  return {
    type: SUCCESS_GET_TIMETABLE,
    payload: timetable,
  };
};

export const failGetTimetable = (timetableId, errors) => {
  return {
    type: FAIL_GET_TIMETABLE,
    payload: {timetableId, errors},
  };
};

export const setWeekTypes = (timetableId, weekTypes) => {
  return {
    type: SET_WEEK_TYPES,
    payload: {timetableId, weekTypes},
  };
};

export const setClassTimes = (timetableId, classTimes) => {
  return {
    type: SET_CLASS_TIMES,
    payload: {timetableId, classTimes},
  };
};

export const setTeachers = (timetableId, teachers) => {
  return {
    type: SET_TEACHERS,
    payload: {timetableId, teachers},
  };
};

export const setSubjects = (timetableId, subjects) => {
  return {
    type: SET_SUBJECTS,
    payload: {timetableId, subjects},
  };
};

export const getTimetable = timetableId => {
  return async (dispatch, getState) => {
    dispatch(startLoadingTimetable(timetableId));

    fetchTimetable(getState().auth.accessToken, timetableId)
      .then(res => {
        dispatch(setWeekTypes(timetableId, res.data.WeekTypes));
        dispatch(setClassTimes(timetableId, res.data.ClassTimes));
        dispatch(setTeachers(timetableId, res.data.Teachers));
        dispatch(setSubjects(timetableId, res.data.Subjects));
        delete res.data.WeekTypes;
        delete res.data.ClassTimes;
        delete res.data.Teachers;
        delete res.data.Subjects;
        dispatch(successGetTimetable(res.data));
      })
      .catch(() => {
        dispatch(
          failGetTimetable(timetableId, ["Ошибка при получении расписания"]),
        );
      });
  };
};
