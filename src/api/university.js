import {getAuthHost} from "./index";

export const fetchUniversities = (
  accessToken,
  {parsed, search, limit, offset} = {},
) => {
  const params = {search, limit, offset};

  if (parsed !== undefined) {
    params.parsed = parsed ? 1 : 0;
  }

  const $host = getAuthHost(accessToken);
  return $host.get("/v1/universities", {params});
};

export const requestCreateUniversity = (
  accessToken,
  {name, fullName, address} = {},
) => {
  const $host = getAuthHost(accessToken);
  return $host.post("/v1/universities", {name, fullName, address});
};
