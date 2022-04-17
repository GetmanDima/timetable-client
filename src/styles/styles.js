import {StyleSheet, Dimensions} from "react-native";
import {
  darkColor,
  h1FontSize,
  opacityWhiteColor,
  primaryColor,
  secondaryColor,
  textFontSize,
  smallTextFontSize,
} from "./constants";
import marginStyles from "./marginStyles";

let windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  ...marginStyles,
  screen: {
    minHeight: "100%",
    paddingTop: 20,
    paddingBottom: 50,
    backgroundColor: darkColor,
  },
  screenCenter: {
    justifyContent: "center",
  },
  containerCenter: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  overflowScreen: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: opacityWhiteColor,
    height: windowHeight,
  },
  h1: {
    margin: 15,
    fontSize: h1FontSize,
    fontWeight: "bold",
    color: darkColor,
  },
  text: {
    fontSize: textFontSize,
    color: darkColor,
  },
  smallText: {
    fontSize: smallTextFontSize,
    color: darkColor,
  },
  textPrimary: {
    color: primaryColor,
  },
  textSecondary: {
    color: secondaryColor,
  },
});
