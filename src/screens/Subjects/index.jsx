import {useState, useEffect, useMemo} from "react";
import {ScrollView, View, Text} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {requestDeleteSubject} from "../../api/timetable";
import {deleteSubject as deleteSubjectAction} from "../../store/actions/timetable";
import {Button, Loader, EditListItem, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const Subjects = ({route, navigation}) => {
  const {timetable} = route.params;

  const dispatch = useDispatch();

  const {accessToken, subjects} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      subjects: state.timetable.subjects[timetable.id],
    };
  });

  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `Предметы: ${timetable.name}`,
    });
  }, []);

  const deleteSubject = subject => {
    setLoading(true);

    requestDeleteSubject(accessToken, timetable.id, subject)
      .then(() => {
        dispatch(deleteSubjectAction(timetable.id, subject));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorModalVisible(true);
      });
  };

  const subjectElements = useMemo(() => {
    return subjects
      ? Object.entries(subjects).map(([subjectId, subject]) => {
          if (!subject) {
            return null;
          }

          return (
            <View key={subjectId}>
              <EditListItem
                content={
                  <Text style={styles.listItemText}>{subject.name}</Text>
                }
                onPressEdit={() => {
                  navigation.navigate("CreateSubject", {
                    timetable,
                    subject,
                    edit: true,
                  });
                }}
                onPressDelete={() => {
                  deleteSubject(subject);
                }}
              />
            </View>
          );
        })
      : [];
  }, [subjects]);

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Modal
        header="Удаление предмета"
        body={
          "Ошибка удаления предмета.\nВозможно есть урок который ссылается на данный предмет."
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
          navigation.navigate("CreateSubject", {timetable});
        }}
        textStyle={styles.createButtonText}
        style={styles.createButton}
      />
      <ScrollView>
        <View style={[mainStyles.container, styles.container]}>
          {subjectElements.length > 0 ? (
            subjectElements
          ) : (
            <View style={styles.noSubjects}>
              <Text style={styles.noSubjectsText}>
                Нет предметов. Добавьте новый!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Subjects;
