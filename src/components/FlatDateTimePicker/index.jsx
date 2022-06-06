import moment from "moment";
import {useState, useRef, useEffect} from "react";
import {Pressable, View, Text, Animated} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import PropTypes from "prop-types";
import {whiteColor, primaryColor} from "../../styles/constants";
import styles from "./styles";

const FlatDateTimePicker = ({
  value,
  label,
  invalid,
  disabled,
  mode,
  display,
  onValueChange,
  onBlur,
  style,
}) => {
  const [focus, setFocus] = useState(false);

  const defaultLabelTopPosition = 25;
  const focusedLabelTopPosition = 0;
  const defaultLabelFontSize = 18;
  const focusedLabelFontSize = 16;

  const labelTopPositionAnim = useRef(
    new Animated.Value(
      !value && !label && focus
        ? focusedLabelTopPosition
        : defaultLabelTopPosition,
    ),
  ).current;

  const labelFontSizeAnim = useRef(
    new Animated.Value(
      value || label || focus ? focusedLabelFontSize : defaultLabelFontSize,
    ),
  ).current;

  const labelColorAnim = useRef(new Animated.Value(0)).current;

  const labelColorInterpolation = useRef(
    labelColorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [whiteColor, primaryColor],
    }),
  ).current;

  const onFocusAnimate = () => {
    if (value || focus) {
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
    if (!value && !focus) {
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
    <View>
      {focus && (
        <RNDateTimePicker
          mode={mode}
          is24Hour={true}
          display={display}
          value={value ?? new Date()}
          onChange={(event, date) => {
            setFocus(false);
            onBlur();
            onValueChange(date);
          }}
        />
      )}
      <View style={[styles.inputWrapper, style]}>
        <Pressable
          onPress={() => {
            if (!disabled) {
              setFocus(true);
            }
          }}>
          <View>
            <Animated.Text
              style={[
                styles.label,
                {
                  top: labelTopPositionAnim,
                  color: labelColorInterpolation,
                  fontSize: labelFontSizeAnim,
                },
                !focus && invalid && styles.labelError,
                disabled && styles.disabledLabel,
              ]}>
              {label}
            </Animated.Text>
            <View
              style={[
                styles.input,
                focus && styles.focusedInput,
                invalid && styles.inputError,
                disabled && styles.disabledInput,
              ]}>
              <Text style={styles.inputText}>
                {value
                  ? mode === "time"
                    ? moment(value).format("HH:mm")
                    : moment(value).format("DD-MM-YYYY")
                  : ""}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

FlatDateTimePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  label: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  mode: PropTypes.oneOf(["time", "date"]),
  display: PropTypes.oneOf(["clock", "calendar"]),
  onValueChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

FlatDateTimePicker.defaultProps = {
  invalid: false,
  disabled: false,
  mode: "time",
  display: "clock",
  onBlur: () => {},
  style: {},
};

export default FlatDateTimePicker;
