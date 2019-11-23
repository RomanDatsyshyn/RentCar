import isEmpty from "../validation/is-empty";
import { SET_ADMIN } from "../actions/types";

const initialState = {
  isAdminAuthenticated: false,
  admin: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN:
      return {
        ...state,
        isAdminAuthenticated: !isEmpty(action.payload),
        admin: action.payload
      };
    default:
      return state;
  }
}
