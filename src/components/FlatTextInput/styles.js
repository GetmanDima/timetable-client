import {StyleSheet} from "react-native";
import {
  dangerColor,
  primaryColor,
  secondaryColor,
  textFontSize,
  whiteColor,
} from "../../styles/constants";

export default StyleSheet.create({
  inputWrapper: {
    width: 300,
  },
  label: {
    position: "absolute",
  },
  disabledLabel: {
    color: secondaryColor,
  },
  labelError: {
    color: dangerColor,
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
    fontSize: textFontSize,
    color: whiteColor,
  },
  disabledInput: {
    borderBottomColor: secondaryColor,
  },
  inputError: {
    borderBottomColor: dangerColor,
  },
  inputFocus: {
    borderBottomColor: primaryColor,
    borderBottomWidth: 3,
  },
});
