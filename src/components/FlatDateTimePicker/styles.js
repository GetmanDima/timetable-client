import {StyleSheet} from "react-native";
import {
  windowHeight,
  opacityDarkColor,
  lightDarkColor,
  lightSecondaryColor,
  primaryColor,
} from "../../styles/constants";
import {
  dangerColor,
  secondaryColor,
  textFontSize,
  whiteColor,
} from "../../styles/constants";

export default StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: opacityDarkColor,
  },
  itemsWrapper: {
    width: "85%",
    maxHeight: windowHeight * 0.9,
    padding: 15,
    borderRadius: 5,
    backgroundColor: lightDarkColor,
  },
  loader: {
    textAlign: "center",
    color: lightSecondaryColor,
  },
  inputWrapper: {
    width: 300,
  },
  label: {
    position: "absolute",
    //top: 0,
    color: whiteColor,
    //fontSize: 16,
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
  focusedInput: {
    borderBottomColor: primaryColor,
  },
  inputText: {
    fontSize: textFontSize,
    color: whiteColor,
  },
});
