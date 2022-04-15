import {useEffect} from "react";
import {ScrollView, View, Text, Pressable} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useSelector, useDispatch} from "react-redux";
import Loader from "../../components/Loader";
import styles from "./styles";
import mainStyles from "../../styles/styles";
import {getTimetables} from "../../store/actions/timetable";

const Timetables = ({navigation}) => {
  const dispatch = useDispatch();

  const {timetables, loading} = useSelector(state => {
    return {
      timetables: state.timetable.timetables,
      loading: state.timetable.loading,
    };
  });

  useEffect(() => {
    dispatch(getTimetables());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <ScrollView>
        <Text
          style={[
            mainStyles.h1,
            mainStyles.mb5,
            {textAlign: "center", color: "#fff"},
          ]}>
          Timetables
        </Text>
        {timetables.map(timetable => (
          <Pressable
            key={timetable.id}
            onPress={() =>
              navigation.navigate("Timetable", {timetableId: timetable.id})
            }>
            <View style={styles.timetable}>
              <Text style={styles.text}>{timetable.name}</Text>
              <Text style={styles.text}>{timetable.creationType}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Timetables;
