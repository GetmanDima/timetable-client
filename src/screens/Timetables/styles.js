import {StyleSheet} from "react-native";
import {textFontSize} from "../../styles/constants";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#081320",
  },
  text: {
    fontSize: textFontSize,
    color: "#fff",
  },
  timetable: {
    marginBottom: 10,
    padding: 15,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#0F2238",
  },
});
