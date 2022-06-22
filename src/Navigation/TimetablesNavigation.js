import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import EditTimetableNavigation from "./EditTimetableNavigation";
import Timetables from "../screens/Timetables";
import CreateTimetable from "../screens/CreateTimetable";
import Timetable from "../screens/Timetable";
import {
  setEditTimetablesMode,
  setShowTimetablesMode,
} from "../store/actions/app";
import {lightColor, lightDarkColor, whiteColor} from "../styles/constants";

const Stack = createNativeStackNavigator();

const TimetablesNavigation = () => {
  const dispatch = useDispatch();
  const timetablesMode = useSelector(state => state.app.timetablesMode);

  const routes = [
    {
      name: "Timetables",
      component: Timetables,
      options: {
        title: "Мое расписание",
        headerRight: () => {
          return timetablesMode === "show" ? (
            <View>
              <MaterialIcon.Button
                onPress={() => {
                  dispatch(setEditTimetablesMode());
                }}
                iconStyle={{marginRight: 0}}
                backgroundColor={null}
                name="edit"
                size={25}
                color={lightColor}
              />
            </View>
          ) : (
            <View>
              <MaterialIcon.Button
                onPress={() => {
                  dispatch(setShowTimetablesMode());
                }}
                iconStyle={{marginRight: 0}}
                backgroundColor={null}
                name="menu"
                size={25}
                color={lightColor}
              />
            </View>
          );
        },
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
      options: ({navigation, route}) => ({
        headerRight: () => {
          return (
            <View>
              <MaterialIcon.Button
                onPress={() => {
                  navigation.navigate("EditTimetableNavigation", {
                    screen: "EditTimetable",
                    params: route.params,
                  });
                }}
                iconStyle={{marginRight: 0}}
                backgroundColor={null}
                name="edit"
                size={25}
                color={lightColor}
              />
            </View>
          );
        },
      }),
    },
    {
      name: "EditTimetableNavigation",
      component: EditTimetableNavigation,
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

export default TimetablesNavigation;
