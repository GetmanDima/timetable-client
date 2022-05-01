import {useState, useEffect, useMemo} from "react";
import {View, ScrollView, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {capitalizeFirstLetter} from "../../utils";
import {getTimetableLessons} from "../../store/actions/timetableLesson";
import {Button, Loader, TimetableLesson} from "../../components";
import {weekDays} from "../../constants";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const Timetable = ({route, navigation}) => {
  const {timetable} = route.params;

  const dispatch = useDispatch();

  const {weekDaysWithLessons, loading, errors} = useSelector(state => {
    return {
      weekDaysWithLessons:
        state.timetableLesson.weekDaysWithLessons[timetable.id],
      loading: state.timetableLesson.loadings[timetable.id],
      errors: state.timetableLesson.errors[timetable.id],
    };
  });

  const [currentWeekDay, setCurrentWeekDay] = useState("monday");

  useEffect(() => {
    navigation.setOptions({
      title: `Расписание ${timetable.name}`,
    });

    if (!weekDaysWithLessons) {
      dispatch(getTimetableLessons(timetable.id));
    }
  }, []);

  const weekDayWithLessons = useMemo(() => {
    if (!weekDaysWithLessons || !weekDaysWithLessons[currentWeekDay]) {
      return [];
    }

    return Object.entries(weekDaysWithLessons[currentWeekDay])
      .sort(([weekTypeName1], [weekTypeName2]) =>
        weekTypeName1 > weekTypeName2 ? 1 : -1,
      )
      .map(([weekTypeName, lessons]) => {
        const lessonItems = lessons.map(lesson => (
          <TimetableLesson
            key={lesson.id}
            subject={lesson.subject}
            teacher={lesson.teacher}
            room={lesson.room}
            classType={lesson.classType}
            format={lesson.format}
            startTime={lesson.classTime.startTime}
            endTime={lesson.classTime.endTime}
            style={mainStyles.mb4}
          />
        ));

        return (
          <View key={weekTypeName}>
            <Text style={styles.weekTypeText}>
              {capitalizeFirstLetter(weekTypeName)}
            </Text>
            {lessonItems}
          </View>
        );
      });
  }, [weekDaysWithLessons, currentWeekDay]);

  const shortWeekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <ScrollView>
        <View style={mainStyles.container}>
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

          <View style={{alignItems: "center"}}>{weekDayWithLessons}</View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Timetable;
