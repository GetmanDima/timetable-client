import {useEffect} from "react";
import {ScrollView, View, Text, Pressable} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {Button, Loader} from "../../components";
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
            <Pressable
              key={timetable.id}
              onPress={() =>
                navigation.navigate("Timetable", {timetable: timetable})
              }>
              <View style={styles.timetable}>
                <Text style={styles.text}>{timetable.name}</Text>
                <Text style={styles.text}>{timetable.creationType}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Timetables;
