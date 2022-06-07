import {useState, useEffect} from "react";
import {View, Text, Keyboard} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getIdFromLocation} from "../../utils";
import {requestCreateSubject, requestEditSubject} from "../../api/timetable";
import {addSubject} from "../../store/actions/timetable";
import {Button, Loader, FlatTextInput, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const CreateSubject = ({route, navigation}) => {
  const {timetable, subject = {}, edit = false} = route.params;

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
      title: `${edit ? "Редактировать" : "Создать"} предмет: ${timetable.name}`,
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
      name: subject.name,
    },
  });

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    const newSubject = {
      ...subject,
      name: data.name,
      timetableId: timetable.id,
    };

    if (edit) {
      requestEditSubject(accessToken, timetable.id, newSubject)
        .then(() => {
          dispatch(addSubject(timetable.id, newSubject));

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка редактирования предмета"]);
        });
    } else {
      requestCreateSubject(accessToken, timetable.id, newSubject)
        .then(res => {
          const id = getIdFromLocation(res.headers["location"]);

          dispatch(
            addSubject(timetable.id, {
              ...newSubject,
              id,
            }),
          );

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка создания предмета"]);
        });
    }
  };

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Modal
        header={`${edit ? "Редактирование" : "Создание"} предмета`}
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

export default CreateSubject;
