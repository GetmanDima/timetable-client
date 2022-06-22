import {removeItemFromArray} from "../../utils";
import {
  START_LOADING_TIMETABLE_LESSONS,
  FINISH_LOADING_TIMETABLE_LESSONS,
  SUCCESS_GET_TIMETABLE_LESSONS,
  FAIL_GET_TIMETABLE_LESSONS,
  RESET_TIMETABLE_LESSONS_ERRORS,
  ADD_TIMETABLE_LESSON,
  DELETE_TIMETABLE_LESSON,
  SET_WEEK_DAYS_WITH_LESSONS,
} from "../actionTypes/timetableLesson";

const deleteLesson = (weekDaysWithLessons, timetableId, lesson) => {
  const timetableWeekDays = weekDaysWithLessons[timetableId];
  const splitIndex = timetableWeekDays[lesson.weekDay].findIndex(
    l => l.id === lesson.id,
  );

  return {
    ...weekDaysWithLessons,
    [timetableId]: {
      ...timetableWeekDays,
      [lesson.weekDay]: removeItemFromArray(
        timetableWeekDays[lesson.weekDay],
        splitIndex,
      ),
    },
  };
};

const initialState = {
  // key - timetable id, value - timetable days
  weekDaysWithLessons: {},
  // key - timetable id, value - loading status
  loadings: {},
  // key - timetable id, value - errors
  errors: {},
};

export default (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case START_LOADING_TIMETABLE_LESSONS:
      return {
        ...state,
        loadings: {...state.loadings, [payload.timetableId]: true},
      };
    case FINISH_LOADING_TIMETABLE_LESSONS:
      return {
        ...state,
        loadings: {...state.loadings, [payload.timetableId]: false},
      };
    case RESET_TIMETABLE_LESSONS_ERRORS:
      return {
        ...state,
        errors: {...state.errors, [payload.timetableId]: undefined},
      };
    case SUCCESS_GET_TIMETABLE_LESSONS:
      return {
        ...state,
        weekDaysWithLessons: {
          ...state.weekDaysWithLessons,
          [payload.timetableId]: payload.weekDaysWithLessons,
        },
        loadings: {...state.loadings, [payload.timetableId]: false},
        errors: {...state.errors, [payload.timetableId]: payload.errors},
      };
    case FAIL_GET_TIMETABLE_LESSONS:
      return {
        ...state,
        loadings: {...state.loadings, [payload.timetableId]: false},
        errors: {...state.errors, [payload.timetableId]: payload.errors},
      };
    case DELETE_TIMETABLE_LESSON:
      return {
        ...state,
        weekDaysWithLessons: deleteLesson(
          state.weekDaysWithLessons,
          payload.timetableId,
          payload.lesson,
        ),
      };
    case ADD_TIMETABLE_LESSON:
      return {
        ...state,
        weekDaysWithLessons: {
          ...state.weekDaysWithLessons,
          [payload.timetableId]: {
            ...(state.weekDaysWithLessons[payload.timetableId] ?? {}),
            [payload.lesson.weekDay]: [
              ...(state.weekDaysWithLessons[payload.timetableId]
                ? state.weekDaysWithLessons[payload.timetableId][
                    payload.lesson.weekDay
                  ] ?? []
                : []),
              payload.lesson,
            ],
          },
        },
      };
    case SET_WEEK_DAYS_WITH_LESSONS:
      return {
        ...state,
        weekDaysWithLessons: {
          ...state.weekDaysWithLessons,
          [payload.timetableId]: payload.weekDaysWithLessons,
        },
      };
    default:
      return state;
  }
};
