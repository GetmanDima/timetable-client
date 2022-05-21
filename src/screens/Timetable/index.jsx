import "moment/locale/ru";
import moment from "moment";
import {useState, useEffect, useMemo} from "react";
import {View, ScrollView, Text} from "react-native";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import {useDispatch, useSelector} from "react-redux";
import CalendarStrip from "react-native-calendar-strip";
import {weekDays} from "../../constants";
import {capitalizeFirstLetter} from "../../utils";
import {getTimetableLessons} from "../../store/actions/timetableLesson";
import {Loader, TimetableLesson} from "../../components";
import {whiteColor} from "../../styles/constants";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const Timetable = ({route, navigation}) => {
  const {timetable} = route.params;

  const dispatch = useDispatch();

  const {weekDaysWithLessons, loading} = useSelector(state => {
    return {
      weekDaysWithLessons:
        state.timetableLesson.weekDaysWithLessons[timetable.id],
      loading: state.timetableLesson.loadings[timetable.id],
      errors: state.timetableLesson.errors[timetable.id],
    };
  });

  const [currentWeekDay, setCurrentWeekDay] = useState(
    weekDays[moment().weekday()],
  );

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

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
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
          onDateSelected={date => setCurrentWeekDay(weekDays[date.weekday()])}
        />
      </View>
      <ScrollView>
        <View style={styles.day}>{weekDayWithLessons}</View>
      </ScrollView>
    </View>
  );
};

export default Timetable;
