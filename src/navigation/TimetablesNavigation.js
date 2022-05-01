import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Timetables from "../screens/Timetables";
import CreateTimetable from "../screens/CreateTimetable";
import Timetable from "../screens/Timetable";
import {lightDarkColor, whiteColor} from "../styles/constants";

const Stack = createNativeStackNavigator();

const TimetablesNavigation = () => {
  const routes = [
    {
      name: "Timetables",
      component: Timetables,
      options: {
        title: "Мое расписание",
      },
    },
    {
      name: "CreateTimetable",
      component: CreateTimetable,
      options: {
        title: "Создать расписание",
      },
    },
    {
      name: "Timetable",
      component: Timetable,
      options: {
        title: "Расписание",
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

export default TimetablesNavigation;
