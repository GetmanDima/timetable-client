import moment from "moment";
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
import {requestCreateClassTime} from "../../api/timetable";
import {addClassTime} from "../../store/actions/timetable";
import {
  Button,
  Loader,
  FlatTextInput,
  Modal,
  FlatDateTimePicker,
} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const CreateClassTime = ({route, navigation}) => {
  const {timetable, classTime = {}, edit = false} = route.params;

  const dispatch = useDispatch();

  const {accessToken, classTimes} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      classTimes: state.timetable.classTimes[timetable.id],
    };
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `${edit ? "Редактировать" : "Создать"} время урока: ${
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
      number: classTime.number
        ? classTime.number.toString()
        : (
            Object.entries(classTimes)
              .filter(([, classTime]) => classTime)
              .reduce((maxNumber, [, classTime]) => {
                return classTime.number > maxNumber
                  ? classTime.number
                  : maxNumber;
              }, 0) + 1
          ).toString(),
      startTime: classTime.startTime
        ? moment(classTime.startTime, "HH-mm-ss").toDate()
        : moment().set({hour: 0, minute: 0, second: 0}).toDate(),
      endTime: classTime.endTime
        ? moment(classTime.endTime, "HH-mm-ss").toDate()
        : moment().set({hour: 0, minute: 0, second: 0}).toDate(),
    },
  });

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    const newClassTime = {
      ...classTime,
      number: parseInt(data.number),
      startTime: moment(data.startTime).format("HH:mm:ss"),
      endTime: moment(data.endTime).format("HH:mm:ss"),
      timetableId: timetable.id,
    };

    if (edit) {
      requestCreateClassTime(accessToken, timetable.id, newClassTime)
        .then(res => {
          const id = getIdFromLocation(res.headers["location"]);

          dispatch(
            addClassTime(timetable.id, {
              ...newClassTime,
              id,
            }),
          );

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка редактирования времени урока"]);
        });
    } else {
      requestCreateClassTime(accessToken, timetable.id, newClassTime)
        .then(res => {
          const id = getIdFromLocation(res.headers["location"]);

          dispatch(
            addClassTime(timetable.id, {
              ...newClassTime,
              id,
            }),
          );

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка создания времени урока"]);
        });
    }
  };

  return (
    <View style={[mainStyles.screen, mainStyles.screenCenter]}>
      {loading && <Loader />}
      <Modal
        header={`${edit ? "Редактирование" : "Создание"} времени урока`}
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
                name={"number"}
                rules={{
                  required: "Необходимо заполнить",
                  min: {
                    value: 1,
                    message: "min 1",
                  },
                  max: {
                    value: 300,
                    message: "max 300",
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
                        label="Номер"
                        keyboardType="numeric"
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
                name={"startTime"}
                rules={{
                  required: "Необходимо заполнить",
                }}
                render={({field: {value, onBlur, onChange}}) => {
                  return (
                    <View>
                      <FlatDateTimePicker
                        value={value}
                        label="Начинается"
                        onValueChange={onChange}
                        onBlur={onBlur}
                        style={mainStyles.mt3}
                      />
                    </View>
                  );
                }}
              />

              <Controller
                control={control}
                name={"endTime"}
                rules={{
                  required: "Необходимо заполнить",
                }}
                render={({field: {value, onBlur, onChange}}) => {
                  return (
                    <View>
                      <FlatDateTimePicker
                        value={value}
                        label="Заканчивается"
                        onValueChange={onChange}
                        onBlur={onBlur}
                        style={mainStyles.mt3}
                      />
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

export default CreateClassTime;
