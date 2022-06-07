import {useState, useEffect} from "react";
import {View, Text, Keyboard} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/actions/auth";
import {EMAIL_REGEX} from "../../constants";
import {Button, Link, Loader, FlatTextInput, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const Auth = ({navigation}) => {
  const dispatch = useDispatch();

  const {authStatus, authLoading, authErrors} = useSelector(state => {
    return {
      authStatus: state.auth.status,
      authLoading: state.auth.loading,
      authErrors: state.auth.errors,
    };
  });

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    if (authStatus) {
      navigation.reset({
        index: 0,
        routes: [{name: "Start"}],
      });
    }
  }, [authStatus]);

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
    <View style={mainStyles.screen}>
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
      <KeyboardAwareScrollView
        contentContainerStyle={mainStyles.keyboardAwareContent}>
        <View style={[mainStyles.container, mainStyles.form]}>
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
                    label={"Email"}
                    autoFocus={true}
                  />
                  {invalid && (
                    <Text style={mainStyles.inputError}>{error.message}</Text>
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
                <View style={mainStyles.mt3}>
                  <FlatTextInput
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    invalid={invalid}
                    label={"Password"}
                  />
                  {invalid && (
                    <Text style={mainStyles.inputError}>{error.message}</Text>
                  )}
                </View>
              );
            }}
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
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Auth;
