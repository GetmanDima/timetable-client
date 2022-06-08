import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {View} from "react-native";
import {useDispatch} from "react-redux";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import {logout} from "../store/actions/auth";
import TabNavigation from "./TabNavigation";
import Start from "../screens/Start";
import Auth from "../screens/Auth";
import Registration from "../screens/Registration";
import CreateGroup from "../screens/CreateGroup";
import Timetable from "../screens/Timetable";
import ChooseTimetable from "../screens/ChooseTimetable";
import CreateUniversity from "../screens/CreateUniversity";
import {lightColor, lightDarkColor, whiteColor} from "../styles/constants";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();

  const routes = [
    {
      name: "Start",
      component: Start,
      options: {
        headerShown: false,
      },
    },
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
        headerRight: () => {
          return (
            <View>
              <MaterialIcon.Button
                onPress={() => {
                  dispatch(logout());
                }}
                iconStyle={{marginRight: 0}}
                backgroundColor={null}
                name="logout"
                size={25}
                color={lightColor}
              />
            </View>
          );
        },
      },
    },
    {
      name: "CreateUniversity",
      component: CreateUniversity,
      options: {
        title: "Создать университет",
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
