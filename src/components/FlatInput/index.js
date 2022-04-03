import {useRef, useState} from "react";
import {TextInput, View, Animated} from "react-native";
import PropTypes from "prop-types";
import {primaryColor, secondaryColor} from "../../styles/constants";
import styles from "./styles";

const FlatInput = ({
  value,
  label,
  invalid,
  autoFocus,
  editable,
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
          !editable && styles.disabledLabel,
        ]}>
        {label}
      </Animated.Text>
      <TextInput
        value={value}
        style={[
          styles.input,
          invalid && styles.inputError,
          focus && styles.inputFocus,
          !editable && styles.disabledInput,
        ]}
        onFocus={onFocusAnimate}
        onBlur={() => {
          onBlurAnimate();
          onBlur();
        }}
        onChangeText={onChange}
        autoFocus={autoFocus}
        blurOnSubmit={true}
        editable={editable}
      />
    </View>
  );
};

FlatInput.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  autoFocus: PropTypes.bool,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

FlatInput.defaultProps = {
  invalid: false,
  autoFocus: false,
  editable: true,
  onChange: () => {},
  onBlur: () => {},
  style: {},
};

export default FlatInput;
