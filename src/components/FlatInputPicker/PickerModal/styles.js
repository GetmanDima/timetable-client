import {StyleSheet} from "react-native";
import {
  windowHeight,
  opacityDarkColor,
  lightDarkColor,
  lightSecondaryColor,
} from "../../../styles/constants";

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
});
