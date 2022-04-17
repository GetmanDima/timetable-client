import {StyleSheet} from "react-native";
import {
  blackColor,
  dangerColor,
  primaryColor,
  secondaryColor,
  lightSecondaryColor,
} from "../../styles/constants";

export default StyleSheet.create({
  label: {
    position: "absolute",
  },
  labelError: {
    color: dangerColor,
  },
  disabledLabel: {
    color: lightSecondaryColor,
  },
  pickerWrapper: {
    width: "100%",
    paddingTop: 15,
    borderBottomColor: secondaryColor,
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
    borderBottomColor: lightSecondaryColor,
    borderBottomWidth: 2,
  },
  picker: {
    width: "94%",
    marginLeft: 10,
    paddingHorizontal: 0,
    color: blackColor,
    transform: [{scaleX: 1.14}, {scaleY: 1.14}],
  },
  disabledPicker: {
    color: lightSecondaryColor,
  },
});
