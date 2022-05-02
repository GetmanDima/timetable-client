import {getHost} from "./index";

export const requestLogin = (email, password) => {
  const $host = getHost();
  return $host.post("/v1/auth/login", {email, password});
};

export const requestUpdateLogin = refreshToken => {
  const $host = getHost();
  return $host.post("/v1/tokens", {refreshToken});
};
