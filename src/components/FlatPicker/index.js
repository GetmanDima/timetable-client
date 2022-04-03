import {useRef, useState} from "react";
import {View, Animated} from "react-native";
import PropTypes from "prop-types";
import {Picker} from "@react-native-picker/picker";
import {primaryColor, secondaryColor} from "../../styles/constants";
import styles from "./styles";

const FlatPicker = ({
  items,
  value,
  label,
  invalid,
  autoFocus,
  onChange,
  onBlur,
  style,
}) => {
  const [focus, setFocus] = useState(autoFocus);

  const defaultLabelTopPosition = 25;
  const focusedLabelTopPosition = 0;
  const defaultLabelFontSize = 18;
  const focusedLabelFontSize = 16;

  const labelTopPositionAnim = useRef(
    new Animated.Value(
      value === "" ? defaultLabelTopPosition : focusedLabelTopPosition,
    ),
  ).current;
  const labelFontSizeAnim = useRef(
    new Animated.Value(
      value === "" ? defaultLabelFontSize : focusedLabelFontSize,
    ),
  ).current;
  const labelColorAnim = useRef(new Animated.Value(0)).current;

  const labelColorInterpolation = useRef(
    labelColorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [secondaryColor, primaryColor],
    }),
  ).current;

  const onFocusAnimate = () => {
    setFocus(true);

    Animated.timing(labelTopPositionAnim, {
      toValue: focusedLabelTopPosition,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(labelFontSizeAnim, {
      toValue: focusedLabelFontSize,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(labelColorAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const onBlurAnimate = () => {
    setFocus(false);

    if (value === "") {
      Animated.timing(labelTopPositionAnim, {
        toValue: defaultLabelTopPosition,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(labelFontSizeAnim, {
        toValue: defaultLabelFontSize,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(labelColorAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={style}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelTopPositionAnim,
            color: labelColorInterpolation,
            fontSize: labelFontSizeAnim,
          },
          !focus && invalid && styles.labelError,
        ]}>
        {label}
      </Animated.Text>
      <View
        style={[
          styles.pickerWrapper,
          invalid && styles.pickerWrapperError,
          focus && styles.pickerWrapperFocus,
        ]}>
        <Picker
          selectedValue={value}
          style={styles.picker}
          onFocus={onFocusAnimate}
          onBlur={() => {
            onBlurAnimate();
            onBlur();
          }}
          onValueChange={onChange}
          autoFocus={autoFocus}
          blurOnSubmit={true}>
          {items.map(item => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

FlatPicker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
};

FlatPicker.defaultProps = {
  invalid: false,
  autoFocus: false,
  onChange: () => {},
  onBlur: () => {},
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default FlatPicker;
