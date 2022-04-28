import {StyleSheet} from "react-native";
import {darkColor, dangerColor} from "./constants";
import marginStyles from "./marginStyles";

export default StyleSheet.create({
  ...marginStyles,
  screen: {
    minHeight: "100%",
    backgroundColor: darkColor,
  },
  screenCenter: {
    justifyContent: "center",
  },
  container: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  containerCenter: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  inputError: {
    fontSize: 16,
    color: dangerColor,
    marginTop: 10,
  },
});
