import {StyleSheet} from "react-native";
import {
  dangerColor,
  lightColor,
  lightPrimaryColor,
} from "../../styles/constants";

export default StyleSheet.create({
  form: {
    alignItems: "center",
  },
  error: {
    fontSize: 16,
    color: dangerColor,
    marginTop: 10,
  },
  alternative: {
    flexDirection: "row",
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
