import {useState, useEffect, useMemo} from "react";
import {ScrollView, View, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {requestDeleteClassTime} from "../../api/timetable";
import {deleteClassTime as deleteClassTimeAction} from "../../store/actions/timetable";
import {Button, EditListItem, Loader, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const ClassTimes = ({route, navigation}) => {
  const {timetable} = route.params;

  const dispatch = useDispatch();

  const {accessToken, classTimes} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      classTimes: state.timetable.classTimes[timetable.id],
    };
  });

  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `Время уроков: ${timetable.name}`,
    });
  }, []);

  const deleteClassTime = classTime => {
    setLoading(true);

    requestDeleteClassTime(accessToken, timetable.id, classTime)
      .then(() => {
        dispatch(deleteClassTimeAction(timetable.id, classTime));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorModalVisible(true);
      });
  };

  const classTimeElements = useMemo(() => {
    return classTimes
      ? Object.entries(classTimes)
          .filter(([, classTime]) => classTime)
          .sort(([, classTime1], [, classTime2]) => {
            return classTime1.number > classTime2.number ? 1 : -1;
          })
          .map(([classTimeId, classTime]) => {
            return (
              <View key={classTimeId}>
                <EditListItem
                  content={
                    <View style={styles.classTime}>
                      <Text
                        style={[styles.classTimeText, styles.classTimeNumber]}>
                        {classTime.number})
                      </Text>
                      <Text style={styles.classTimeText}>
                        {classTime.startTime + " - " + classTime.endTime}
                      </Text>
                    </View>
                  }
                  onPressEdit={() => {
                    navigation.navigate("CreateClassTime", {
                      timetable,
                      classTime,
                      edit: true,
                    });
                  }}
                  onPressDelete={() => {
                    deleteClassTime(classTime);
                  }}
                />
              </View>
            );
          })
      : [];
  }, [classTimes]);

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Modal
        header="Удаление времени урока"
        body={
          "Ошибка удаления времени урока.\nВозможно есть урок который ссылается на данное время."
        }
        type="danger"
        visible={errorModalVisible}
        onPress={() => {
          setErrorModalVisible(false);
        }}
      />
      <Button
        text="+"
        onPress={() => {
          navigation.push("CreateClassTime", {timetable});
        }}
        textStyle={styles.createButtonText}
        style={styles.createButton}
      />
      <ScrollView>
        <View style={[mainStyles.container, styles.container]}>
          {classTimeElements.length > 0 ? (
            classTimeElements
          ) : (
            <View style={styles.noClassTimes}>
              <Text style={styles.noClassTimesText}>
                Нет времени уроков. Добавьте новое!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ClassTimes;
