import {getAuthHost} from "./index";

export const requestCreateGroup = (
  accessToken,
  directionId,
  {name, courseNumber, admissionYear},
) => {
  const $host = getAuthHost(accessToken);
  return $host.post(`/v1/directions/${directionId}/groups`, {
    name,
    courseNumber,
    admissionYear,
  });
};
