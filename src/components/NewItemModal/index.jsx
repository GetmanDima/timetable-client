import {useState, useRef} from "react";
import {View, Modal, Text, Keyboard, Pressable, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import PropTypes from "prop-types";
import {useForm, Controller} from "react-hook-form";
import {getIdFromLocation} from "../../utils";
import Button from "../Button";
import Loader from "../Loader";
import FlatTextInput from "../FlatTextInput";
import styles from "./styles";

const NewItemModal = ({
  visible,
  header,
  inputs,
  setVisible,
  setValue,
  requestCreateItem,
  style,
}) => {
  const [loading, setLoading] = useState(false);

  const defaultValues = useRef(
    inputs.reduce((values, input) => {
      return {...values, [input.name]: input.defaultValue};
    }, {}),
  ).current;

  const {control, getValues, handleSubmit} = useForm({
    mode: "onTouched",
    defaultValues,
  });

  const flatInputs = useRef(
    inputs.map(input => (
      <Controller
        control={control}
        key={input.name}
        name={input.name}
        rules={input.rules}
        render={({
          field: {value, onBlur, onChange},
          fieldState: {error, invalid},
        }) => {
          return (
            <View>
              <FlatTextInput
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                invalid={invalid}
                label={input.label}
                style={styles.input}
              />
              {invalid && <Text style={styles.error}>{error.message}</Text>}
            </View>
          );
        }}
      />
    )),
  ).current;

  const onSubmit = data => {
    setLoading(true);

    requestCreateItem(
      inputs.reduce((values, input) => {
        return {...values, [input.name]: data[input.name]};
      }, {}),
    )
      .then(res => {
        if (res.status === 201) {
          const id = getIdFromLocation(res.headers["location"]);

          setValue({id, ...getValues(), modalCreatedAt: Date.now()});
        }

        setLoading(false);
        setVisible(false);
      })
      .catch(e => {
        console.warn(e.response.data);
        setLoading(false);
        setVisible(false);
      });

    Keyboard.dismiss();
  };

  return (
    <SafeAreaView>
      {loading && <Loader />}
      <View style={style}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setVisible(!visible);
          }}>
          <View style={styles.modal}>
            <ScrollView style={{width: "100%"}}>
              <View style={styles.form}>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setVisible(false)}>
                  <Text style={styles.closeButtonText}>X</Text>
                </Pressable>
                <Text style={styles.header}>{header}</Text>
                {flatInputs}
                <Button
                  text={"Добавить"}
                  style={styles.button}
                  onPress={handleSubmit(onSubmit)}
                  type={"primary"}
                />
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

NewItemModal.propTypes = {
  visible: PropTypes.bool,
  header: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      defaultValue: PropTypes.string,
      rules: PropTypes.object,
    }),
  ).isRequired,
  setVisible: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  requestCreateItem: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

NewItemModal.defaultProps = {
  visible: true,
  setVisible: () => {},
  style: {},
};

export default NewItemModal;
