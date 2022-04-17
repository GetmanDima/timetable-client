import {StyleSheet} from "react-native";
import {
  dangerColor,
  secondaryColor,
  textFontSize,
  whiteColor,
} from "../../styles/constants";

export default StyleSheet.create({
  label: {
    position: "absolute",
    color: whiteColor,
  },
  filledInputLabel: {
    top: 0,
    fontSize: 16,
  },
  emptyInputLabel: {
    top: 25,
    fontSize: 18,
  },
  labelError: {
    color: dangerColor,
  },
  disabledLabel: {
    color: secondaryColor,
  },
  input: {
    width: "100%",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: whiteColor,
    paddingTop: 25,
    paddingBottom: 10,
  },
  inputError: {
    borderBottomColor: dangerColor,
  },
  disabledInput: {
    borderBottomColor: secondaryColor,
  },
  name: {
    fontSize: textFontSize,
    color: whiteColor,
  },
});
