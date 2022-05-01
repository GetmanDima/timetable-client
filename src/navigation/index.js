import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import Auth from "../screens/Auth";
import Registration from "../screens/Registration";
import CreateGroup from "../screens/CreateGroup";
import Timetable from "../screens/Timetable";
import ChooseTimetable from "../screens/ChooseTimetable";
import {lightDarkColor, whiteColor} from "../styles/constants";

const Stack = createNativeStackNavigator();

const Navigation = () => {
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
    {
      name: "Auth",
      component: Auth,
      options: {
        title: "Авторизация",
      },
    },
    {
      name: "Registration",
      component: Registration,
      options: {
        title: "Регистрация",
      },
    },
    {
      name: "CreateGroup",
      component: CreateGroup,
      options: {
        title: "Создать группу",
      },
    },
    {
      name: "TabNavigation",
      component: TabNavigation,
      options: {
        headerShown: false,
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

export default Navigation;
