import {getAuthHost} from "./index";

export const requestCreateTimetable = (accessToken, {name}) => {
  const $host = getAuthHost(accessToken);
  return $host.post("/v1/timetables", {
    name,
  });
};

export const fetchTimetables = (accessToken, {parsed}) => {
  const params = {};

  if (parsed !== undefined) {
    params.parsed = parsed ? 1 : 0;
  }

  const $host = getAuthHost(accessToken);
  return $host.get("/v1/timetables", {params});
};

export const fetchGroupTimetables = (accessToken, groupId, {limit, offset}) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/groups/${groupId}/timetables`, {
    params: {limit, offset},
  });
};

export const fetchTimetable = (
  accessToken,
  timetableId,
  include = ["WeekType", "ClassTime", "Teacher", "Subject"],
) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/timetables/${timetableId}`, {
    params: {include: JSON.stringify(include)},
  });
};

export const fetchTimetableLessons = (
  accessToken,
  timetableId,
  {weekDay = ""},
) => {
  const params = {};

  if (weekDay) {
    params.weekDay = weekDay;
  }

  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/timetables/${timetableId}/lessons`, {params});
};
