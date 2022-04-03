import {getUserFromToken} from "../../utils";
import {
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  LOGOUT,
  START_LOADING_LOGIN,
  SET_GROUP,
} from "../actionTypes/auth";
import {requestLogin, requestCreateGroup} from "../../api/auth";

const startLoading = () => {
  return {
    type: START_LOADING_LOGIN,
  };
};

const successLogin = (accessToken, user) => {
  return {
    type: SUCCESS_LOGIN,
    payload: {
      accessToken,
      user,
    },
  };
};

const failLogin = errors => {
  return {
    type: FAIL_LOGIN,
    payload: errors,
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch(startLoading());
    requestLogin(email, password)
      .then(res => {
        const accessToken = res.data.accessToken;
        const user = getUserFromToken(res.data.accessToken);

        if (user === null) {
          return dispatch(failLogin(["Unknown error"]));
        }

        dispatch(successLogin(accessToken, user));
      })
      .catch(e => {
        let errors = [];

        if (e.response.status === 401) {
          errors = ["Incorrect email or password"];
        } else {
          errors = ["Login failed"];
        }

        dispatch(failLogin(errors));
      });
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const createGroup = (
  accessToken,
  directionId,
  {name, courseNumber, admissionYear},
) => {
  return async dispatch => {
    try {
      const res = await requestCreateGroup(accessToken, directionId, {
        name,
        courseNumber,
        admissionYear,
      });

      if (res.status === 201) {
        const newGroupId = res.headers["location"].split("/").slice(-1)[0];

        dispatch({
          type: SET_GROUP,
          payload: {
            value: newGroupId,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
