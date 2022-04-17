import {getAuthHost} from "./index";

export const fetchTimetables = accessToken => {
  const $host = getAuthHost(accessToken);
  return $host.get("/v1/timetables");
};

export const fetchTimetableLessons = (accessToken, timetableId) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/timetables/${timetableId}/lessons`);
};

export const fetchGroupTimetables = (accessToken, groupId) => {
  console.log(groupId);
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/groups/${groupId}/timetables`);
};
