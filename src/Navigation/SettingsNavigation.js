import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "../screens/Settings";
import GroupInvites from "../screens/GroupInvites";
import CreateGroupInvite from "../screens/CreateGroupInvite";
import {lightDarkColor, whiteColor} from "../styles/constants";

const Stack = createNativeStackNavigator();

const SettingsNavigation = () => {
  const routes = [
    {
      name: "Settings",
      component: Settings,
      options: {
        title: "Настройки",
      },
    },
    {
      name: "GroupInvites",
      component: GroupInvites,
      options: {
        title: "Приглашения в группу",
      },
    },
    {
      name: "CreateGroupInvite",
      component: CreateGroupInvite,
      options: {
        title: "Создать приглашение",
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

export default SettingsNavigation;
