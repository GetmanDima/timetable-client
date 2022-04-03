import {getHost} from "./index";

export const requestRegister = (
  type,
  email,
  password,
  firstName,
  lastName,
  code,
) => {
  const $host = getHost();
  return $host.post(`/v1/auth/register/${type}`, {
    email,
    password,
    firstName,
    lastName,
    code,
  });
};
