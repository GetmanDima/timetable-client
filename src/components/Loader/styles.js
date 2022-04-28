import {StyleSheet} from "react-native";
import {primaryColor, opacityDarkColor} from "../../styles/constants";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1000,
    backgroundColor: opacityDarkColor,
  },
  inner: {
    alignItems: "center",
  },
  text: {
    color: primaryColor,
  },
});
