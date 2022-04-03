import {StyleSheet} from "react-native";
import {
  blackColor,
  dangerColor,
  primaryColor,
  secondaryColor,
} from "../../styles/constants";

export default StyleSheet.create({
  label: {
    position: "absolute",
  },
  labelError: {
    color: dangerColor,
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
  picker: {
    width: "94%",
    marginLeft: 10,
    paddingHorizontal: 0,
    color: blackColor,
    transform: [{scaleX: 1.14}, {scaleY: 1.14}],
  },
});
