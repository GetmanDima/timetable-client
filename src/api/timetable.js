import {getAuthHost} from "./index";

export const fetchTimetables = (accessToken, {parsed}) => {
  const params = {};

  if (parsed !== undefined) {
    params.parsed = parsed ? 1 : 0;
  }

  const $host = getAuthHost(accessToken);
  return $host.get("/v1/timetables", {params});
};

export const fetchTimetableLessons = (accessToken, timetableId) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/timetables/${timetableId}/lessons`);
};

export const fetchGroupTimetables = (accessToken, groupId, {limit, offset}) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/groups/${groupId}/timetables`, {
    params: {limit, offset},
  });
};
