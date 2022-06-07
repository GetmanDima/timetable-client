import {
  SET_GROUP_INVITES,
  ADD_GROUP_INVITE,
  DELETE_GROUP_INVITE,
  SET_GROUP_IDENTIFIER,
} from "../actionTypes/group";

export const setGroupInvites = invites => {
  return {
    type: SET_GROUP_INVITES,
    payload: {invites},
  };
};

export const addGroupInvite = invite => {
  return {
    type: ADD_GROUP_INVITE,
    payload: {invite},
  };
};

export const deleteGroupInvite = invite => {
  return {
    type: DELETE_GROUP_INVITE,
    payload: {invite},
  };
};

export const setGroupIdentifier = identifier => {
  return {
    type: SET_GROUP_IDENTIFIER,
    payload: {identifier},
  };
};
