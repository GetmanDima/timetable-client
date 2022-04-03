import {View, Text} from "react-native";
import PropTypes from "prop-types";
import {Controller} from "react-hook-form";
import FlatInput from "../FlatInput";
import styles from "./styles";

const FlatInputControl = ({
  control,
  name,
  label,
  rules,
  autoFocus,
  editable,
  style,
}) => {
  return (
    <View style={styles.control}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: {value, onBlur, onChange},
          fieldState: {error, invalid},
        }) => {
          return (
            <View>
              <FlatInput
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                invalid={invalid}
                label={label}
                autoFocus={autoFocus}
                editable={editable}
                style={style}
              />
              {editable && invalid && (
                <Text style={styles.error}>{error.message}</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

FlatInputControl.defaultProps = {
  rules: {},
  autoFocus: false,
  editable: true,
  style: {},
};

FlatInputControl.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rules: PropTypes.object,
  autoFocus: PropTypes.bool,
  editable: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default FlatInputControl;
