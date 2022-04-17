import {StyleSheet} from "react-native";
import {lightColor, lightPrimaryColor} from "../../styles/constants";

export default StyleSheet.create({
  form: {
    alignItems: "center",
  },
  alternative: {
    flexDirection: "row",
    marginTop: 60,
  },
  alternativeText: {
    marginRight: 10,
    fontSize: 16,
    color: lightColor,
  },
  alternativeLink: {
    color: lightPrimaryColor,
  },
  submit: {
    marginTop: 50,
    width: 200,
  },
});
