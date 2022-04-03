import {useState} from "react";
import {View, Text} from "react-native";
import PropTypes from "prop-types";
import {Controller} from "react-hook-form";
import InputPicker from "../InputPicker";
import NewItemModal from "./NewItemModal";
import Button from "../Button";
import styles from "./styles";
import mainStyles from "../../styles/styles";

const InputPickerWithCreatorControl = ({
  control,
  name,
  label,
  rules,
  newItemModalHeader,
  newItemModalInputs,
  disabled,
  fetchRecommendations,
  requestCreateItem,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
              <NewItemModal
                visible={modalVisible}
                header={newItemModalHeader}
                inputs={newItemModalInputs}
                setVisible={setModalVisible}
                setValue={onChange}
                setName={setNameValue}
                requestCreateItem={requestCreateItem}
              />
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
                <View>
                  <Button
                    text="+"
                    disabled={disabled}
                    style={[mainStyles.ml3, styles.createButton]}
                    onPress={() => {
                      !disabled && setModalVisible(true);
                    }}
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

InputPickerWithCreatorControl.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rules: PropTypes.object,
  newItemModalHeader: PropTypes.string.isRequired,
  newItemModalInputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      defaultValue: PropTypes.string.isRequired,
      rules: PropTypes.object,
    }),
  ).isRequired,
  disabled: PropTypes.bool,
  fetchRecommendations: PropTypes.func.isRequired,
  requestCreateItem: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

InputPickerWithCreatorControl.defaultProps = {
  rules: {},
  disabled: false,
  style: {},
};

export default InputPickerWithCreatorControl;
