import {
  SUCCESS_GET_TIMETABLE,
  FAIL_GET_TIMETABLE,
  START_LOADING_TIMETABLE,
} from "../actionTypes/timetable";

const initialState = {
  timetable: {},
  loading: false,
  errors: [],
};

export default (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SUCCESS_GET_TIMETABLE:
      return {
        ...state,
        timetable: payload,
        loading: false,
        errors: [],
      };
    case FAIL_GET_TIMETABLE:
      return {...state, loading: false, errors: payload};
    case START_LOADING_TIMETABLE:
      return {...state, loading: true};

    default:
      return state;
  }
};
