import {View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import {useSelector} from "react-redux";
import ChooseTimetable from "../screens/ChooseTimetable";
import Timetable from "../screens/Timetable";
import {lightDarkColor, whiteColor, lightColor} from "../styles/constants";

const Stack = createNativeStackNavigator();

const ChooseTimetableNavigation = () => {
  const {authUser} = useSelector(state => {
    return {
      authUser: state.auth.user,
    };
  });

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
      options: ({navigation, route}) => ({
        headerRight: () => {
          return (
            authUser &&
            authUser.type === "admin" && (
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
            )
          );
        },
      }),
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
