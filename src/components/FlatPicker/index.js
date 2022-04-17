import {useRef, useState, useEffect, useMemo} from "react";
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
  enabled,
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

  const selectedItemLabel = useMemo(() => {
    const selectedItem = items.find(item => item.value === value);

    if (selectedItem) {
      return selectedItem.label;
    }

    return "";
  }, [value]);

  const labelTopPositionAnim = useRef(
    new Animated.Value(
      value || selectedItemLabel || focus
        ? focusedLabelTopPosition
        : defaultLabelTopPosition,
    ),
  ).current;

  const labelFontSizeAnim = useRef(
    new Animated.Value(
      value || selectedItemLabel || focus
        ? focusedLabelFontSize
        : defaultLabelFontSize,
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
    if (value || selectedItemLabel || focus) {
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
    }

    if (focus) {
      Animated.timing(labelColorAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const onBlurAnimate = () => {
    if (!value && !selectedItemLabel && !focus) {
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

    if (!focus) {
      Animated.timing(labelColorAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(onFocusAnimate, [focus, value]);
  useEffect(onBlurAnimate, [focus, value]);

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
          !enabled && styles.disabledLabel,
        ]}>
        {label}
      </Animated.Text>
      <View
        style={[
          styles.pickerWrapper,
          invalid && styles.pickerWrapperError,
          focus && styles.pickerWrapperFocus,
          !enabled && styles.disabledPickerWrapper,
        ]}>
        <Picker
          //value={value}
          selectedValue={value}
          enabled={enabled}
          style={[styles.picker, !enabled && styles.disabledPicker]}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            onBlur();
            setFocus(false);
          }}
          onValueChange={onChange}
          autoFocus={autoFocus}
          blurOnSubmit={true}>
          {items.map(item => (
            <Picker.Item
              key={
                item.value === null || item.value === undefined
                  ? null
                  : item.value
              }
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
      value: PropTypes.any,
    }),
  ).isRequired,
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  enabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
};

FlatPicker.defaultProps = {
  value: null,
  invalid: false,
  enabled: true,
  autoFocus: false,
  onChange: () => {},
  onBlur: () => {},
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default FlatPicker;
