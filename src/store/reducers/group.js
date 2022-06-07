import {removeItemFromArray} from "../../utils";
import {
  SET_GROUP_INVITES,
  ADD_GROUP_INVITE,
  DELETE_GROUP_INVITE,
  SET_GROUP_IDENTIFIER,
} from "../actionTypes/group";

const initialState = {
  invites: [],
  identifier: "",
};

export default (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ADD_GROUP_INVITE:
      return {
        ...state,
        invites: [...state.invites, payload.invite],
      };
    case SET_GROUP_INVITES:
      return {
        ...state,
        invites: payload.invites,
      };
    case DELETE_GROUP_INVITE:
      return {
        ...state,
        invites: removeItemFromArray(
          state.invites,
          state.invites.findIndex(invite => invite.id === payload.invite.id),
        ),
      };
    case SET_GROUP_IDENTIFIER:
      return {
        ...state,
        identifier: payload.identifier,
      };
    default:
      return state;
  }
};
