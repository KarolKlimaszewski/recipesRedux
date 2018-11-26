import { FETCH_USER, SIGN_IN } from "../constants/action-types";

export default (state = false, action) => {
  switch (action.type) {
    // case FETCH_USER:
    // console.log(action.payload)
    //   return action.payload || null;
    case SIGN_IN: 
    console.log(action.payload)
    return action.payload || null;
    default:
      return state;
  }
};
