import {useState} from "react";
import {Pressable, Text} from "react-native";
import PropTypes from "prop-types";
import {
  typesToColors,
  typesToDarkerColors,
  lightSecondaryColor,
} from "../../styles/constants";
import styles from "./styles";

const Button = ({type, text, disabled, onPress, style, ...props}) => {
  const color = typesToColors[type];
  const onPressColor = typesToDarkerColors[type];

  const [isPressed, setIsPressed] = useState(false);

  const onPressIn = () => {
    setIsPressed(true);
  };

  const onPressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.button,
        {backgroundColor: isPressed ? onPressColor : color},
        disabled && {backgroundColor: lightSecondaryColor},
        style,
      ]}
      {...props}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["dark", "secondary", "primary", "danger"]),
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

Button.defaultProps = {
  type: "primary",
  disabled: false,
  style: {},
};

export default Button;
