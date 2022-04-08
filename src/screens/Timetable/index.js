import {useState, useEffect, useMemo} from "react";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDispatch, useSelector} from "react-redux";
import {fetchTimetables} from "../../api/timetable";
import Loader from "../../components/Loader";
import {getTimetable} from "../../store/actions/timetable";

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

  const highWeekDayItems = useMemo(() => {
    return timetableDays &&
      timetableDays[currentWeekDay] &&
      timetableDays[currentWeekDay].high
      ? timetableDays[currentWeekDay].high.map(day => {
          return (
            <View key={day.id}>
              <Text>{day.subject && day.subject.name}</Text>
            </View>
          );
        })
      : [];
  }, [timetableDays, currentWeekDay]);

  const lowWeekDayItems = useMemo(() => {
    return timetableDays &&
      timetableDays[currentWeekDay] &&
      timetableDays[currentWeekDay].low
      ? timetableDays[currentWeekDay].low.map(day => {
          return (
            <View key={day.id}>
              <Text>{day.subject && day.subject.name}</Text>
            </View>
          );
        })
      : [];
  }, [timetableDays, currentWeekDay]);

  return (
    <SafeAreaView>
      {loading && <Loader />}
      {timetableDays && (
        <View>
          <Text>High week</Text>
          {highWeekDayItems}
          <Text>Low week</Text>
          {lowWeekDayItems}
        </View>
      )}
    </SafeAreaView>
  );
};

export default TimetableScreen;
