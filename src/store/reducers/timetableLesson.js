import {
  SUCCESS_GET_TIMETABLE_LESSONS,
  FAIL_GET_TIMETABLE_LESSONS,
  START_LOADING_TIMETABLE_LESSONS,
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
    case START_LOADING_TIMETABLE_LESSONS:
      return {
        ...state,
        loadings: {...state.loadings, [payload.timetableId]: true},
      };

    default:
      return state;
  }
};
