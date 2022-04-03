import {getAuthHost} from "./index";

export const fetchUniversities = (accessToken, {search}) => {
  const $host = getAuthHost(accessToken);
  return $host.get("/v1/universities", {params: {search}});
};

export const requestCreateUniversity = (
  accessToken,
  {name, fullName, address},
) => {
  const $host = getAuthHost(accessToken);
  return $host.post("/v1/universities", {name, fullName, address});
};
