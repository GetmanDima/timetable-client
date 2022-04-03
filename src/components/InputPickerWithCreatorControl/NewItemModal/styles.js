import {StyleSheet} from "react-native";
import {primaryColor, whiteColor} from "../../../styles/constants";

export default StyleSheet.create({
  modal: {
    backgroundColor: whiteColor,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    backgroundColor: primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderTopRightRadius: 0,
  },
  closeButtonText: {
    fontSize: 20,
    color: whiteColor,
  },
});
