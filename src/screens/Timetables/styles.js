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
});
