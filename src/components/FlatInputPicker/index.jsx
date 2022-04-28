import {useState, useMemo, useRef, useEffect} from "react";
import {Pressable, View, Text, Animated} from "react-native";
import PropTypes from "prop-types";
import {whiteColor, primaryColor} from "../../styles/constants";
import styles from "./styles";
import PickerModal from "./PickerModal";

const FlatInputPicker = ({
  items,
  selectedValue,
  label,
  invalid,
  disabled,
  loading,
  onEndReachedThreshold,
  onValueChange,
  onBlur,
  onEndReached,
  modalStyle,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [focus, setFocus] = useState(false);

  const itemsWithIds = useMemo(() => {
    return items.map(item => {
      return {...item, id: JSON.stringify(item.value)};
    });
  }, [items]);

  const selectedItem = useMemo(() => {
    return (
      itemsWithIds.find(
        item => JSON.stringify(item.value) === JSON.stringify(selectedValue),
      ) || {}
    );
  }, [selectedValue]);

  const defaultLabelTopPosition = 25;
  const focusedLabelTopPosition = 0;
  const defaultLabelFontSize = 18;
  const focusedLabelFontSize = 16;

  const labelTopPositionAnim = useRef(
    new Animated.Value(
      selectedItem.value || selectedItem.label || focus
        ? focusedLabelTopPosition
        : defaultLabelTopPosition,
    ),
  ).current;

  const labelFontSizeAnim = useRef(
    new Animated.Value(
      selectedItem.value || selectedItem.label || focus
        ? focusedLabelFontSize
        : defaultLabelFontSize,
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
    if (selectedItem.value || selectedItem.label || focus) {
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
    if (!selectedItem.value && !selectedItem.label && !focus) {
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

  useEffect(() => {
    if (items.length === 0 && modalVisible) {
      onEndReached();
    }
  }, [items, modalVisible]);

  useEffect(onFocusAnimate, [focus, selectedItem]);
  useEffect(onBlurAnimate, [focus, selectedItem]);

  return (
    <View>
      <PickerModal
        items={itemsWithIds}
        visible={modalVisible}
        loading={loading}
        onEndReachedThreshold={onEndReachedThreshold}
        onValueChange={onValueChange}
        onRequestClose={() => {
          setModalVisible(false);
          setFocus(false);
          onBlur();
        }}
        onEndReached={onEndReached}
        style={modalStyle}
      />
      <View style={[styles.inputWrapper, style]}>
        <Pressable
          onPress={() => {
            if (!disabled) {
              setFocus(true);
              setModalVisible(true);
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
                invalid && styles.inputError,
                disabled && styles.disabledInput,
              ]}>
              <Text style={styles.inputText}>{selectedItem.label}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

FlatInputPicker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({label: PropTypes.string, value: PropTypes.any}),
  ).isRequired,
  selectedValue: PropTypes.any,
  label: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onEndReachedThreshold: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onEndReached: PropTypes.func,
  modalStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

FlatInputPicker.defaultProps = {
  invalid: false,
  disabled: false,
  loading: false,
  onEndReachedThreshold: 0.2,
  onBlur: () => {},
  onEndReached: () => {},
  modalStyle: {},
  style: {},
};

export default FlatInputPicker;
