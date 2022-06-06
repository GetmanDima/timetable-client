import {createNativeStackNavigator} from "@react-navigation/native-stack";
import EditTimetable from "../screens/EditTimetable";
import CreateWeekType from "../screens/CreateWeekType";
import WeekTypes from "../screens/WeekTypes";
import CreateTeacher from "../screens/CreateTeacher";
import Teachers from "../screens/Teachers";
import Subjects from "../screens/Subjects";
import CreateSubject from "../screens/CreateSubject";
import ClassTimes from "../screens/ClassTimes";
import CreateClassTime from "../screens/CreateClassTime";
import {lightDarkColor, whiteColor} from "../styles/constants";
import CreateTimetableLesson from "../screens/CreateTimetableLesson";

const Stack = createNativeStackNavigator();

const EditTimetableNavigation = () => {
  const routes = [
    {
      name: "EditTimetable",
      component: EditTimetable,
      options: {
        title: "Редактировать расписание",
      },
    },
    {
      name: "CreateTimetableLesson",
      component: CreateTimetableLesson,
      options: {
        title: "Создать урок",
      },
    },
    {
      name: "WeekTypes",
      component: WeekTypes,
      options: {
        title: "Тип недели",
      },
    },
    {
      name: "CreateWeekType",
      component: CreateWeekType,
      options: {
        title: "Создать тип недели",
      },
    },
    {
      name: "Teachers",
      component: Teachers,
      options: {
        title: "Учителя",
      },
    },
    {
      name: "CreateTeacher",
      component: CreateTeacher,
      options: {
        title: "Создать учителя",
      },
    },
    {
      name: "Subjects",
      component: Subjects,
      options: {
        title: "Предметы",
      },
    },
    {
      name: "CreateSubject",
      component: CreateSubject,
      options: {
        title: "Создать предмет",
      },
    },
    {
      name: "ClassTimes",
      component: ClassTimes,
      options: {
        title: "Время уроков",
      },
    },
    {
      name: "CreateClassTime",
      component: CreateClassTime,
      options: {
        title: "Создать время урока",
      },
    },
  ];

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: lightDarkColor},
        headerTitleStyle: {color: whiteColor},
        headerTintColor: whiteColor,
      }}>
      {routes.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default EditTimetableNavigation;
