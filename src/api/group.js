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

export const fetchGroups = (
  accessToken,
  universityId,
  {parsed, search, limit, offset} = {},
) => {
  const params = {search, limit, offset};

  if (parsed !== undefined) {
    params.parsed = parsed ? 1 : 0;
  }

  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/universities/${universityId}/groups`, {params});
};

export const requestCreateGroupInvite = (accessToken, groupId, {code}) => {
  const $host = getAuthHost(accessToken);
  return $host.post(`/v1/groups/${groupId}/invites`, {
    code,
  });
};

export const fetchGroupInvites = (accessToken, groupId) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/groups/${groupId}/invites`);
};

export const requestEditGroupInvite = (accessToken, {id, code}) => {
  const $host = getAuthHost(accessToken);
  return $host.patch(`/v1/group-invites/${id}`, {
    code,
  });
};

export const requestDeleteGroupInvite = (accessToken, {id}) => {
  const $host = getAuthHost(accessToken);
  return $host.delete(`/v1/group-invites/${id}`);
};

export const fetchGroupIdentifier = (accessToken, groupId) => {
  const $host = getAuthHost(accessToken);
  return $host.get(`/v1/groups/${groupId}/identifier`);
};
