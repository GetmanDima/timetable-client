import {StyleSheet} from "react-native";
import {lightColor, textFontSize} from "../../styles/constants";

export default StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: lightColor,
    fontSize: textFontSize,
    textAlign: "center",
  },
});
