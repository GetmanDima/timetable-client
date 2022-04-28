import {StyleSheet} from "react-native";
import {lightColor, h1FontSize} from "../../styles/constants";

export default StyleSheet.create({
  weekDays: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  weekDay: {
    paddingHorizontal: 10,
  },
  weekTypeText: {
    marginTop: 50,
    marginBottom: 30,
    textAlign: "center",
    color: lightColor,
    fontSize: h1FontSize,
    fontWeight: "bold",
  },
});
