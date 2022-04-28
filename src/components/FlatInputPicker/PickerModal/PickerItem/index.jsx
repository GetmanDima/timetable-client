import {useState} from "react";
import {Pressable, Text} from "react-native";
import PropTypes from "prop-types";
import {darkColor, lightDarkColor} from "../../../../styles/constants";
import styles from "./styles";

const PickerItem = ({item, onValueChange}) => {
  const [bgColor, setBgColor] = useState(lightDarkColor);

  return (
    <Pressable
      style={[styles.item, {backgroundColor: bgColor}]}
      onPress={() => {
        onValueChange(item.value);
      }}
      onPressIn={() => setBgColor(darkColor)}
      onPressOut={() => setBgColor(lightDarkColor)}>
      <Text style={styles.itemText}>{item.label}</Text>
    </Pressable>
  );
};

PickerItem.propTypes = {
  item: PropTypes.shape({label: PropTypes.string, value: PropTypes.any})
    .isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default PickerItem;
