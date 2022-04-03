import {StyleSheet} from "react-native";
import {
  primaryColor,
  lightPrimaryColor,
} from "../../../styles/constants";

export default StyleSheet.create({
  inputFocus: {
    borderBottomColor: primaryColor,
    borderBottomWidth: 3,
  },
  modalWrapper: {
    justifyContent: "flex-start",
  },
  modal: {
    width: "90%",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: lightPrimaryColor,
    borderRadius: 5,
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  confirmButton: {
    width: 60,
    marginLeft: 20,
  },
  recommendationWrapper: {
    width: "100%",
    height: "80%",
  },
});
