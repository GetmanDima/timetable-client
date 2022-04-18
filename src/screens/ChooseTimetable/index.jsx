import {useState, useEffect, useMemo} from "react";
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import FlatPickerControl from "../../components/FlatPickerControl";
import InputPickerControl from "../../components/InputPickerControl";
import Button from "../../components/Button";
import Link from "../../components/Link";
import {fetchUniversities} from "../../api/university";
import {useSelector} from "react-redux";
import {fetchGroups} from "../../api/group";
import {fetchGroupTimetables} from "../../api/timetable";
import styles from "./styles";
import mainStyles from "../../styles/styles";

const ChooseTimetable = ({navigation}) => {
  const {accessToken} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
    };
  });

  const [timetables, setTimetables] = useState([]);

  const {control, handleSubmit, watch, setValue} = useForm({
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
      setValue("timetable", timetables[0]);
    }
  }, [timetables]);

  const timetableItems = useMemo(() => {
    return timetables.map(timetable => {
      return {label: timetable.name, value: timetable};
    });
  }, [timetables]);

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

  useEffect(async () => {
    try {
      const lastTimetable = JSON.parse(
        await AsyncStorage.getItem("lastTimetable"),
      );

      if (lastTimetable) {
        navigation.navigate("Timetable", {timetable: lastTimetable});
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onSubmit = async data => {
    Keyboard.dismiss();
    navigation.navigate("Timetable", {timetable: data.timetable});

    try {
      await AsyncStorage.setItem(
        "lastTimetable",
        JSON.stringify(data.timetable),
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={[mainStyles.screen, mainStyles.screenCenter]}>
          <View style={styles.form}>
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
              name="timetable"
              label="Расписание"
              rules={{
                required: "Необходимо выбрать",
              }}
              enabled={groupId !== null && groupId !== undefined}
              style={mainStyles.mt3}
            />
            <Button
              text={"Получить"}
              style={mainStyles.mt5}
              onPress={handleSubmit(onSubmit)}
              type={"primary"}
            />

            <View style={styles.alternative}>
              <Link
                to="/Auth"
                text="Вход"
                style={mainStyles.mr3}
                textStyle={styles.alternativeLink}
              />
              <Link
                to="/Registration"
                text="Регистрация"
                textStyle={styles.alternativeLink}
              />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChooseTimetable;
