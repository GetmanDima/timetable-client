import {getAuthHost} from "./index";

export const fetchTimetables = accessToken => {
  const $host = getAuthHost(accessToken);
  return $host.get("/v1/timetables");
};

export const fetchTimetableLessons = (accessToken, timetableId) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/timetables/${timetableId}/lessons`);
};
