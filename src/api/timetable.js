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

export const requestCreateWeekType = (accessToken, timetableId, {name}) => {
  const $host = getAuthHost(accessToken);
  return $host.post(`/v1/timetables/${timetableId}/week-types`, {
    name,
  });
};

export const requestEditWeekType = (accessToken, timetableId, {id, name}) => {
  const $host = getAuthHost(accessToken);
  return $host.patch(`/v1/timetables/${timetableId}/week-types/${id}`, {
    name,
  });
};

export const requestDeleteWeekType = (accessToken, timetableId, {id}) => {
  const $host = getAuthHost(accessToken);
  return $host.delete(`/v1/timetables/${timetableId}/week-types/${id}`);
};

export const requestCreateTeacher = (accessToken, timetableId, {name}) => {
  const $host = getAuthHost(accessToken);
  return $host.post(`/v1/timetables/${timetableId}/teachers`, {
    name,
  });
};

export const requestEditTeacher = (accessToken, timetableId, {id, name}) => {
  const $host = getAuthHost(accessToken);
  return $host.patch(`/v1/timetables/${timetableId}/teachers/${id}`, {
    name,
  });
};

export const requestDeleteTeacher = (accessToken, timetableId, {id}) => {
  const $host = getAuthHost(accessToken);
  return $host.delete(`/v1/timetables/${timetableId}/teachers/${id}`);
};

export const requestCreateSubject = (accessToken, timetableId, {name}) => {
  const $host = getAuthHost(accessToken);
  return $host.post(`/v1/timetables/${timetableId}/subjects`, {
    name,
  });
};

export const requestEditSubject = (accessToken, timetableId, {id, name}) => {
  const $host = getAuthHost(accessToken);
  return $host.patch(`/v1/timetables/${timetableId}/subjects/${id}`, {
    name,
  });
};

export const requestDeleteSubject = (accessToken, timetableId, {id}) => {
  const $host = getAuthHost(accessToken);
  return $host.delete(`/v1/timetables/${timetableId}/subjects/${id}`);
};

export const requestCreateClassTime = (
  accessToken,
  timetableId,
  {number, startTime, endTime},
) => {
  const $host = getAuthHost(accessToken);
  return $host.post(`/v1/timetables/${timetableId}/class-times`, {
    number,
    startTime,
    endTime,
  });
};

export const requestEditClassTime = (
  accessToken,
  timetableId,
  {id, number, startTime, endTime},
) => {
  const $host = getAuthHost(accessToken);
  return $host.patch(`/v1/timetables/${timetableId}/class-times/${id}`, {
    number,
    startTime,
    endTime,
  });
};

export const requestDeleteClassTime = (accessToken, timetableId, {id}) => {
  const $host = getAuthHost(accessToken);
  return $host.delete(`/v1/timetables/${timetableId}/class-times/${id}`);
};

export const requestCreateLesson = (
  accessToken,
  timetableId,
  {
    weekDay,
    format,
    room,
    classType,
    activeFromDate,
    activeToDate,
    weekTypeId,
    classTimeId,
    subjectId,
    teacherId,
  },
) => {
  const $host = getAuthHost(accessToken);

  return $host.post(`/v1/timetables/${timetableId}/lessons`, {
    weekDay,
    format,
    room,
    classType,
    activeFromDate,
    activeToDate,
    weekTypeId,
    classTimeId,
    subjectId,
    teacherId,
  });
};

export const requestEditLesson = (
  accessToken,
  timetableId,
  {
    id,
    weekDay,
    format,
    room,
    classType,
    activeFromDate,
    activeToDate,
    weekTypeId,
    classTimeId,
    subjectId,
    teacherId,
  },
) => {
  const $host = getAuthHost(accessToken);
  return $host.patch(`/v1/timetables/${timetableId}/lessons/${id}`, {
    weekDay,
    format,
    room,
    classType,
    activeFromDate,
    activeToDate,
    weekTypeId,
    classTimeId,
    subjectId,
    teacherId,
  });
};

export const requestDeleteLesson = (accessToken, timetableId, {id}) => {
  const $host = getAuthHost(accessToken);
  return $host.delete(`/v1/timetables/${timetableId}/lessons/${id}`);
};
