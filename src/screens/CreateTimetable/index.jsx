import {useState, useEffect} from "react";
import {
  View,
  ScrollView,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useSelector} from "react-redux";
import {requestCreateTimetable} from "../../api/timetable";
import {Button, Loader, FlatTextInput, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const CreateTimetable = ({navigation}) => {
  const {accessToken} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
    };
  });

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      setErrorModalVisible(true);
    }
  }, [errors]);

  useEffect(() => {
    if (status) {
      setSuccessModalVisible(true);
    }
  }, [status]);

  const {control, handleSubmit, reset} = useForm({
    mode: "onTouched",
  });

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    requestCreateTimetable(accessToken, {name: data.name})
      .then(() => {
        setStatus(true);
        setLoading(false);
        setErrors([]);
        reset();
      })
      .catch(() => {
        setLoading(false);
        setErrors(["Ошибка создания таблицы"]);
      });
  };

  return (
    <View style={[mainStyles.screen, mainStyles.screenCenter]}>
      {loading && <Loader />}
      <Modal
        header="Создание таблицы"
        body="Таблица успешно создана"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: "Timetables"}],
          });
          setStatus(false);
          setLoading(false);
          setErrors([]);
          setSuccessModalVisible(false);
        }}
        visible={successModalVisible}
      />
      <Modal
        header="Создание таблицы"
        body={errors.join("\n")}
        type="danger"
        visible={errorModalVisible}
        onPress={() => {
          setErrorModalVisible(false);
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={[mainStyles.container, mainStyles.form]}>
              <Controller
                control={control}
                name={"name"}
                rules={{
                  required: "Необходимо заполнить",
                  minLength: {
                    value: 1,
                    message: "Минимальная длина 1",
                  },
                  maxLength: {
                    value: 100,
                    message: "Максимальная длина 100",
                  },
                }}
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
                        label="Название"
                        style={mainStyles.mt3}
                      />
                      {invalid && (
                        <Text style={mainStyles.inputError}>
                          {error.message}
                        </Text>
                      )}
                    </View>
                  );
                }}
              />

              <Button
                text={"Создать"}
                style={styles.submit}
                onPress={handleSubmit(onSubmit)}
                type={"primary"}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateTimetable;
