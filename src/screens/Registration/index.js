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
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import {EMAIL_REGEX} from "../../constants";
import {requestRegister} from "../../api/registration";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import FlatInputControl from "../../components/FlatInputControl";
import FlatPickerControl from "../../components/FlatPickerControl";
import Button from "../../components/Button";
import mainStyles from "../../styles/styles";
import styles from "./styles";
import Link from "../../components/Link";

const RegistrationScreen = ({navigation}) => {
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
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      code: "",
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
      .catch(() => {
        setLoading(false);
        setErrors(["Ошибка регистрации"]);
        resetField("password");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={mainStyles.screen}>
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
          <ScrollView>
            <View style={styles.form}>
              <FlatPickerControl
                items={[
                  {label: "", value: null},
                  {label: "Leader", value: "leader"},
                  {label: "Student", value: "student"},
                ]}
                control={control}
                name="type"
                label="Тип пользователя"
                rules={{
                  required: "Необходимо заполнить",
                }}
                onChange={v => {
                  v === "leader"
                    ? setDisabledCode(true)
                    : setDisabledCode(false);
                }}
              />
              <FlatInputControl
                control={control}
                name="email"
                label="email"
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
                style={mainStyles.mt3}
              />
              <FlatInputControl
                control={control}
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
                name="password"
                label="Пароль"
                style={mainStyles.mt3}
              />
              <FlatInputControl
                control={control}
                rules={{
                  maxLength: {
                    value: 100,
                    message: "Максимальная длина 100",
                  },
                }}
                name="firstName"
                label="Имя"
                style={mainStyles.mt3}
              />
              <FlatInputControl
                control={control}
                rules={{
                  maxLength: {
                    value: 100,
                    message: "Максимальная длина 100",
                  },
                }}
                name="lastName"
                label="Фамилия"
                style={mainStyles.mt3}
              />
              <FlatInputControl
                control={control}
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
                name="code"
                label="Код группы"
                style={mainStyles.mt3}
                editable={!disabledCode}
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
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
