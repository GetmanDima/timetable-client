import {combineReducers} from "redux";
import auth from "./auth";
import timetable from "./timetable";
import timetableLesson from "./timetableLesson";
import group from "./group";

export default combineReducers({
  auth,
  timetable,
  timetableLesson,
  group,
});
