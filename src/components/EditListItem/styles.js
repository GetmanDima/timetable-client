import {StyleSheet} from "react-native";
import {lightDarkColor, textFontSize, whiteColor} from "../../styles/constants";

export default StyleSheet.create({
  wrapper: {
    width: 300,
    marginBottom: 10,
  },
  content: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: lightDarkColor,
  },
  text: {
    marginRight: "auto",
    fontSize: textFontSize,
    color: whiteColor,
  },
  icon: {
    marginRight: 0,
  },
});
