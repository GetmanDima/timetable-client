import {StyleSheet} from "react-native";
import {textFontSize, whiteColor} from "../../styles/constants";

export default StyleSheet.create({
  container: {
    alignItems: "center",
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
  noSubjects: {
    marginTop: 20,
  },
  noSubjectsText: {
    fontSize: 18,
    color: whiteColor,
  },
  listItemText: {
    fontSize: textFontSize,
    color: whiteColor,
  },
});
