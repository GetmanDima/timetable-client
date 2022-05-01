import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Timetables from "../screens/Timetables";
import CreateTimetable from "../screens/CreateTimetable";
import Timetable from "../screens/Timetable";
import {lightDarkColor} from "../styles/constants";

const Stack = createNativeStackNavigator();

const TimetablesNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: lightDarkColor},
        headerTitleStyle: {color: "#fff"},
        headerTintColor: "#fff",
      }}>
      <Stack.Screen
        name="Timetables"
        component={Timetables}
        options={{
          title: "Мое расписание",
        }}
      />
      <Stack.Screen
        name="CreateTimetable"
        component={CreateTimetable}
        options={{
          title: "Мое расписание",
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

export default TimetablesNavigation;
