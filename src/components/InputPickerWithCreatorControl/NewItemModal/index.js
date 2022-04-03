import {useState, useRef} from "react";
import {View, Modal, Text, Keyboard, Pressable, ScrollView} from "react-native";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import Button from "../../Button";
import FlatInputControl from "../../FlatInputControl";
import styles from "./styles";
import mainStyles from "../../../styles/styles";
import Loader from "../../Loader";

const NewItemModal = ({
  visible,
  header,
  inputs,
  setVisible,
  setValue,
  setName,
  requestCreateItem,
  style,
}) => {
  const [loading, setLoading] = useState(false);

  const defaultValues = useRef(
    inputs.reduce((values, input) => {
      return {...values, [input.name]: input.defaultValue};
    }, {}),
  ).current;

  const {control, handleSubmit} = useForm({
    mode: "onTouched",
    defaultValues,
  });

  const flatInputControls = useRef(
    inputs.map(input => (
      <FlatInputControl
        control={control}
        key={input.name}
        name={input.name}
        label={input.label}
        autoFocus={false}
        rules={input.rules}
        style={mainStyles.mt3}
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
          const newUniversityId = res.headers["location"]
            .split("/")
            .slice(-1)[0];

          setName(data.name);
          setValue(newUniversityId);
        }

        setLoading(false);
        setVisible(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
        setVisible(false);
      });

    Keyboard.dismiss();
  };

  return (
    <View>
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
              <View style={{alignItems: "center"}}>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setVisible(false)}>
                  <Text style={styles.closeButtonText}>X</Text>
                </Pressable>
                <Text
                  style={[
                    mainStyles.h1,
                    mainStyles.textPrimary,
                    mainStyles.mb3,
                    mainStyles.mt5,
                  ]}>
                  {header}
                </Text>
                {flatInputControls}
                <Button
                  text={"Добавить"}
                  style={mainStyles.mt5}
                  onPress={handleSubmit(onSubmit)}
                  type={"primary"}
                />
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </View>
  );
};

NewItemModal.propTypes = {
  visible: PropTypes.bool,
  header: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      defaultValue: PropTypes.string.isRequired,
      rules: PropTypes.object,
    }),
  ).isRequired,
  setVisible: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
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
