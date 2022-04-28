import {getAuthHost} from "./index";

export const requestCreateGroup = (
  accessToken,
  universityId,
  {name, courseNumber, admissionYear},
) => {
  const $host = getAuthHost(accessToken);
  return $host.post(`/v1/universities/${universityId}/groups`, {
    name,
    courseNumber,
    admissionYear,
  });
};

export const fetchGroups = (
  accessToken,
  universityId,
  {parsed, search, limit, offset} = {},
) => {
  const params = {search, limit, offset};

  if (parsed !== undefined) {
    params.parsed = parsed ? 1 : 0;
  }

  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/universities/${universityId}/groups`, {params});
};
