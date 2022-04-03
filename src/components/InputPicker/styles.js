import {StyleSheet} from "react-native";
import {
  dangerColor,
  secondaryColor,
  lightSecondaryColor,
} from "../../styles/constants";

export default StyleSheet.create({
  label: {
    position: "absolute",
    color: secondaryColor,
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
    color: lightSecondaryColor,
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
  },
  inputError: {
    borderBottomColor: dangerColor,
  },
  disabledInput: {
    borderBottomColor: lightSecondaryColor,
  },
});
