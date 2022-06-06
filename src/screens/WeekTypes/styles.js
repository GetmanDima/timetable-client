import {StyleSheet} from "react-native";
import {lightDarkColor, textFontSize, whiteColor} from "../../styles/constants";

export default StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: textFontSize,
    color: whiteColor,
  },
  timetable: {
    marginBottom: 10,
    padding: 15,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    backgroundColor: lightDarkColor,
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
    width: 60,
    height: 60,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 50,
  },
  createButtonText: {
    fontSize: 30,
  },
  noWeekTypes: {
    marginTop: 20,
  },
  noWeekTypesText: {
    fontSize: 18,
    color: whiteColor,
  },
});
