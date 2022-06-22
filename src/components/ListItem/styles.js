import {StyleSheet} from "react-native";
import {lightDarkColor} from "../../styles/constants";

export default StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  content: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: lightDarkColor,
  },
  left: {
    marginRight: "auto",
    maxWidth: 190,
  },
});
