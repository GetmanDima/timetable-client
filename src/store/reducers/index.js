import {combineReducers} from "redux";
import auth from "./auth";
import timetable from "./timetable";
import timetableLesson from "./timetableLesson";
import group from "./group";
import app from "./app";

export default combineReducers({
  auth,
  timetable,
  timetableLesson,
  group,
  app,
});
