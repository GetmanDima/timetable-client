import {StyleSheet} from "react-native";
import {dangerColor} from "../../styles/constants";

export default StyleSheet.create({
  control: {
    width: "80%",
    paddingHorizontal: 10,
  },
  error: {
    fontSize: 16,
    color: dangerColor,
    marginTop: 10,
  },
});
