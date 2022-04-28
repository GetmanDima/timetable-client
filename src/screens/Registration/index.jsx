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
import {EMAIL_REGEX} from "../../constants";
import {
  Button,
  Link,
  Loader,
  FlatTextInput,
  FlatInputPicker,
  Modal,
} from "../../components";
import {requestRegister} from "../../api/registration";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const Registration = ({navigation}) => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [disabledCode, setDisabledCode] = useState(true);
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

  const {control, handleSubmit, resetField, reset} = useForm({
    mode: "onTouched",
    defaultValues: {
      type: "leader",
    },
  });

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    requestRegister(
      data.type,
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      data.code,
    )
      .then(() => {
        setStatus(true);
        setLoading(false);
        setErrors([]);
        reset();
      })
      .catch(e => {
        console.log(e.response.data);
        setLoading(false);
        setErrors(["Ошибка регистрации"]);
        resetField("password");
      });
  };

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Modal
        header="Успешная регистрация"
        body="Вы успешно зарегистрировались"
        onPress={() => {
          navigation.navigate("Auth");
          setStatus(false);
          setLoading(false);
          setErrors([]);
          setSuccessModalVisible(false);
        }}
        visible={successModalVisible}
      />
      <Modal
        header="Ошибка регистрации"
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
                name={"university"}
                rules={{
                  required: "Необходимо выбрать",
                }}
                render={({
                  field: {value, onBlur, onChange},
                  fieldState: {error, invalid},
                }) => {
                  return (
                    <View style={styles.control}>
                      <FlatInputPicker
                        items={[
                          {label: "Староста", value: "leader"},
                          {label: "Студент", value: "student"},
                        ]}
                        selectedValue={value}
                        label="Тип пользователя"
                        invalid={invalid}
                        onValueChange={value => {
                          onChange(value);

                          if (value === "student") {
                            setDisabledCode(false);
                          } else {
                            setDisabledCode(true);
                          }
                        }}
                        onBlur={onBlur}
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

              <Controller
                control={control}
                name={"email"}
                rules={{
                  required: "Необходимо заполнить",
                  maxLength: {
                    value: 100,
                    message: "Максимальная длина 100",
                  },
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Не является email",
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
                        label="Email"
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

              <Controller
                control={control}
                name={"password"}
                rules={{
                  required: "Необходимо заполнить",
                  minLength: {
                    value: 3,
                    message: "Минимальная длина 3",
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
                        label="Пароль"
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

              <Controller
                control={control}
                name={"firstName"}
                rules={{
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
                        label="Имя"
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

              <Controller
                control={control}
                name={"lastName"}
                rules={{
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
                        label="Фамилия"
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

              <Controller
                control={control}
                name={"code"}
                rules={{
                  validate: v => {
                    if (v === "") {
                      return disabledCode ? true : "Необходимо заполнить";
                    }

                    return true;
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
                        label="Код группы"
                        editable={!disabledCode}
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
                text={"Зарегистрироваться"}
                style={styles.submit}
                onPress={handleSubmit(onSubmit)}
                type={"primary"}
              />
              <View style={styles.alternative}>
                <Text style={styles.alternativeText}>
                  Уже зарегистрированы?
                </Text>
                <Link
                  to="/Auth"
                  text="Вход"
                  textStyle={styles.alternativeLink}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Registration;
