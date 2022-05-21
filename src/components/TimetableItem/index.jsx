import {View, Text, Pressable} from "react-native";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import {whiteColor} from "../../styles/constants";
import styles from "./styles";

const TimetableItem = ({timetable, onPress, style}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Pressable key={timetable.id} onPress={() => onPress(timetable)}>
        <View style={styles.content}>
          <Text style={styles.text}>{timetable.name}</Text>
          <MaterialCommunityIcon
            name="chevron-right"
            size={30}
            color={whiteColor}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default TimetableItem;
