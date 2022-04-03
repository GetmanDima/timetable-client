import {
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  LOGOUT,
  SET_GROUP,
  START_LOADING_LOGIN,
} from "../actionTypes/auth";

const initialState = {
  status: false,
  accessToken: "",
  user: {
    id: null,
    firstName: "",
    lastName: "",
    groupId: null,
  },
  loading: false,
  errors: [],
};

export default (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SUCCESS_LOGIN:
      return {
        ...state,
        status: true,
        accessToken: payload.accessToken,
        user: payload.user,
        loading: false,
        errors: [],
      };
    case FAIL_LOGIN:
      return {...state, status: false, loading: false, errors: payload};
    case LOGOUT:
      return {...initialState};
    case SET_GROUP:
      return {...state, user: {...state.user, groupId: payload.value}};
    case START_LOADING_LOGIN:
      return {...state, loading: true};

    default:
      return state;
  }
};
