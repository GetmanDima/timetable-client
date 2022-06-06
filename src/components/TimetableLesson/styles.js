import {StyleSheet} from "react-native";
import {lightDarkColor, primaryColor, whiteColor} from "../../styles/constants";

export default StyleSheet.create({
  timeTableLessonBlock: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: lightDarkColor,
    paddingLeft: 19,
    paddingRight: 11,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notLesson: {
    width: "82%",
    height: 101,
    borderRadius: 10,
    backgroundColor: lightDarkColor,
    justifyContent: "center",
    alignItems: "center",
  },
  timeTableLessonText: {
    maxWidth: 230,
    color: whiteColor,
  },
  lessonInfo: {
    marginTop: 15,
    flexDirection: "row",
  },
  teacher: {
    maxWidth: 150,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    height: 30,
    borderRadius: 12,
    borderColor: primaryColor,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  teacherText: {
    color: whiteColor,
  },
  room: {
    maxWidth: 80,
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 12,
    borderColor: primaryColor,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  roomText: {
    color: whiteColor,
  },
  classTypeText: {
    color: whiteColor,
  },
  line: {
    width: 35,
    height: 1,
    backgroundColor: whiteColor,
  },
  formatText: {
    color: whiteColor,
  },
  lessonType: {
    alignItems: "center",
  },
  notLessonText: {
    color: whiteColor,
  },
  timeText: {
    color: whiteColor,
    marginRight: "auto",
  },
  time: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  icon: {
    marginRight: 0,
  },
});
