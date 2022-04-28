import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {View} from "react-native";
import MaterialIcon from "@expo/vector-icons/MaterialCommunityIcons";
import ChooseTimetableNavigation from "./ChooseTimetableNavigation";
import TimetablesNavigation from "./TimetablesNavigation";
import {
  darkColor,
  lightColor,
  lightDarkColor,
  secondaryColor,
} from "../styles/constants";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: lightDarkColor},
        headerTitleStyle: {color: "#fff"},
        headerTintColor: "#fff",
        tabBarStyle: {
          height: 50,
          borderTopWidth: 1,
          borderTopColor: darkColor,
          elevation: 0,
          backgroundColor: lightDarkColor,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="TimetablesNavigation"
        component={TimetablesNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <MaterialIcon
                  name="calendar-star"
                  size={30}
                  color={focused ? lightColor : secondaryColor}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ChooseTimetableNavigation"
        component={ChooseTimetableNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <MaterialIcon
                  name="calendar-search"
                  size={30}
                  color={focused ? lightColor : secondaryColor}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
