import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import store from "./src/store/store";
import Auth from "./src/screens/Auth";
import Registration from "./src/screens/Registration";
import NewGroup from "./src/screens/NewGroup";
import Timetable from "./src/screens/Timetable";
import Timetables from "./src/screens/Timetables";
import ChooseTimetable from "./src/screens/ChooseTimetable";
import {lightDarkColor} from "./src/styles/constants";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: lightDarkColor},
            headerTitleStyle: {color: "#fff"},
            headerTintColor: "#fff",
          }}>
          <Stack.Screen
            name="ChooseTimetable"
            component={ChooseTimetable}
            options={{
              title: "Выбрать расписание",
            }}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{title: "Авторизация"}}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{title: "Регистрация"}}
          />
          <Stack.Screen
            name="NewGroup"
            component={NewGroup}
            options={{title: "Создать группу"}}
          />
          <Stack.Screen
            name="Timetables"
            component={Timetables}
            options={{title: "Мои расписания"}}
          />
          <Stack.Screen
            name="Timetable"
            component={Timetable}
            options={{title: "Расписание"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
