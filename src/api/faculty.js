import {getAuthHost} from "./index";

export const fetchFaculties = (accessToken, universityId, {search}) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/universities/${universityId}/faculties`, {
    params: {search},
  });
};

export const requestCreateFaculty = (
  accessToken,
  universityId,
  {name, fullName},
) => {
  const $host = getAuthHost(accessToken);
  return $host.post(`/v1/universities/${universityId}/faculties`, {
    name,
    fullName,
  });
};
