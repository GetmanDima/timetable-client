import {useState, useEffect, useMemo} from "react";
import {View, ScrollView, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/Loader";
import {getTimetableLessons} from "../../store/actions/timetableLesson";
import {Button, TimeTableDayLesson} from "../../components";
import styles from "./styles";
import mainStyles from "../../styles/styles";
import {weekDays} from "../../constants";

const TimetableScreen = ({route, navigation}) => {
  const {timetableId} = route.params;

  const dispatch = useDispatch();

  const {weekDaysWithLessons, loading, errors} = useSelector(state => {
    return {
      weekDaysWithLessons:
        state.timetableLesson.weekDaysWithLessons[timetableId],
      loading: state.timetableLesson.loadings[timetableId],
      errors: state.timetableLesson.errors[timetableId],
    };
  });

  const [currentWeekDay, setCurrentWeekDay] = useState("monday");

  useEffect(() => {
    if (!weekDaysWithLessons) {
      dispatch(getTimetableLessons(timetableId));
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
                <TimeTableDayLesson
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
                <TimeTableDayLesson
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
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <ScrollView>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text
            style={[
              mainStyles.h1,
              mainStyles.mb5,
              {textAlign: "center", color: "#fff"},
            ]}>
            Timetable
          </Text>
          <Button
            text="To timetables"
            style={{height: 50, width: 150}}
            onPress={() => navigation.navigate("Timetables")}
          />
        </View>
        <View
          style={[{flexDirection: "row", flexWrap: "wrap"}, mainStyles.mb5]}>
          {shortWeekDays.map((day, idx) => (
            <Button
              key={day}
              onPress={() => setCurrentWeekDay(weekDays[idx])}
              text={day}
              style={{width: 50, marginHorizontal: 5}}
              type={currentWeekDay === weekDays[idx] ? "primary" : "dark"}
            />
          ))}
        </View>

        <View style={{alignItems: "center"}}>
          {weekDaysWithLessons && (
            <View style={{width: "100%", alignItems: "center"}}>
              <Text
                style={[
                  mainStyles.h1,
                  mainStyles.textSecondary,
                  mainStyles.mb4,
                ]}>
                High week
              </Text>
              {highWeekDayLessons}
              <Text
                style={[
                  mainStyles.h1,
                  mainStyles.textSecondary,
                  mainStyles.mt5,
                  mainStyles.mb4,
                ]}>
                Low week
              </Text>
              {lowWeekDayLessons}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TimetableScreen;
