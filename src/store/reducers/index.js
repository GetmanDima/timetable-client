import {combineReducers} from "redux";
import auth from "./auth";
import timetable from "./timetable";

export default combineReducers({
  auth,
  timetable,
});
