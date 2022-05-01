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
  const defaultWeekTypeName = "common";

  return lessons
    ? lessons.reduce((weekDays, lesson) => {
        const newLesson = {
          id: lesson.id,
          weekDay: lesson.weekDay,
          format: lesson.format,
          room: lesson.room,
          weekType: lesson.WeekType,
          classType: lesson.classType,
          classTime: lesson.ClassTime,
          teacher: lesson.Teacher,
          subject: lesson.Subject,
        };

        const weekDay = weekDays[newLesson.weekDay]
          ? weekDays[newLesson.weekDay]
          : {};

        let newWeekType = {};

        if (newLesson.weekDay) {
          const weekTypeName = newLesson.weekType.name
            ? newLesson.weekType.name
            : defaultWeekTypeName;

          if (
            weekDays[newLesson.weekDay] &&
            weekDays[newLesson.weekDay][weekTypeName]
          ) {
            newWeekType = {
              [weekTypeName]: [
                ...weekDays[newLesson.weekDay][weekTypeName],
                newLesson,
              ],
            };
          } else {
            newWeekType = {
              [weekTypeName]: [newLesson],
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
