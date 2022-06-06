import {StyleSheet} from "react-native";
import {
  lightColor,
  whiteColor,
  dangerColor,
  h1FontSize,
} from "../../styles/constants";

export default StyleSheet.create({
  weekDays: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  weekDay: {
    paddingHorizontal: 10,
  },
  weekTypeText: {
    marginTop: 50,
    marginBottom: 30,
    textAlign: "center",
    color: lightColor,
    fontSize: h1FontSize,
    fontWeight: "bold",
  },
  day: {
    alignItems: "center",
    marginBottom: 150,
  },
  lessonLoading: {
    alignItems: "center",
    marginTop: 50,
  },
  lessonLoadingText: {
    fontSize: h1FontSize,
    color: whiteColor,
  },
  lessonError: {
    alignItems: "center",
    marginTop: 50,
  },
  lessonErrorText: {
    fontSize: h1FontSize,
    color: dangerColor,
    textAlign: "center",
  },
  weekTypes: {
    marginBottom: 60,
  },
  weekType: {
    alignItems: "center",
  },
  noLessons: {
    color: whiteColor,
    textAlign: "center",
    fontSize: 18,
  },
  addLessonButton: {
    marginTop: 30,
    width: 130,
  },
  viewButtons: {
    alignItems: "center",
  },
  viewButtonsInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop: 20,
    width: 310,
  },
  viewButton: {
    alignItems: "center",
  },
  viewButtonText: {
    color: whiteColor,
    fontSize: 11,
  },
  viewButtonIcon: {
    marginRight: 0,
  },
});
