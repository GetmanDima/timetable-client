import {useState, useEffect, useMemo} from "react";
import {View, ScrollView, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {fetchTimetables} from "../../api/timetable";
import Loader from "../../components/Loader";
import {getTimetable} from "../../store/actions/timetable";
import {Button, TimeTableDayLesson} from "../../components";
import styles from "./styles"
import mainStyles from "../../styles/styles"
import {weekDays} from "../../constants";

const TimetableScreen = () => {
  const dispatch = useDispatch();

  const {accessToken, timetable, loading} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      timetable: state.timetable.timetable,
      loading: state.timetable.loading,
    };
  });

  const [currentWeekDay, setCurrentWeekDay] = useState("monday");

  useEffect(() => {
    console.log("use effect");
    fetchTimetables(accessToken)
      .then(res => {
        if (res.data.length > 0) {
          const lastTimetable = res.data[res.data.length - 1];
          dispatch(getTimetable(lastTimetable.id));
        }
      })
      .catch(e => {
        console.log(e.message);
      });
  }, []);

  const timetableDays = useMemo(() => {
    return timetable && timetable.TimetableDays
      ? timetable.TimetableDays.reduce((timetable, day) => {
          const newWeekTypeData = {
            id: day.id,
            format: day.format,
            classType: day.classType,
            room: day.room,
            classTime: day.ClassTime,
            subject: day.Subject,
            teacher: day.Teacher,
            campus: day.Campus,
          };

          const timetableWeekDay = timetable[day.weekDay]
            ? timetable[day.weekDay]
            : {};

          let newWeekType = {};

          if (day.weekDay && day.weekType) {
            if (
              timetable[day.weekDay] &&
              timetable[day.weekDay][day.weekType]
            ) {
              newWeekType = {
                [day.weekType]: [
                  ...timetable[day.weekDay][day.weekType],
                  newWeekTypeData,
                ],
              };
            } else {
              newWeekType = {
                [day.weekType]: [newWeekTypeData],
              };
            }
          }

          let newWeekDay = {};

          if (day.weekDay) {
            newWeekDay = {
              [day.weekDay]: {
                ...timetableWeekDay,
                ...newWeekType,
              },
            };
          }

          return {
            ...timetable,
            ...newWeekDay,
          };
        }, {})
      : {};
  }, [timetable]);
  console.log(timetableDays);

  const highWeekDayLessons = useMemo(() => {
    return timetableDays &&
      timetableDays[currentWeekDay] &&
      timetableDays[currentWeekDay].high
      ? timetableDays[currentWeekDay].high.map(day => {
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
  }, [timetableDays, currentWeekDay]);

  const lowWeekDayLessons = useMemo(() => {
    return timetableDays &&
      timetableDays[currentWeekDay] &&
      timetableDays[currentWeekDay].low
      ? timetableDays[currentWeekDay].low.map(day => {
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
  }, [timetableDays, currentWeekDay]);

  const shortWeekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <ScrollView>
        <View style={[{flexDirection: "row", flexWrap: "wrap"}, mainStyles.mb5]}>
          {shortWeekDays.map((day, idx) => (
            <Button key={day} onPress={() => setCurrentWeekDay(weekDays[idx])}
                    text={day} style={{width: 50, marginHorizontal: 5}}
                    type={currentWeekDay === weekDays[idx] ? "primary" : "dark"}
            />
          ))}
        </View>

        <View style={{alignItems: "center"}}>
          {timetableDays && (
            <View style={{width: "100%", alignItems: "center"}}>
              <Text style={[mainStyles.h1, mainStyles.textSecondary, mainStyles.mb4]}>High week</Text>
              {highWeekDayLessons}
              <Text style={[mainStyles.h1, mainStyles.textSecondary, mainStyles.mt5, mainStyles.mb4]}>Low week</Text>
              {lowWeekDayLessons}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TimetableScreen;
