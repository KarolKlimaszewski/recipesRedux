import { combineReducers } from "redux";

import data from "./dataReducer";
import main from "./mainReducer";
import auth from "./authReducer";
export default combineReducers({
  main,
  data,
  auth
});
