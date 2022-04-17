import {useState} from "react";
import {View, Text} from "react-native";
import PropTypes from "prop-types";
import {Controller} from "react-hook-form";
import InputPicker from "../InputPicker";
import styles from "./styles";

const InputPickerControl = ({
  control,
  name,
  label,
  rules,
  disabled,
  fetchRecommendations,
  style,
}) => {
  const [nameValue, setNameValue] = useState("");

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
              <View style={styles.inputWrapper}>
                <View style={{flex: 1}}>
                  <InputPicker
                    value={value}
                    name={nameValue}
                    label={label}
                    invalid={invalid}
                    disabled={disabled}
                    setValue={onChange}
                    setName={setNameValue}
                    runValidation={onBlur}
                    fetchRecommendations={fetchRecommendations}
                    style={style}
                  />
                </View>
              </View>
              {invalid && <Text style={styles.error}>{error.message}</Text>}
            </View>
          );
        }}
      />
    </View>
  );
};

InputPickerControl.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rules: PropTypes.object,
  disabled: PropTypes.bool,
  fetchRecommendations: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

InputPickerControl.defaultProps = {
  rules: {},
  disabled: false,
  style: {},
};

export default InputPickerControl;
