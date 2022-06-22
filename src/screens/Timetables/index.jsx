import {useState, useEffect, useMemo} from "react";
import {ScrollView, View, Text} from "react-native";
import {useSelector} from "react-redux";
import {fetchTimetables, requestDeleteTimetable} from "../../api/timetable";
import {
  Button,
  EditListItem,
  Loader,
  Modal,
  TimetableItem,
} from "../../components";
import mainStyles from "../../styles/styles";
import {removeItemFromArray} from "../../utils";
import styles from "./styles";

const Timetables = ({navigation}) => {
  const {accessToken, timetablesMode} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      timetablesMode: state.app.timetablesMode,
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
        setErrors(["Ошибка при получении расписания"]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      setErrorModalVisible(true);
    }
  }, [errors]);

  const getTimetableItem = timetable => {
    return timetablesMode === "show" ? (
      <View key={timetable.id}>
        <TimetableItem
          timetable={timetable}
          onPress={() =>
            navigation.navigate("Timetable", {timetable: timetable})
          }
        />
      </View>
    ) : (
      <View key={timetable.id}>
        <EditListItem
          content={<Text style={styles.listItemText}>{timetable.name}</Text>}
          onPressEdit={() => {
            navigation.navigate("EditTimetableNavigation", {
              screen: "EditTimetable",
              params: {timetable},
            });
          }}
          onPressDelete={() => {
            requestDeleteTimetable(accessToken, timetable.id)
              .then(() => {
                setTimetables(
                  removeItemFromArray(
                    timetables,
                    timetables.findIndex(t => t.id === timetable.id),
                  ),
                );
              })
              .catch(() => {
                setErrors([["Ошибка при удалении расписания"]]);
              });
          }}
        />
      </View>
    );
  };

  const personalTimetableElements = useMemo(() => {
    return timetables
      .filter(timetable => !timetable.groupId)
      .map(timetable => getTimetableItem(timetable));
  }, [timetables, timetablesMode]);

  const groupTimetableElements = useMemo(() => {
    return timetables
      .filter(timetable => timetable.groupId)
      .map(timetable => getTimetableItem(timetable));
  }, [timetables, timetablesMode]);

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Modal
        header="Таблица"
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
          {timetables.length > 0 ? (
            <View>
              {personalTimetableElements.length > 0 && (
                <>
                  <Text style={styles.timetableHeader}>Мои</Text>
                  {personalTimetableElements}
                </>
              )}
              {groupTimetableElements.length > 0 && (
                <>
                  <Text style={styles.timetableHeader}>Группа</Text>
                  {groupTimetableElements}
                </>
              )}
            </View>
          ) : (
            <Text style={styles.noTimetablesText}>
              Нет расписания. Добавьте новое!
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Timetables;
