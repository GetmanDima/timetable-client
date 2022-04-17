import {StyleSheet} from "react-native";
import {primaryColor, whiteColor} from "../../../../styles/constants";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  item: {
    padding: 10,
    marginBottom: 15,
    borderColor: primaryColor,
    borderWidth: 2,
    borderRadius: 5,
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    color: whiteColor,
  },
});
