import moment from "moment";
import {useState, useEffect, useMemo} from "react";
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
import {requestCreateLesson, requestEditLesson} from "../../api/timetable";
import {
  addTimetableLesson,
  editTimetableLesson,
} from "../../store/actions/timetableLesson";
import {
  Button,
  Loader,
  FlatTextInput,
  Modal,
  FlatDateTimePicker,
  FlatInputPicker,
} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const CreateTimetableLesson = ({route, navigation}) => {
  const {timetable, lesson = {}, edit = false} = route.params;

  const dispatch = useDispatch();

  const {accessToken, weekTypes, classTimes, teachers, subjects} = useSelector(
    state => {
      return {
        accessToken: state.auth.accessToken,
        weekTypes: state.timetable.weekTypes[timetable.id],
        classTimes: state.timetable.classTimes[timetable.id],
        teachers: state.timetable.teachers[timetable.id],
        subjects: state.timetable.subjects[timetable.id],
      };
    },
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `${edit ? "Редактировать" : "Создать"} урок: ${timetable.name}`,
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
      weekDay: lesson.weekDay ?? undefined,
      format: lesson.format ?? undefined,
      room: lesson.room ?? undefined,
      classType: lesson.classType ?? undefined,
      activeFromDate: lesson.activeFromDate
        ? moment(lesson.activeFromDate, "YYYY-MM-DD").toDate()
        : undefined,
      activeToDate: lesson.activeToDate
        ? moment(lesson.activeToDate, "YYYY-MM-DD").toDate()
        : undefined,
      weekType: weekTypes ? weekTypes[lesson.weekTypeId] : undefined,
      classTime: classTimes ? classTimes[lesson.classTimeId] : undefined,
      teacher: teachers ? teachers[lesson.teacherId] : undefined,
      subject: subjects ? subjects[lesson.subjectId] : undefined,
    },
  });

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    const newLesson = {
      ...lesson,
      weekDay: data.weekDay,
      format: data.format,
      room: data.room,
      classType: data.classType,
      activeFromDate: data.activeFromDate
        ? moment(data.activeFromDate).format("YYYY-MM-DD").toString()
        : undefined,
      activeToDate: data.activeToDate
        ? moment(data.activeToDate).format("YYYY-MM-DD").toString()
        : undefined,
      weekTypeId: data.weekType ? data.weekType.id : undefined,
      classTimeId: data.classTime ? data.classTime.id : undefined,
      subjectId: data.subject ? data.subject.id : undefined,
      teacherId: data.teacher ? data.teacher.id : undefined,
      timetableId: timetable.id,
    };

    if (edit) {
      requestEditLesson(accessToken, timetable.id, newLesson)
        .then(() => {
          dispatch(editTimetableLesson(timetable.id, lesson, newLesson));

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка редактирования урока"]);
        });
    } else {
      requestCreateLesson(accessToken, timetable.id, newLesson)
        .then(res => {
          const id = getIdFromLocation(res.headers["location"]);

          dispatch(addTimetableLesson(timetable.id, {...newLesson, id}));

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка создания урока"]);
        });
    }
  };

  const weekTypeItems = useMemo(() => {
    return weekTypes
      ? Object.entries(weekTypes).map(([, weekType]) => {
          return {
            label: weekType.name,
            value: weekType,
          };
        })
      : [];
  }, [weekTypes]);

  const classTimeItems = useMemo(() => {
    return classTimes
      ? Object.entries(classTimes).map(([, classTime]) => {
          return {
            label:
              (classTime.number ?? "") +
              ") " +
              (classTime.startTime ?? "") +
              " - " +
              (classTime.endTime ?? ""),
            value: classTime,
          };
        })
      : [];
  }, [classTimes]);

  const teacherItems = useMemo(() => {
    return teachers
      ? Object.entries(teachers).map(([, teacher]) => {
          return {
            label: teacher.name ?? "",
            value: teacher,
          };
        })
      : [];
  }, [teachers]);

  const subjectItems = useMemo(() => {
    return teachers
      ? Object.entries(subjects).map(([, subject]) => {
          return {
            label: subject.name ?? "",
            value: subject,
          };
        })
      : [];
  }, [subjects]);

  return (
    <View style={[mainStyles.screen, mainStyles.screenCenter]}>
      {loading && <Loader />}
      <Modal
        header={`${edit ? "Редактирование" : "Создание"} урока`}
        body={errors.join("\n")}
        type="danger"
        visible={errorModalVisible}
        onPress={() => {
          setErrorModalVisible(false);
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={200}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={[mainStyles.container, mainStyles.form]}>
              <Controller
                control={control}
                name={"weekDay"}
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
                          {label: "Понедельник", value: "monday"},
                          {label: "Вторник", value: "tuesday"},
                          {label: "Среда", value: "wednesday"},
                          {label: "Четверг", value: "thursday"},
                          {label: "Пятница", value: "friday"},
                          {label: "Суббота", value: "saturday"},
                          {label: "Воскресенье", value: "sunday"},
                        ]}
                        selectedValue={value}
                        label="День недели"
                        invalid={invalid}
                        onValueChange={value => {
                          onChange(value);
                        }}
                        onBlur={onBlur}
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
                name={"weekType"}
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
                        items={weekTypeItems}
                        selectedValue={value}
                        label="Тип недели"
                        invalid={invalid}
                        onValueChange={value => {
                          onChange(value);
                        }}
                        onBlur={onBlur}
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
                name={"classTime"}
                render={({
                  field: {value, onBlur, onChange},
                  fieldState: {error, invalid},
                }) => {
                  return (
                    <View style={styles.control}>
                      <FlatInputPicker
                        items={classTimeItems}
                        selectedValue={value}
                        label="Номер урока"
                        invalid={invalid}
                        onValueChange={value => {
                          onChange(value);
                        }}
                        onBlur={onBlur}
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
                name={"teacher"}
                render={({
                  field: {value, onBlur, onChange},
                  fieldState: {error, invalid},
                }) => {
                  return (
                    <View style={styles.control}>
                      <FlatInputPicker
                        items={teacherItems}
                        selectedValue={value}
                        label="Учитель"
                        invalid={invalid}
                        onValueChange={value => {
                          onChange(value);
                        }}
                        onBlur={onBlur}
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
                name={"subject"}
                render={({
                  field: {value, onBlur, onChange},
                  fieldState: {error, invalid},
                }) => {
                  return (
                    <View style={styles.control}>
                      <FlatInputPicker
                        items={subjectItems}
                        selectedValue={value}
                        label="Предмет"
                        invalid={invalid}
                        onValueChange={value => {
                          onChange(value);
                        }}
                        onBlur={onBlur}
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
                name={"classType"}
                rules={{
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
                        label="Тип занятия"
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
                name={"format"}
                rules={{
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
                        label="Формат проведения"
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
                name={"room"}
                rules={{
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
                        label="Аудитория"
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
                name={"activeFromDate"}
                render={({field: {value, onBlur, onChange}}) => {
                  return (
                    <View>
                      <FlatDateTimePicker
                        value={value}
                        label="Начинается"
                        mode="date"
                        display="calendar"
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
                name={"activeToDate"}
                render={({field: {value, onBlur, onChange}}) => {
                  return (
                    <View>
                      <FlatDateTimePicker
                        value={value}
                        label="Заканчивается"
                        mode="date"
                        display="calendar"
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

export default CreateTimetableLesson;
