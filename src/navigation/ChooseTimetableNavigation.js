import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChooseTimetable from "../screens/ChooseTimetable";
import Timetable from "../screens/Timetable";
import {lightDarkColor} from "../styles/constants";

const Stack = createNativeStackNavigator();

const ChooseTimetableNavigation = () => {
  return (
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
    </Stack.Navigator>
  );
};

export default ChooseTimetableNavigation;
