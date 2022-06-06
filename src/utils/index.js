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

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getIdFromLocation = location => {
  return parseInt(location.split("/").slice(-1)[0]);
};

export const removeItemFromArray = (array, index) => {
  if (array.length === 0) {
    return [];
  }

  return [
    ...array.slice(0, index), // first part of the array, 0 to index (excluded)
    ...array.slice(index + 1), // the rest, after the index
  ];
};

export const removePropertyFromObject = (obj, propertyName) => {
  return Object.keys(obj).reduce((newObj, prop) => {
    if (prop === propertyName) {
      return newObj;
    }

    return {...newObj, [prop]: obj[prop]};
  }, {});
};
