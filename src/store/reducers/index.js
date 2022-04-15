import {combineReducers} from "redux";
import auth from "./auth";
import timetable from "./timetable";
import timetableLesson from "./timetableLesson";

export default combineReducers({
  auth,
  timetable,
  timetableLesson,
});
