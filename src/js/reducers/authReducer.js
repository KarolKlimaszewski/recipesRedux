import { FETCH_USER, SIGN_IN } from "../constants/action-types";

const initialState = {
  userLog: false,
  userID: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SIGN_IN: 
    return Object.assign({}, state, {
      userLog: action.payload.userLog,
      userID: action.payload.userID
    }) || null;
    default:
      return state;
  }
};
