import {useState, useEffect, useMemo} from "react";
import {View, ScrollView, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
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

  const highWeekDayLessons = useMemo(() => {
    return weekDaysWithLessons &&
      weekDaysWithLessons[currentWeekDay] &&
      weekDaysWithLessons[currentWeekDay].high
      ? weekDaysWithLessons[currentWeekDay].high
          .sort(
            (day1, day2) => day1.classTime.startTime > day2.classTime.startTime,
          )
          .map(day => {
            return (
              <View key={day.id}>
                <TimetableLesson
                  subject={day.subject}
                  teacher={day.teacher}
                  room={day.room}
                  classType={day.classType}
                  format={day.format}
                  startTime={day.classTime.startTime}
                  endTime={day.classTime.endTime}
                  style={mainStyles.mb4}
                />
              </View>
            );
          })
      : [];
  }, [weekDaysWithLessons, currentWeekDay]);

  const lowWeekDayLessons = useMemo(() => {
    return weekDaysWithLessons &&
      weekDaysWithLessons[currentWeekDay] &&
      weekDaysWithLessons[currentWeekDay].low
      ? weekDaysWithLessons[currentWeekDay].low
          .sort(
            (day1, day2) => day1.classTime.startTime > day2.classTime.startTime,
          )
          .map(day => {
            return (
              <View key={day.id}>
                <TimetableLesson
                  subject={day.subject}
                  teacher={day.teacher}
                  room={day.room}
                  classType={day.classType}
                  format={day.format}
                  startTime={day.classTime.startTime}
                  endTime={day.classTime.endTime}
                  style={mainStyles.mb4}
                />
              </View>
            );
          })
      : [];
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

          <View style={{alignItems: "center"}}>
            {weekDaysWithLessons && (
              <View>
                <Text style={styles.weekTypeText}>High week</Text>
                {highWeekDayLessons}
                <Text style={styles.weekTypeText}>Low week</Text>
                {lowWeekDayLessons}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Timetable;
