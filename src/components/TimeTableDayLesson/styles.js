import {StyleSheet} from "react-native";

export default StyleSheet.create({
  timeTableLessonBlock: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#0F2238",
    paddingLeft: 19,
    paddingRight: 11,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  notLesson: {
    width: "82%",
    height: 101,
    borderRadius: 10,
    backgroundColor: "#0F2238",
    justifyContent: "center",
    alignItems: "center"
  },
  timeTableLessonText: {
    maxWidth: 230,
    color: "#FFF"
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
    borderColor: "#1976D2",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  teacherText: {
    color: "#FFF",
  },
  room: {
    maxWidth: 80,
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 12,
    borderColor: "#1976D2",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  roomText: {
    color: "#FFF",
  },
  classTypeText: {
    color: "#FFF",
  },
  line: {
    width: 35,
    height: 1,
    backgroundColor: "#FFF",
  },
  formatText: {
    color: "#FFF",
  },
  lessonType: {
    alignItems: "center",
  },
  notLessonText: {
    color: "#FFF",
  },
  timeText: {
    color: "#FFF",
  },
  time: {
    marginBottom: 10,
  }
});
