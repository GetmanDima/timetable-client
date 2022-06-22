import {View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/actions/auth";
import mainStyles from "../../styles/styles";
import styles from "./styles";
import {Button} from "../../components";

const Settings = ({navigation}) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => {
    return {
      user: state.auth.user,
    };
  });

  return (
    <View style={mainStyles.screen}>
      <View style={mainStyles.container}>
        {user && user.type === "leader" && (
          <Button
            onPress={() => {
              navigation.navigate("GroupInvites");
            }}
            type="dark"
            style={styles.item}
            text="Приглашения в группу"
          />
        )}
        <Button
          onPress={() => {
            navigation.navigate("Group");
          }}
          type="dark"
          style={styles.item}
          text="Группа"
        />
        <Button
          onPress={() => {
            dispatch(logout());
          }}
          type="dark"
          style={styles.item}
          text="Выход"
        />
      </View>
    </View>
  );
};

export default Settings;
