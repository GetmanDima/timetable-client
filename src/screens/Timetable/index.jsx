import "moment/locale/ru";
import moment from "moment";
import {useState, useEffect, useMemo} from "react";
import {View, ScrollView, Text} from "react-native";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import {useDispatch, useSelector} from "react-redux";
import CalendarStrip from "react-native-calendar-strip";
import {weekDays} from "../../constants";
import {capitalizeFirstLetter} from "../../utils";
import {
  getTimetable,
  resetTimetableErrors,
} from "../../store/actions/timetable";
import {
  finishLoadingTimetableLessons,
  getTimetableLessons,
  resetTimetableLessonsErrors,
} from "../../store/actions/timetableLesson";
import {Loader, Modal, TimetableLesson} from "../../components";
import {whiteColor} from "../../styles/constants";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const Timetable = ({route, navigation}) => {
  const {timetable: paramTimetable} = route.params;

  const dispatch = useDispatch();

  const {
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
  const [currentDate, setCurrentDate] = useState(moment());

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `Расписание ${paramTimetable.name}`,
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
    if (!weekDaysWithLessons || !weekDaysWithLessons[currentWeekDay]) {
      return {};
    }

    return weekDaysWithLessons[currentWeekDay]
      .filter(lesson => {
        if (lesson.activeFromDate && lesson.activeToDate) {
          return (
            currentDate.isAfter(moment(lesson.activeFromDate, "YYYY-MM-DD")) &&
            currentDate.isBefore(
              moment(lesson.activeToDate, "YYYY-MM-DD").add(1, "days"),
            )
          );
        } else if (lesson.activeFromDate) {
          return currentDate.isAfter(lesson.activeFromDate);
        } else if (lesson.activeToDate) {
          return currentDate.isBefore(lesson.activeToDate);
        } else {
          return true;
        }
      })
      .reduce((weekTypes, lesson) => {
        const weekTypeLessons = weekTypes[lesson.weekTypeId]
          ? weekTypes[lesson.weekTypeId]
          : [];

        return {
          ...weekTypes,
          [lesson.weekTypeId]: [...weekTypeLessons, lesson],
        };
      }, {});
  }, [weekDaysWithLessons, currentWeekDay]);

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
                style={mainStyles.mb4}
              />
            );
          });

        return (
          <View key={weekTypeId}>
            <Text style={styles.weekTypeText}>
              {capitalizeFirstLetter(weekTypes[weekTypeId].name)}
            </Text>
            {lessonItems}
          </View>
        );
      });
  }, [weekTypesWithLessons, timetableLoading]);

  return (
    <View style={mainStyles.screen}>
      {timetableLoading && <Loader />}
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
      <View>
        <CalendarStrip
          scrollable={true}
          scrollerPaging={true}
          scrollToOnSetSelectedDate={false}
          updateWeek={true}
          minDate={moment().subtract(30, "days")}
          maxDate={moment().add(30, "days")}
          selectedDate={moment()}
          style={styles.calendar}
          calendarHeaderStyle={styles.calendarHeader}
          dateNumberStyle={styles.dateNumber}
          dateNameStyle={styles.dateName}
          highlightDateNumberStyle={styles.selectedDateNumber}
          highlightDateNameStyle={styles.selectedDateName}
          leftSelector={
            <View>
              <MaterialCommunityIcon
                name="chevron-left"
                size={30}
                color={whiteColor}
              />
            </View>
          }
          rightSelector={
            <View>
              <MaterialCommunityIcon
                name="chevron-right"
                size={30}
                color={whiteColor}
              />
            </View>
          }
          onDateSelected={date => {
            setCurrentWeekDay(weekDays[date.weekday()]);
            setCurrentDate(date);
          }}
        />
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
        <ScrollView>
          <View style={styles.day}>{weekTypeItems}</View>
        </ScrollView>
      )}
    </View>
  );
};

export default Timetable;
