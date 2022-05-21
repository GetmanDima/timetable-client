import {useState, useEffect} from "react";
import {ScrollView, View} from "react-native";
import {useSelector} from "react-redux";
import {fetchTimetables} from "../../api/timetable";
import {Button, Loader, Modal, TimetableItem} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const Timetables = ({navigation}) => {
  const {accessToken} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
    };
  });

  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchTimetables(accessToken, {parsed: false})
      .then(res => {
        setTimetables(res.data);
        setLoading(false);
      })
      .catch(() => {
        setErrors([["Ошибка при получении расписания"]]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      setErrorModalVisible(true);
    }
  }, [errors]);

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Modal
        header="Создание таблицы"
        body={errors.join("\n")}
        type="danger"
        visible={errorModalVisible}
        onPress={() => {
          setErrorModalVisible(false);
        }}
      />
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
