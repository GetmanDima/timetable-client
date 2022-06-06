import {useState, useEffect, useMemo} from "react";
import {ScrollView, View, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {requestDeleteWeekType} from "../../api/timetable";
import {deleteWeekType as deleteWeekTypeAction} from "../../store/actions/timetable";
import {Button, EditListItem, Loader, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const WeekTypes = ({route, navigation}) => {
  const {timetable} = route.params;

  const dispatch = useDispatch();

  const {accessToken, weekTypes} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      weekTypes: state.timetable.weekTypes[timetable.id],
    };
  });

  const [loading, setLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `Тип недели: ${timetable.name}`,
    });
  }, []);

  const deleteWeekType = weekType => {
    setLoading(true);

    requestDeleteWeekType(accessToken, timetable.id, weekType)
      .then(() => {
        dispatch(deleteWeekTypeAction(timetable.id, weekType));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorModalVisible(true);
      });
  };

  const weekTypeElements = useMemo(() => {
    return weekTypes
      ? Object.entries(weekTypes).map(([weekTypeId, weekType]) => {
          if (!weekType) {
            return null;
          }

          return (
            <View key={weekTypeId}>
              <EditListItem
                content={<Text>{weekType.name}</Text>}
                onPressEdit={() => {
                  navigation.navigate("CreateWeekType", {
                    timetable,
                    weekType,
                    edit: true,
                  });
                }}
                onPressDelete={() => {
                  deleteWeekType(weekType);
                }}
              />
            </View>
          );
        })
      : [];
  }, [weekTypes]);

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Modal
        header="Удаление типа недели"
        body={
          "Ошибка удаления типа недели.\nВозможно есть урок который ссылается на данный тип недели."
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
          navigation.navigate("CreateWeekType", {timetable});
        }}
        textStyle={styles.createButtonText}
        style={styles.createButton}
      />
      <ScrollView>
        <View style={[mainStyles.container, styles.container]}>
          {weekTypeElements.length > 0 ? (
            weekTypeElements
          ) : (
            <View style={styles.noWeekTypes}>
              <Text style={styles.noWeekTypesText}>
                Нет типов недель. Добавьте новый!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default WeekTypes;
