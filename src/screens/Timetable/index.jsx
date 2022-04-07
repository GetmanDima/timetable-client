import {View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TimeTableDayLesson } from "../../components/"

import mainStyles from "../../styles/styles";
import styles from "./styles"

const TimetableScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={mainStyles.containerCenter}>
        <TimeTableDayLesson />
      </View>
    </SafeAreaView>
  );
};

export default TimetableScreen;
