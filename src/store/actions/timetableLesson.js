import {fetchTimetableLessons} from "../../api/timetable";
import {
  SUCCESS_GET_TIMETABLE_LESSONS,
  FAIL_GET_TIMETABLE_LESSONS,
} from "../actionTypes/timetableLesson";

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

export const getTimetableLessons = timetableId => {
  return async (dispatch, getState) => {
    fetchTimetableLessons(getState().auth.accessToken, timetableId)
      .then(res => {
        dispatch(
          successGetTimetableLessons(
            timetableId,
            toWeekDaysWithLessons(res.data),
          ),
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
        const newLesson = {
          id: lesson.id,
          weekDay: lesson.weekDay,
          weekType: lesson.weekType,
          format: lesson.format,
          room: lesson.room,
          classType: lesson.classType,
          classTime: lesson.ClassTime,
          teacher: lesson.Teacher,
          subject: lesson.Subject,
        };

        const weekDay = weekDays[newLesson.weekDay]
          ? weekDays[newLesson.weekDay]
          : {};

        let newWeekType = {};

        if (newLesson.weekDay && newLesson.weekType) {
          if (
            weekDays[newLesson.weekDay] &&
            weekDays[newLesson.weekDay][newLesson.weekType]
          ) {
            newWeekType = {
              [newLesson.weekType]: [
                ...weekDays[newLesson.weekDay][newLesson.weekType],
                newLesson,
              ],
            };
          } else {
            newWeekType = {
              [newLesson.weekType]: [newLesson],
            };
          }
        }

        let newWeekDay = {};

        if (newLesson.weekDay) {
          newWeekDay = {
            [newLesson.weekDay]: {
              ...weekDay,
              ...newWeekType,
            },
          };
        }

        return {
          ...weekDays,
          ...newWeekDay,
        };
      }, {})
    : {};
};
