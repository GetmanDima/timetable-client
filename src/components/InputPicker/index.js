import {useState} from "react";
import {Pressable, View, Text} from "react-native";
import PropTypes from "prop-types";
import InputPickerModal from "./InputPickerModal";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const InputPicker = ({
  value,
  name,
  label,
  invalid,
  disabled,
  setValue,
  setName,
  runValidation,
  fetchRecommendations,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <InputPickerModal
        visible={modalVisible}
        value={value}
        name={name}
        label={label}
        setVisible={setModalVisible}
        setValue={setValue}
        setName={setName}
        runValidation={runValidation}
        fetchRecommendations={fetchRecommendations}
      />
      <View style={style}>
        <Pressable
          onPress={() => {
            !disabled && setModalVisible(true);
          }}>
          <View>
            <Text
              style={[
                styles.label,
                name === "" ? styles.emptyInputLabel : styles.filledInputLabel,
                invalid && styles.labelError,
                disabled && styles.disabledLabel,
              ]}>
              {label}
            </Text>
            <View
              style={[
                styles.input,
                invalid && styles.inputError,
                disabled && styles.disabledInput,
              ]}>
              <Text style={mainStyles.text}>{name}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

InputPicker.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  runValidation: PropTypes.func,
  fetchRecommendations: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

InputPicker.defaultProps = {
  invalid: false,
  disabled: false,
  runValidation: () => {},
  style: {},
};

export default InputPicker;
