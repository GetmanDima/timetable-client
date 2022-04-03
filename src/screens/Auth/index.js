import {useState, useEffect} from "react";
import {View, Text, Keyboard} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/actions/auth";
import {EMAIL_REGEX} from "../../constants";
import Loader from "../../components/Loader";
import FlatInputControl from "../../components/FlatInputControl";
import Button from "../../components/Button";
import Link from "../../components/Link";
import mainStyles from "../../styles/styles";
import styles from "./styles";
import Modal from "../../components/Modal";

const AuthScreen = () => {
  const dispatch = useDispatch();

  const {authLoading, authErrors} = useSelector(state => {
    return {
      authLoading: state.auth.loading,
      authErrors: state.auth.errors,
    };
  });

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    if (authErrors.length > 0) {
      setErrorModalVisible(true);
    }
  }, [authErrors]);

  const {control, handleSubmit, resetField} = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = data => {
    Keyboard.dismiss();
    dispatch(login(data.email, data.password));
    resetField("password");
  };

  return (
    <SafeAreaView>
      <View style={mainStyles.containerCenter}>
        {authLoading && <Loader />}
        <Modal
          header="Ошибка авторизации"
          body={authErrors.join("\n")}
          type="danger"
          visible={errorModalVisible}
          onPress={() => {
            setErrorModalVisible(false);
          }}
        />
        <Text style={[mainStyles.h1, mainStyles.textPrimary, mainStyles.mb3]}>
          Log In
        </Text>
        <FlatInputControl
          control={control}
          name="email"
          label="Email"
          autoFocus={true}
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
        <Button
          text="Вход"
          style={mainStyles.mt5}
          onPress={handleSubmit(onSubmit)}
          type="primary"
        />
        <View style={[styles.registrationWrapper, mainStyles.mt5]}>
          <Text
            style={[
              mainStyles.smallText,
              mainStyles.textSecondary,
              mainStyles.mr1,
            ]}>
            Не зарегистированы?
          </Text>
          <Link to="/Registration" text="Зарегистрироваться" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
