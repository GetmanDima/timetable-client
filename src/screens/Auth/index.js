import {useState, useEffect} from "react";
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
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

const AuthScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {user, authStatus, authLoading, authErrors} = useSelector(state => {
    return {
      user: state.auth.user,
      authStatus: state.auth.status,
      authLoading: state.auth.loading,
      authErrors: state.auth.errors,
    };
  });

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (authStatus) {
        if (user.groupId) {
          navigation.reset({
            index: 0,
            routes: [{name: "Timetables"}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: "NewGroup"}],
          });
        }
      }
    }
  }, [authLoading, authStatus]);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={[mainStyles.screen, mainStyles.screenCenter]}>
          <View style={styles.form}>
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
            <View style={[styles.alternative, mainStyles.mt5]}>
              <Text style={styles.alternativeText}>Не зарегистированы?</Text>
              <Link
                to="/Registration"
                text="Зарегистрироваться"
                textStyle={styles.alternativeLink}
              />
            </View>
            <View style={[styles.alternative, mainStyles.mt2]}>
              <Text style={styles.alternativeText}>или перейти к</Text>
              <Link
                to="/ChooseTimetable"
                text="Выбору расписания"
                textStyle={styles.alternativeLink}
              />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
