import {View, Text} from "react-native";
import PropTypes from "prop-types";
import {Controller} from "react-hook-form";
import FlatPicker from "../FlatPicker";
import styles from "./styles";

const FlatPickerControl = ({
  control,
  items,
  name,
  label,
  rules,
  autoFocus,
  enabled,
  onChange,
  style,
}) => {
  return (
    <View style={styles.control}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: {value, onBlur, onChange: defaultOnChange},
          fieldState: {error, invalid},
        }) => {
          return (
            <View>
              <FlatPicker
                items={items}
                value={value}
                label={label}
                invalid={invalid}
                enabled={enabled}
                autoFocus={autoFocus}
                onBlur={onBlur}
                onChange={v => {
                  onChange(v);
                  defaultOnChange(v);
                }}
                style={style}
              />
              {enabled && invalid && (
                <Text style={styles.error}>{error.message}</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

FlatPickerControl.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any,
    }),
  ).isRequired,
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
  rules: PropTypes.object,
  autoFocus: PropTypes.bool,
  enabled: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

FlatPickerControl.defaultProps = {
  value: "",
  rules: {},
  autoFocus: false,
  enabled: true,
  onChange: () => {},
  style: {},
};

export default FlatPickerControl;
