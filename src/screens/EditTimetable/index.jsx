import "moment/locale/ru";
import moment from "moment";
import {useState, useEffect, useMemo} from "react";
import {View, ScrollView, Text} from "react-native";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import {useDispatch, useSelector} from "react-redux";
import {weekDays} from "../../constants";
import {capitalizeFirstLetter} from "../../utils";
import {requestDeleteLesson} from "../../api/timetable";
import {
  getTimetable,
  resetTimetableErrors,
} from "../../store/actions/timetable";
import {
  finishLoadingTimetableLessons,
  getTimetableLessons,
  resetTimetableLessonsErrors,
  deleteTimetableLesson,
} from "../../store/actions/timetableLesson";
import {Button, Loader, Modal, TimetableLesson} from "../../components";
import {lightColor} from "../../styles/constants";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const EditTimetable = ({route, navigation}) => {
  const {timetable: paramTimetable} = route.params;

  const dispatch = useDispatch();

  const {
    accessToken,
    timetable,
    weekTypes,
    classTimes,
    teachers,
    subjects,
    timetableLoading,
    timetableErrors,
    weekDaysWithLessons,
    lessonLoading,
    lessonErrors,
  } = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      timetable: state.timetable.timetables[paramTimetable.id],
      weekTypes: state.timetable.weekTypes[paramTimetable.id],
      classTimes: state.timetable.classTimes[paramTimetable.id],
      teachers: state.timetable.teachers[paramTimetable.id],
      subjects: state.timetable.subjects[paramTimetable.id],
      timetableLoading: state.timetable.loadings[paramTimetable.id],
      timetableErrors: state.timetable.errors[paramTimetable.id],
      weekDaysWithLessons:
        state.timetableLesson.weekDaysWithLessons[paramTimetable.id],
      lessonLoading: state.timetableLesson.loadings[paramTimetable.id],
      lessonErrors: state.timetableLesson.errors[paramTimetable.id],
    };
  });

  const [currentWeekDay, setCurrentWeekDay] = useState(
    weekDays[moment().weekday()],
  );

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `Редактировать ${paramTimetable.name}`,
    });

    if (!timetable) {
      dispatch(getTimetable(paramTimetable.id));
    }
  }, []);

  useEffect(() => {
    dispatch(finishLoadingTimetableLessons(paramTimetable.id));
    dispatch(resetTimetableLessonsErrors(paramTimetable.id));

    if (!weekDaysWithLessons || !weekDaysWithLessons[currentWeekDay]) {
      dispatch(
        getTimetableLessons(paramTimetable.id, {weekDay: currentWeekDay}),
      );
    }
  }, [currentWeekDay]);

  useEffect(() => {
    if (timetableErrors && timetableErrors.length > 0) {
      setErrorModalVisible(true);
    }
  }, [timetableErrors]);

  const weekTypesWithLessons = useMemo(() => {
    if (!weekDaysWithLessons) {
      return {};
    }

    let weekTypesWithLessons = {};

    if (weekDaysWithLessons[currentWeekDay]) {
      weekTypesWithLessons = weekDaysWithLessons[currentWeekDay].reduce(
        (res, lesson) => {
          const weekTypeLessons = res[lesson.weekTypeId] ?? [];

          return {
            ...res,
            [lesson.weekTypeId ?? 0]: [...weekTypeLessons, lesson],
          };
        },
        {},
      );
    }

    for (const weekTypeId in weekTypes) {
      if (!weekTypesWithLessons[weekTypeId]) {
        weekTypesWithLessons[weekTypeId] = [];
      }
    }

    return weekTypesWithLessons;
  }, [weekTypes, weekDaysWithLessons, currentWeekDay]);

  const deleteLesson = lesson => {
    setDeleteLoading(true);

    requestDeleteLesson(accessToken, timetable.id, lesson)
      .then(() => {
        dispatch(deleteTimetableLesson(timetable.id, lesson));
        setDeleteLoading(false);
      })
      .catch(e => {
        setDeleteLoading(false);
        console.log(e);
      });
  };

  const weekTypeItems = useMemo(() => {
    if (timetableLoading) {
      return [];
    }

    return Object.entries(weekTypesWithLessons)
      .sort(([weekTypeId1], [weekTypeId2]) => {
        if (!weekTypes[weekTypeId1] || !weekTypes[weekTypeId2]) {
          return 1;
        }

        return weekTypes[weekTypeId1].name > weekTypes[weekTypeId2].name
          ? 1
          : -1;
      })
      .map(([weekTypeId, lessons]) => {
        const lessonItems = lessons
          .sort(({classTimeId: classTimeId1}, {classTimeId: classTimeId2}) => {
            if (!classTimes[classTimeId1] || !classTimes[classTimeId2]) {
              return 1;
            }

            return classTimes[classTimeId1].startTime >
              classTimes[classTimeId2].startTime
              ? 1
              : -1;
          })
          .map(lesson => {
            return (
              <TimetableLesson
                key={lesson.id}
                subject={subjects[lesson.subjectId]}
                teacher={teachers[lesson.teacherId]}
                room={lesson.room}
                classType={lesson.classType}
                format={lesson.format}
                startTime={(classTimes[lesson.classTimeId] ?? {}).startTime}
                endTime={(classTimes[lesson.classTimeId] ?? {}).endTime}
                edit={true}
                remove={true}
                onPressEdit={() => {
                  navigation.navigate("CreateTimetableLesson", {
                    timetable,
                    lesson,
                    edit: true,
                  });
                }}
                onPressRemove={() => {
                  deleteLesson(lesson);
                }}
                style={mainStyles.mb4}
              />
            );
          });

        return (
          <View key={weekTypeId} style={styles.weekType}>
            <Text style={styles.weekTypeText}>
              {capitalizeFirstLetter(
                weekTypes[weekTypeId]
                  ? weekTypes[weekTypeId].name
                  : "Без типа недели",
              )}
            </Text>
            {lessonItems.length > 0 ? (
              lessonItems
            ) : (
              <View>
                <Text style={styles.noLessons}>Нет уроков</Text>
              </View>
            )}
            {weekTypes[weekTypeId] && (
              <Button
                text="Добавить"
                onPress={() => {
                  navigation.navigate("CreateTimetableLesson", {
                    timetable: paramTimetable,
                    lesson: {weekDay: currentWeekDay, weekTypeId: weekTypeId},
                  });
                }}
                style={styles.addLessonButton}
              />
            )}
          </View>
        );
      });
  }, [weekTypesWithLessons, timetableLoading]);

  const shortWeekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  return (
    <View style={mainStyles.screen}>
      {(timetableLoading || deleteLoading) && <Loader />}
      <Modal
        header="Получение расписания"
        body={timetableErrors ? timetableErrors.join("\n") : ""}
        type="danger"
        visible={errorModalVisible}
        onPress={() => {
          navigation.goBack();
          setErrorModalVisible(false);
          dispatch(resetTimetableErrors(paramTimetable.id));
        }}
      />

      <View style={styles.viewButtons}>
        <View style={styles.viewButtonsInner}>
          <View style={styles.viewButton}>
            <MaterialIcon.Button
              name="access-time"
              size={30}
              color={lightColor}
              iconStyle={styles.viewButtonIcon}
              backgroundColor={null}
              onPress={() => {
                navigation.navigate("ClassTimes", {timetable});
              }}
            />
            <Text style={styles.viewButtonText}>(Время уроков)</Text>
          </View>
          <View style={styles.viewButton}>
            <MaterialIcon.Button
              name="book"
              size={30}
              color={lightColor}
              iconStyle={styles.viewButtonIcon}
              backgroundColor={null}
              onPress={() => {
                navigation.navigate("Subjects", {timetable});
              }}
            />
            <Text style={styles.viewButtonText}>(Предметы)</Text>
          </View>
          <View style={styles.viewButton}>
            <MaterialIcon.Button
              name="person"
              size={30}
              color={lightColor}
              iconStyle={styles.viewButtonIcon}
              backgroundColor={null}
              onPress={() => {
                navigation.navigate("Teachers", {timetable});
              }}
            />
            <Text style={styles.viewButtonText}>(Учителя)</Text>
          </View>
          <View style={styles.viewButton}>
            <MaterialCommunityIcon.Button
              name="calendar-week"
              size={30}
              color={lightColor}
              iconStyle={styles.viewButtonIcon}
              backgroundColor={null}
              onPress={() => {
                navigation.push("WeekTypes", {timetable});
              }}
            />
            <Text style={styles.viewButtonText}>(Тип недели)</Text>
          </View>
        </View>
      </View>

      <View style={styles.weekDays}>
        {shortWeekDays.map((day, idx) => (
          <Button
            key={day}
            onPress={() => setCurrentWeekDay(weekDays[idx])}
            text={day}
            style={styles.weekDay}
            type={currentWeekDay === weekDays[idx] ? "primary" : "dark"}
          />
        ))}
      </View>

      {lessonLoading ? (
        <View style={styles.lessonLoading}>
          <Text style={styles.lessonLoadingText}>Loading...</Text>
        </View>
      ) : lessonErrors && lessonErrors.length > 0 ? (
        <View style={styles.lessonError}>
          <Text style={styles.lessonErrorText}>{lessonErrors.join("\n")}</Text>
        </View>
      ) : (
        <ScrollView style={styles.weekTypes}>
          <View style={styles.day}>{weekTypeItems}</View>
        </ScrollView>
      )}
    </View>
  );
};

export default EditTimetable;
