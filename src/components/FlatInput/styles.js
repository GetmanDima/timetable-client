import {StyleSheet} from "react-native";
import {
  blackColor,
  dangerColor,
  primaryColor,
  secondaryColor,
  lightSecondaryColor,
  textFontSize,
} from "../../styles/constants";

export default StyleSheet.create({
  label: {
    position: "absolute",
  },
  disabledLabel: {
    color: lightSecondaryColor,
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
    borderBottomColor: secondaryColor,
    paddingTop: 25,
    paddingBottom: 10,
    fontSize: textFontSize,
    color: blackColor,
  },
  disabledInput: {
    borderBottomColor: lightSecondaryColor,
  },
  inputError: {
    borderBottomColor: dangerColor,
  },
  inputFocus: {
    borderBottomColor: primaryColor,
    borderBottomWidth: 3,
  },
});
