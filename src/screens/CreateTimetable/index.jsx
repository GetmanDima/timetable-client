import {useState, useEffect} from "react";
import {View, Text, Keyboard} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import {useForm, Controller} from "react-hook-form";
import {useSelector} from "react-redux";
import {requestCreateTimetable} from "../../api/timetable";
import {
  Button,
  Loader,
  FlatTextInput,
  FlatInputPicker,
  Modal,
} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const CreateTimetable = ({navigation}) => {
  const {accessToken, user} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      user: state.auth.user,
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
    defaultValues: {
      target: "personal",
    },
  });

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    requestCreateTimetable(accessToken, data)
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
    <View style={mainStyles.screen}>
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
      <KeyboardAwareScrollView
        contentContainerStyle={mainStyles.keyboardAwareContent}>
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
                    <Text style={mainStyles.inputError}>{error.message}</Text>
                  )}
                </View>
              );
            }}
          />

          {user && user.type === "leader" && (
            <Controller
              control={control}
              name={"target"}
              rules={{
                required: "Необходимо заполнить",
              }}
              render={({
                field: {value, onBlur, onChange},
                fieldState: {error, invalid},
              }) => {
                return (
                  <View>
                    <FlatInputPicker
                      items={[
                        {label: "Для себя", value: "personal"},
                        {label: "Для группы", value: "group"},
                      ]}
                      selectedValue={value}
                      label="Для кого"
                      invalid={invalid}
                      onValueChange={value => {
                        onChange(value);
                      }}
                      onBlur={onBlur}
                      style={mainStyles.mt3}
                    />
                    {invalid && (
                      <Text style={mainStyles.inputError}>{error.message}</Text>
                    )}
                  </View>
                );
              }}
            />
          )}

          <Button
            text={"Создать"}
            style={styles.submit}
            onPress={handleSubmit(onSubmit)}
            type={"primary"}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateTimetable;
