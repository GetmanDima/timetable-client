import {StyleSheet} from "react-native";
import {
  windowHeight,
  opacityDarkColor,
  textFontSize,
  darkColor,
  h1FontSize,
} from "../../styles/constants";

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
    width: "80%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 30,
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
    fontSize: h1FontSize,
    fontWeight: "bold",
    color: darkColor,
  },
  body: {
    textAlign: "center",
    fontSize: textFontSize,
    color: darkColor,
  },
  button: {
    marginTop: 30,
  },
});
