import React from "react";
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import store from "./src/store/store";
import Start from "./src/screens/Start";
import Auth from "./src/screens/Auth";
import Registration from "./src/screens/Registration";
import NewGroup from "./src/screens/NewGroup";
import Timetable from "./src/screens/Timetable";
import Timetables from "./src/screens/Timetables";
import ChooseTimetable from "./src/screens/ChooseTimetable";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="ChooseTimetable" component={ChooseTimetable} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="NewGroup" component={NewGroup} />
          <Stack.Screen name="Timetables" component={Timetables} />
          <Stack.Screen name="Timetable" component={Timetable} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
