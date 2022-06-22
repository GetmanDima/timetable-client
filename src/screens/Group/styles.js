import {StyleSheet} from "react-native";
import {
  whiteColor,
  textFontSize,
  lightPrimaryColor,
} from "../../styles/constants";

export default StyleSheet.create({
  container: {
    alignItems: "center",
  },
  noUsers: {
    marginTop: 20,
  },
  noUsersText: {
    fontSize: 18,
    color: whiteColor,
  },
  group: {
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: lightPrimaryColor,
  },
  listItemWrapper: {
    width: 300,
    marginBottom: 10,
  },
  text: {
    fontSize: textFontSize,
    color: whiteColor,
  },
  buttonWrapper: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 0,
  },
});
