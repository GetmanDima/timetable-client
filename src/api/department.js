import {getAuthHost} from "./index";

export const fetchDepartments = (accessToken, facultyId, {search}) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/faculties/${facultyId}/departments`, {
    params: {search},
  });
};

export const requestCreateDepartment = (
  accessToken,
  facultyId,
  {name, fullName},
) => {
  console.log("faculty ID: " + facultyId);
  const $host = getAuthHost(accessToken);
  return $host.post(`/v1/faculties/${facultyId}/departments`, {
    name,
    fullName,
  });
};
