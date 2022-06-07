import {useState, useEffect} from "react";
import {View, Text, Keyboard, ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSelector} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import {Button, Link, FlatInputPicker, TimetableItem} from "../../components";
import {fetchUniversities} from "../../api/university";
import {fetchGroups} from "../../api/group";
import {fetchGroupTimetables} from "../../api/timetable";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const ChooseTimetable = ({navigation}) => {
  const {authStatus, accessToken} = useSelector(state => {
    return {
      authStatus: state.auth.status,
      accessToken: state.auth.accessToken,
    };
  });

  const limit = 14;

  const [universities, setUniversities] = useState([]);
  const [universityTotalCount, setUniversityTotalCount] = useState(1);
  const [universityOffset, setUniversityOffset] = useState(0);
  const [universityLoading, setUniversityLoading] = useState(false);

  const [groups, setGroups] = useState([]);
  const [groupTotalCount, setGroupTotalCount] = useState(1);
  const [groupOffset, setGroupOffset] = useState(0);
  const [groupLoading, setGroupLoading] = useState(false);

  const [timetables, setTimetables] = useState([]);
  const [timetableTotalCount, setTimetableTotalCount] = useState(1);
  const [timetableOffset, setTimetableOffset] = useState(0);
  const [timetableLoading, setTimetableLoading] = useState(false);

  const [lastTimetable, setLastTimetable] = useState(null);

  const {control, handleSubmit, watch, setValue} = useForm({
    mode: "onTouched",
  });

  const university = watch("university");
  const group = watch("group");

  const prepareResultForPicker = fetchResult => {
    return fetchResult.then(res => {
      return {
        totalCount: res.headers["x-total-count"],
        data: res.data.map(r => {
          return {
            label: r.name,
            value: r,
          };
        }),
      };
    });
  };

  const onUniversityEndReached = () => {
    if (!universityLoading && universityOffset < universityTotalCount) {
      setUniversityLoading(true);
      prepareResultForPicker(
        fetchUniversities(accessToken, {
          parsed: true,
          limit,
          offset: universityOffset,
        }),
      ).then(res => {
        setUniversities([...universities, ...res.data]);
        setUniversityTotalCount(res.totalCount);
        setUniversityOffset(universityOffset + limit);
        setUniversityLoading(false);
      });
    }
  };

  const onGroupEndReached = () => {
    if (!groupLoading && groupOffset < groupTotalCount) {
      setGroupLoading(true);
      prepareResultForPicker(
        fetchGroups(accessToken, university.id, {
          parsed: true,
          limit,
          offset: groupOffset,
        }),
      ).then(res => {
        setGroups([...groups, ...res.data]);
        setGroupTotalCount(res.totalCount);
        setGroupOffset(groupOffset + limit);
        setGroupLoading(false);
      });
    }
  };

  const onTimetableEndReached = () => {
    if (!timetableLoading && timetableOffset < timetableTotalCount) {
      setTimetableLoading(true);
      prepareResultForPicker(
        fetchGroupTimetables(accessToken, group.id, {
          parsed: true,
          limit,
          offset: timetableOffset,
        }),
      ).then(res => {
        setTimetables([...timetables, ...res.data]);
        setTimetableTotalCount(res.totalCount);
        setTimetableOffset(timetableOffset + limit);
        setTimetableLoading(false);

        if (timetableOffset === 0 && res.data.length > 0) {
          setValue("timetable", res.data[0].value);
        }
      });
    }
  };

  const resetGroup = () => {
    setGroups([]);
    setGroupTotalCount(1);
    setGroupOffset(0);
    setGroupLoading(false);
    setValue("group", undefined);
  };

  const resetTimetable = () => {
    setTimetables([]);
    setTimetableTotalCount(1);
    setTimetableOffset(0);
    setTimetableLoading(false);
    setValue("timetable", undefined);
  };

  const onSubmit = async data => {
    Keyboard.dismiss();

    navigation.navigate("Timetable", {
      timetable: data.timetable,
    });

    try {
      await AsyncStorage.setItem(
        "lastTimetable",
        JSON.stringify(data.timetable),
      );

      setLastTimetable(data.timetable);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    try {
      const lastTimetable = JSON.parse(
        await AsyncStorage.getItem("lastTimetable"),
      );

      if (lastTimetable) {
        setLastTimetable(lastTimetable);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    resetGroup();
  }, [university]);

  useEffect(() => {
    resetTimetable();
  }, [group]);

  useEffect(() => {
    if (group && timetableOffset === 0) {
      onTimetableEndReached();
    }
  }, [group, timetableOffset]);

  return (
    <View style={[mainStyles.screen, mainStyles.screenCenter]}>
      <View>
        <ScrollView>
          <View style={[mainStyles.container, mainStyles.form]}>
            {lastTimetable && (
              <TimetableItem
                style={styles.lastOpened}
                timetable={lastTimetable}
                onPress={() => {
                  navigation.navigate("Timetable", {
                    timetable: lastTimetable,
                  });
                }}
              />
            )}
            <Controller
              control={control}
              name={"university"}
              rules={{
                required: "Необходимо выбрать",
              }}
              render={({
                field: {value, onBlur, onChange},
                fieldState: {error, invalid},
              }) => {
                return (
                  <View style={styles.control}>
                    <FlatInputPicker
                      items={universities}
                      selectedValue={value}
                      label="University"
                      invalid={invalid}
                      loading={universityLoading}
                      onValueChange={onChange}
                      onBlur={onBlur}
                      onEndReached={onUniversityEndReached}
                    />
                    {invalid && (
                      <Text style={mainStyles.inputError}>{error.message}</Text>
                    )}
                  </View>
                );
              }}
            />

            <Controller
              control={control}
              name={"group"}
              rules={{
                required: "Необходимо выбрать",
              }}
              render={({
                field: {value, onBlur, onChange},
                fieldState: {error, invalid},
              }) => {
                return (
                  <View style={styles.control}>
                    <FlatInputPicker
                      items={groups}
                      selectedValue={value}
                      label="Group"
                      invalid={invalid}
                      disabled={!university}
                      loading={groupLoading}
                      onValueChange={onChange}
                      onBlur={onBlur}
                      onEndReached={onGroupEndReached}
                    />
                    {university && invalid && (
                      <Text style={mainStyles.inputError}>{error.message}</Text>
                    )}
                  </View>
                );
              }}
            />

            <Controller
              control={control}
              name={"timetable"}
              rules={{
                required: "Необходимо выбрать",
              }}
              render={({
                field: {value, onBlur, onChange},
                fieldState: {error, invalid},
              }) => {
                return (
                  <View style={styles.control}>
                    <FlatInputPicker
                      items={timetables}
                      selectedValue={value}
                      label="Timetable"
                      invalid={invalid}
                      disabled={!group}
                      loading={timetableLoading}
                      onValueChange={onChange}
                      onBlur={onBlur}
                      onEndReached={onTimetableEndReached}
                    />
                    {group && invalid && (
                      <Text style={mainStyles.inputError}>{error.message}</Text>
                    )}
                  </View>
                );
              }}
            />

            <Button
              text={"Получить"}
              style={mainStyles.mt5}
              onPress={handleSubmit(onSubmit)}
              type={"primary"}
            />
            {!authStatus && (
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
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ChooseTimetable;
