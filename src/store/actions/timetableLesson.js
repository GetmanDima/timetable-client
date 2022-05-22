import {fetchTimetableLessons} from "../../api/timetable";
import {
  START_LOADING_TIMETABLE_LESSONS,
  FINISH_LOADING_TIMETABLE_LESSONS,
  SUCCESS_GET_TIMETABLE_LESSONS,
  FAIL_GET_TIMETABLE_LESSONS,
  RESET_TIMETABLE_LESSONS_ERRORS,
} from "../actionTypes/timetableLesson";

export const startLoadingTimetableLessons = timetableId => {
  return {
    type: START_LOADING_TIMETABLE_LESSONS,
    payload: {timetableId},
  };
};

export const finishLoadingTimetableLessons = timetableId => {
  return {
    type: FINISH_LOADING_TIMETABLE_LESSONS,
    payload: {timetableId},
  };
};

export const resetTimetableLessonsErrors = timetableId => {
  return {
    type: RESET_TIMETABLE_LESSONS_ERRORS,
    payload: {timetableId},
  };
};

export const successGetTimetableLessons = (
  timetableId,
  weekDaysWithLessons,
) => {
  return {
    type: SUCCESS_GET_TIMETABLE_LESSONS,
    payload: {timetableId, weekDaysWithLessons},
  };
};

export const failGetTimetableLessons = (timetableId, errors) => {
  return {
    type: FAIL_GET_TIMETABLE_LESSONS,
    payload: {timetableId, errors},
  };
};

export const getTimetableLessons = (timetableId, {weekDay = ""}) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingTimetableLessons(timetableId));

    fetchTimetableLessons(getState().auth.accessToken, timetableId, {weekDay})
      .then(res => {
        dispatch(
          successGetTimetableLessons(timetableId, {
            ...(getState().timetableLesson.weekDaysWithLessons[timetableId] ??
              {}),
            ...toWeekDaysWithLessons(res.data),
          }),
        );
      })
      .catch(() => {
        dispatch(
          failGetTimetableLessons(timetableId, [
            "Ошибка при получении расписания",
          ]),
        );
      });
  };
};

const toWeekDaysWithLessons = lessons => {
  return lessons
    ? lessons.reduce((weekDays, lesson) => {
        const weekDayLessons = weekDays[lesson.weekDay]
          ? weekDays[lesson.weekDay]
          : [];

        let newWeekDay = {};

        if (lesson.weekDay) {
          newWeekDay = {
            [lesson.weekDay]: [...weekDayLessons, lesson],
          };
        }

        return {
          ...weekDays,
          ...newWeekDay,
        };
      }, {})
    : {};
};
