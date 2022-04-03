import {getAuthHost} from "./index";

export const fetchDirections = (accessToken, departmentId, {search}) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/departments/${departmentId}/directions`, {
    params: {search},
  });
};

export const requestCreateDirection = (
  accessToken,
  departmentId,
  {name, fullName},
) => {
  const $host = getAuthHost(accessToken);
  return $host.post(`/v1/departments/${departmentId}/directions`, {
    name,
    fullName,
  });
};
