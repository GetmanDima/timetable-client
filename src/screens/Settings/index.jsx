import {View} from "react-native";
import {useDispatch} from "react-redux";
import {logout} from "../../store/actions/auth";
import mainStyles from "../../styles/styles";
import styles from "./styles";
import {Button} from "../../components";

const Settings = () => {
  const dispatch = useDispatch();

  return (
    <View style={mainStyles.screen}>
      <View style={mainStyles.container}>
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
