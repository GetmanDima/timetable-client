import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import store from "./src/store/store";
import TabNavigation from "./src/navigation/TabNavigation";
import Auth from "./src/screens/Auth";
import Registration from "./src/screens/Registration";
import CreateGroup from "./src/screens/CreateGroup";
import Timetable from "./src/screens/Timetable";
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
            name="Timetable"
            component={Timetable}
            options={{title: "Расписание"}}
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
            name="CreateGroup"
            component={CreateGroup}
            options={{title: "Создать группу"}}
          />
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
