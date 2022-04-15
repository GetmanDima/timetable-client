import {
  SUCCESS_GET_TIMETABLES,
  FAIL_GET_TIMETABLES,
  START_LOADING_TIMETABLES,
} from "../actionTypes/timetable";

const initialState = {
  timetables: [],
  loading: false,
  errors: [],
};

export default (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SUCCESS_GET_TIMETABLES:
      return {
        ...state,
        timetables: payload,
        loading: false,
        errors: [],
      };
    case FAIL_GET_TIMETABLES:
      return {...state, loading: false, errors: payload};
    case START_LOADING_TIMETABLES:
      return {...state, loading: true};

    default:
      return state;
  }
};
