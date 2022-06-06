import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {View} from "react-native";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import ChooseTimetableNavigation from "./ChooseTimetableNavigation";
import TimetablesNavigation from "./TimetablesNavigation";
import Settings from "../screens/Settings";
import {
  darkColor,
  lightColor,
  lightDarkColor,
  secondaryColor,
  whiteColor,
} from "../styles/constants";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const routes = [
    {
      name: "TimetablesNavigation",
      component: TimetablesNavigation,
      options: {
        headerShown: false,
        tabBarIcon: ({focused}) => {
          return (
            <View>
              <MaterialCommunityIcon
                name="calendar-star"
                size={30}
                color={focused ? lightColor : secondaryColor}
              />
            </View>
          );
        },
      },
    },
    {
      name: "ChooseTimetableNavigation",
      component: ChooseTimetableNavigation,
      options: {
        headerShown: false,
        tabBarIcon: ({focused}) => {
          return (
            <View>
              <MaterialCommunityIcon
                name="calendar-search"
                size={30}
                color={focused ? lightColor : secondaryColor}
              />
            </View>
          );
        },
      },
    },
    {
      name: "Settings",
      component: Settings,
      options: {
        title: "Настройки",
        tabBarIcon: ({focused}) => {
          return (
            <View>
              <MaterialIcon
                name="settings"
                size={30}
                color={focused ? lightColor : secondaryColor}
              />
            </View>
          );
        },
      },
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: lightDarkColor},
        headerTitleStyle: {color: whiteColor},
        headerTintColor: whiteColor,
        tabBarStyle: {
          height: 50,
          borderTopWidth: 1,
          borderTopColor: darkColor,
          elevation: 0,
          backgroundColor: lightDarkColor,
        },
        tabBarShowLabel: false,
      }}>
      {routes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigation;
