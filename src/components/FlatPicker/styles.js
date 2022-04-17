import {StyleSheet} from "react-native";
import {
  dangerColor,
  primaryColor,
  secondaryColor,
  whiteColor,
} from "../../styles/constants";

export default StyleSheet.create({
  label: {
    position: "absolute",
  },
  labelError: {
    color: dangerColor,
  },
  disabledLabel: {
    color: secondaryColor,
  },
  pickerWrapper: {
    width: "100%",
    paddingTop: 15,
    borderBottomColor: whiteColor,
    borderBottomWidth: 2,
  },
  pickerWrapperError: {
    borderBottomColor: dangerColor,
  },
  pickerWrapperFocus: {
    borderBottomColor: primaryColor,
    borderBottomWidth: 3,
  },
  disabledPickerWrapper: {
    borderBottomColor: secondaryColor,
    borderBottomWidth: 2,
  },
  picker: {
    width: "94%",
    marginLeft: 10,
    paddingHorizontal: 0,
    color: whiteColor,
    transform: [{scaleX: 1.14}, {scaleY: 1.14}],
  },
  disabledPicker: {
    color: secondaryColor,
  },
});
