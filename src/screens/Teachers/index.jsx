import {useState, useEffect, useMemo} from "react";
import {ScrollView, View, Text} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {requestDeleteTeacher} from "../../api/timetable";
import {deleteTeacher as deleteTeacherAction} from "../../store/actions/timetable";
import {Button, Loader, EditListItem, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const Teachers = ({route, navigation}) => {
  const {timetable} = route.params;

  const dispatch = useDispatch();

  const {accessToken, teachers} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      teachers: state.timetable.teachers[timetable.id],
    };
  });

  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `Учителя: ${timetable.name}`,
    });
  }, []);

  const deleteTeacher = teacher => {
    setLoading(true);

    requestDeleteTeacher(accessToken, timetable.id, teacher)
      .then(() => {
        dispatch(deleteTeacherAction(timetable.id, teacher));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorModalVisible(true);
      });
  };

  const teacherElements = useMemo(() => {
    return teachers
      ? Object.entries(teachers).map(([teacherId, teacher]) => {
          if (!teacher) {
            return null;
          }

          return (
            <View key={teacherId}>
              <EditListItem
                content={<Text>{teacher.name}</Text>}
                onPressEdit={() => {
                  navigation.navigate("CreateTeacher", {
                    timetable,
                    teacher,
                    edit: true,
                  });
                }}
                onPressDelete={() => {
                  deleteTeacher(teacher);
                }}
              />
            </View>
          );
        })
      : [];
  }, [teachers]);

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Modal
        header="Удаление учителя"
        body={
          "Ошибка удаления учителя.\nВозможно есть урок который ссылается на данного учителя."
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
          navigation.navigate("CreateTeacher", {timetable});
        }}
        textStyle={styles.createButtonText}
        style={styles.createButton}
      />
      <ScrollView>
        <View style={[mainStyles.container, styles.container]}>
          {teacherElements.length > 0 ? (
            teacherElements
          ) : (
            <View style={styles.noTeachers}>
              <Text style={styles.noTeachersText}>
                Нет учителей. Добавьте нового!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Teachers;
