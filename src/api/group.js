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
