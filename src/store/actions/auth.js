import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserFromToken} from "../../utils";
import {
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  LOGOUT,
  START_LOADING_LOGIN,
  SET_GROUP,
} from "../actionTypes/auth";
import {
  requestLogin,
  requestCreateGroup,
  requestUpdateLogin,
} from "../../api/auth";

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
      .then(async res => {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        const user = getUserFromToken(res.data.accessToken);

        if (user === null) {
          return dispatch(failLogin(["Unknown error"]));
        }

        try {
          await AsyncStorage.setItem("refreshToken", refreshToken);
        } catch (e) {
          console.log(e);
        }

        dispatch(successLogin(accessToken, user));
      })
      .catch(e => {
        let errors = [];

        if (e.response.status === 401) {
          errors = ["Incorrect email or password"];
        } else {
          console.log(e);
          errors = ["Login failed"];
        }

        dispatch(failLogin(errors));
      });
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      await AsyncStorage.removeItem("refreshToken");
    } catch (e) {
      console.log(e);
    }

    dispatch({type: LOGOUT});
  };
};

export const updateLogin = () => {
  return async dispatch => {
    let refreshToken;

    try {
      refreshToken = await AsyncStorage.getItem("refreshToken");

      if (!refreshToken) {
        dispatch(failLogin([]));
      }
    } catch (e) {
      dispatch(failLogin([]));
    }

    requestUpdateLogin(refreshToken)
      .then(async res => {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        const user = getUserFromToken(res.data.accessToken);

        if (user === null) {
          return dispatch(failLogin([]));
        }

        try {
          await AsyncStorage.setItem("refreshToken", refreshToken);
        } catch (e) {
          console.log(e);
        }

        dispatch(successLogin(accessToken, user));
      })
      .catch(() => {
        dispatch(failLogin([]));
      });
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
