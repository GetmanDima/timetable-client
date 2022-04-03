/* eslint-disable camelcase */
import jwt_decode from "jwt-decode";

export const validateEmail = text => {
  let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;

  return reg.test(text) !== false;
};

export const validatePassword = text => {
  return text.length >= 3;
};

export const getUserFromToken = token => {
  try {
    return jwt_decode(token).user;
  } catch (e) {
    return null;
  }
};
