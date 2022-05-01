import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChooseTimetable from "../screens/ChooseTimetable";
import Timetable from "../screens/Timetable";
import {lightDarkColor, whiteColor} from "../styles/constants";

const Stack = createNativeStackNavigator();

const ChooseTimetableNavigation = () => {
  const routes = [
    {
      name: "ChooseTimetable",
      component: ChooseTimetable,
      options: {
        title: "Выбрать расписание",
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

export default ChooseTimetableNavigation;
