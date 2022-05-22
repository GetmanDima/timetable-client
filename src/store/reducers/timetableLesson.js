import {
  START_LOADING_TIMETABLE_LESSONS,
  FINISH_LOADING_TIMETABLE_LESSONS,
  SUCCESS_GET_TIMETABLE_LESSONS,
  FAIL_GET_TIMETABLE_LESSONS,
  RESET_TIMETABLE_LESSONS_ERRORS,
} from "../actionTypes/timetableLesson";

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

    default:
      return state;
  }
};
