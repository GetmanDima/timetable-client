import {StyleSheet} from "react-native";
import {
  lightColor,
  h1FontSize,
  whiteColor,
  primaryColor,
  darkColor,
  lightDarkColor,
} from "../../styles/constants";

export default StyleSheet.create({
  calendar: {
    height: 110,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: lightDarkColor,
    borderBottomWidth: 1,
    borderBottomColor: darkColor,
  },
  calendarHeader: {
    color: whiteColor,
    fontSize: 16,
  },
  dateNumber: {
    color: whiteColor,
    fontSize: 16,
  },
  dateName: {
    color: whiteColor,
    fontSize: 10,
  },
  selectedDateNumber: {
    color: primaryColor,
    fontSize: 16,
  },
  selectedDateName: {
    color: primaryColor,
    fontSize: 10,
  },
  weekTypeText: {
    marginTop: 50,
    marginBottom: 30,
    textAlign: "center",
    color: lightColor,
    fontSize: h1FontSize,
    fontWeight: "bold",
  },
  day: {
    alignItems: "center",
    marginBottom: 150,
  },
});
