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
import {useDispatch, useSelector} from "react-redux";
import {getIdFromLocation} from "../../utils";
import {requestCreateWeekType, requestEditWeekType} from "../../api/timetable";
import {addWeekType} from "../../store/actions/timetable";
import {Button, Loader, FlatTextInput, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const CreateWeekType = ({route, navigation}) => {
  const {timetable, weekType = {}, edit = false} = route.params;

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
      title: `${edit ? "Редактировать" : "Создать"} тип недели: ${
        timetable.name
      }`,
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
      name: weekType.name,
    },
  });

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    const newWeekType = {
      ...weekType,
      name: data.name,
      timetableId: timetable.id,
    };

    if (edit) {
      requestEditWeekType(accessToken, timetable.id, newWeekType)
        .then(() => {
          dispatch(addWeekType(timetable.id, newWeekType));

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка редактирования типа недели"]);
        });
    } else {
      requestCreateWeekType(accessToken, timetable.id, newWeekType)
        .then(res => {
          const id = getIdFromLocation(res.headers["location"]);
          dispatch(
            addWeekType(timetable.id, {
              ...newWeekType,
              id,
            }),
          );

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка создания типа недели"]);
        });
    }
  };

  return (
    <View style={[mainStyles.screen, mainStyles.screenCenter]}>
      {loading && <Loader />}
      <Modal
        header="Создание типа недели"
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
                text={edit ? "Изменить" : "Создать"}
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

export default CreateWeekType;
