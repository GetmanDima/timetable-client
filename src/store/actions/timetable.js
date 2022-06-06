import {fetchTimetable} from "../../api/timetable";
import {
  SUCCESS_GET_TIMETABLE,
  FAIL_GET_TIMETABLE,
  SET_WEEK_TYPES,
  ADD_WEEK_TYPE,
  SET_CLASS_TIMES,
  ADD_CLASS_TIME,
  SET_TEACHERS,
  ADD_TEACHER,
  SET_SUBJECTS,
  ADD_SUBJECT,
  START_LOADING_TIMETABLE,
  RESET_TIMETABLE_ERRORS,
  DELETE_WEEK_TYPE,
  DELETE_CLASS_TIME,
  DELETE_TEACHER,
  DELETE_SUBJECT,
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

export const addWeekType = (timetableId, weekType) => {
  return {
    type: ADD_WEEK_TYPE,
    payload: {timetableId, weekType},
  };
};

export const deleteWeekType = (timetableId, weekType) => {
  return {
    type: DELETE_WEEK_TYPE,
    payload: {timetableId, weekType},
  };
};

export const setClassTimes = (timetableId, classTimes) => {
  return {
    type: SET_CLASS_TIMES,
    payload: {timetableId, classTimes},
  };
};

export const addClassTime = (timetableId, classTime) => {
  return {
    type: ADD_CLASS_TIME,
    payload: {timetableId, classTime},
  };
};

export const deleteClassTime = (timetableId, classTime) => {
  return {
    type: DELETE_CLASS_TIME,
    payload: {timetableId, classTime},
  };
};

export const setTeachers = (timetableId, teachers) => {
  return {
    type: SET_TEACHERS,
    payload: {timetableId, teachers},
  };
};

export const addTeacher = (timetableId, teacher) => {
  return {
    type: ADD_TEACHER,
    payload: {timetableId, teacher},
  };
};

export const deleteTeacher = (timetableId, teacher) => {
  return {
    type: DELETE_TEACHER,
    payload: {timetableId, teacher},
  };
};

export const setSubjects = (timetableId, subjects) => {
  return {
    type: SET_SUBJECTS,
    payload: {timetableId, subjects},
  };
};

export const addSubject = (timetableId, subject) => {
  return {
    type: ADD_SUBJECT,
    payload: {timetableId, subject},
  };
};

export const deleteSubject = (timetableId, subject) => {
  return {
    type: DELETE_SUBJECT,
    payload: {timetableId, subject},
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
