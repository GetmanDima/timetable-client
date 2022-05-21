import {useEffect} from "react";
import {ScrollView, View} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {Button, Loader, TimetableItem} from "../../components";
import {getTimetables} from "../../store/actions/timetable";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const Timetables = ({navigation}) => {
  const dispatch = useDispatch();

  const {timetables, loading} = useSelector(state => {
    return {
      timetables: state.timetable.timetables,
      loading: state.timetable.loading,
    };
  });

  useEffect(() => {
    dispatch(getTimetables({parsed: false}));
  }, []);

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Button
        disabled={false}
        text="+"
        onPress={() => {
          navigation.navigate("CreateTimetable");
        }}
        textStyle={styles.createButtonText}
        style={styles.createButton}
      />
      <ScrollView>
        <View style={[mainStyles.container, styles.container]}>
          {timetables.map(timetable => (
            <View key={timetable.id}>
              <TimetableItem
                timetable={timetable}
                onPress={() =>
                  navigation.navigate("Timetable", {timetable: timetable})
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Timetables;
