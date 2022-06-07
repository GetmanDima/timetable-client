import {useState, useEffect} from "react";
import {View, Text, Keyboard} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getIdFromLocation} from "../../utils";
import {requestCreateTeacher} from "../../api/timetable";
import {addTeacher} from "../../store/actions/timetable";
import {Button, Loader, FlatTextInput, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const CreateTeacher = ({route, navigation}) => {
  const {timetable, teacher = {}, edit = false} = route.params;

  const dispatch = useDispatch();

  const {accessToken} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
    };
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `${edit ? "Редактировать" : "Создать"} учителя: ${timetable.name}`,
    });
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      setErrorModalVisible(true);
    }
  }, [errors]);

  const {control, handleSubmit} = useForm({
    mode: "onTouched",
    defaultValues: {
      name: teacher.name,
    },
  });

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    const newTeacher = {
      ...teacher,
      name: data.name,
      timetableId: timetable.id,
    };

    if (edit) {
      requestCreateTeacher(accessToken, timetable.id, newTeacher)
        .then(() => {
          dispatch(addTeacher(timetable.id, newTeacher));

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка редактирования учителя"]);
        });
    } else {
      requestCreateTeacher(accessToken, timetable.id, newTeacher)
        .then(res => {
          const id = getIdFromLocation(res.headers["location"]);

          dispatch(
            addTeacher(timetable.id, {
              ...newTeacher,
              id,
            }),
          );

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка создания учителя"]);
        });
    }
  };

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Modal
        header="Создание учителя"
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
                    label="Имя"
                    style={mainStyles.mt3}
                  />
                  {invalid && (
                    <Text style={mainStyles.inputError}>{error.message}</Text>
                  )}
                </View>
              );
            }}
          />

          <Button
            text={edit ? "Изменить" : "Создать"}
            style={styles.submit}
            onPress={handleSubmit(onSubmit)}
            type={"primary"}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateTeacher;
