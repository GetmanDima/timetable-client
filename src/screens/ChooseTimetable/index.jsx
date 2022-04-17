import {useState, useEffect, useMemo} from "react";
import {View, ScrollView, Text, Keyboard} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import Loader from "../../components/Loader";
import FlatPickerControl from "../../components/FlatPickerControl";
import Button from "../../components/Button";
import {fetchUniversities} from "../../api/university";
import {useSelector} from "react-redux";
import {fetchGroups} from "../../api/group";
import {fetchGroupTimetables} from "../../api/timetable";
import InputPickerControl from "../../components/InputPickerControl";
import Link from "../../components/Link";
import styles from "./styles";
import mainStyles from "../../styles/styles";

const ChooseTimetable = ({navigation}) => {
  const {accessToken} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
    };
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [timetables, setTimetables] = useState([]);

  const {control, handleSubmit, resetField, reset, watch, setValue} = useForm({
    mode: "onTouched",
  });

  const universityId = watch("universityId");
  const groupId = watch("groupId");

  useEffect(() => {
    if (groupId) {
      fetchGroupTimetables(accessToken, groupId).then(res => {
        setTimetables(res.data);
      });
    }
  }, [groupId]);

  useEffect(() => {
    if (timetables.length > 0) {
      setValue("timetableId", timetables[0].id);
    }
  }, [timetables]);

  const timetableItems = useMemo(() => {
    return timetables.map(timetable => {
      return {label: timetable.name, value: timetable.id};
    });
  }, [timetables]);

  const onSubmit = data => {
    Keyboard.dismiss();
    navigation.navigate("Timetable", {timetableId: data.timetableId});
  };

  const prepareRecommendationsForInput = fetchResult => {
    return fetchResult.then(res => {
      return res.data.map(r => {
        return {
          name: r.name,
          text: `${r.name} (${r.fullName || ""})`,
          value: r.id.toString(),
        };
      });
    });
  };

  return (
    <SafeAreaView>
      {loading && <Loader />}
      <ScrollView>
        <View style={mainStyles.containerCenter}>
          <Text style={[mainStyles.h1, mainStyles.textPrimary, mainStyles.mb4]}>
            Выбрать расписание
          </Text>
          <InputPickerControl
            control={control}
            name="universityId"
            label="Университет"
            rules={{
              required: "Необходимо выбрать",
            }}
            fetchRecommendations={(...params) => {
              return prepareRecommendationsForInput(
                fetchUniversities(accessToken, ...params),
              );
            }}
            style={mainStyles.mt3}
          />
          <InputPickerControl
            control={control}
            name="groupId"
            label="Группа"
            rules={{
              required: "Необходимо выбрать",
            }}
            disabled={universityId === null || universityId === undefined}
            fetchRecommendations={(...params) => {
              return prepareRecommendationsForInput(
                fetchGroups(accessToken, universityId, ...params),
              );
            }}
            style={mainStyles.mt3}
          />
          <FlatPickerControl
            items={timetableItems}
            control={control}
            name="timetableId"
            label="Расписание"
            // rules={{
            //   required: "Необходимо выбрать",
            // }}
            enabled={groupId !== null && groupId !== undefined}
            style={mainStyles.mt3}
          />
          <Button
            text={"Получить"}
            style={mainStyles.mt5}
            onPress={handleSubmit(onSubmit)}
            type={"primary"}
          />

          <View style={[styles.alternative, mainStyles.mt5]}>
            <Link to="/Auth" text="Вход" style={mainStyles.mr3} />
            <Link
              to="/Registration"
              text="Регистрация"
              style={styles.authLink}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseTimetable;
