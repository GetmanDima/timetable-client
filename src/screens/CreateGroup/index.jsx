import {useEffect, useState} from "react";
import {View, Keyboard, Text} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useForm, Controller} from "react-hook-form";
import {
  Button,
  Loader,
  FlatTextInput,
  FlatInputPicker,
  Modal,
} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {fetchUniversities} from "../../api/university";
import {requestCreateGroup} from "../../api/group";
import {logout} from "../../store/actions/auth";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const CreateGroup = ({route, navigation}) => {
  const {university: paramUniversity} = route.params ?? {};

  const dispatch = useDispatch();

  const {authStatus, accessToken} = useSelector(state => {
    return {
      authStatus: state.auth.status,
      accessToken: state.auth.accessToken,
    };
  });

  const limit = 14;

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [universities, setUniversities] = useState([]);
  const [universityTotalCount, setUniversityTotalCount] = useState(1);
  const [universityOffset, setUniversityOffset] = useState(0);
  const [universityLoading, setUniversityLoading] = useState(false);

  const {control, handleSubmit, setValue, clearErrors, watch} = useForm({
    mode: "onTouched",
  });

  const university = watch("university");

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

  const resetUniversity = () => {
    setUniversities([]);
    setUniversityTotalCount(1);
    setUniversityOffset(0);
    setUniversityLoading(false);
    clearErrors("university");
    setValue("university", undefined);
  };

  useEffect(() => {
    if (paramUniversity) {
      resetUniversity();
      setUniversities([
        {
          label: paramUniversity.name,
          value: paramUniversity,
          visible: false,
        },
      ]);
      setValue("university", paramUniversity);
    }
  }, [paramUniversity]);

  useEffect(() => {
    if (errors.length > 0) {
      setErrorModalVisible(true);
    }
  }, [errors]);

  useEffect(() => {
    if (status) {
      setSuccessModalVisible(true);
    }
  }, [status]);

  useEffect(() => {
    if (!authStatus) {
      navigation.reset({
        index: 0,
        routes: [{name: "Auth"}],
      });
    }
  }, [authStatus]);

  const onSubmit = data => {
    setLoading(true);
    requestCreateGroup(accessToken, data.university.id, {
      name: data.groupName,
      courseNumber: data.courseNumber,
      admissionYear: data.admissionYear,
    })
      .then(() => {
        setStatus(true);
        setLoading(false);
        setErrors([]);
      })
      .catch(e => {
        setLoading(false);
        setErrors([e.message]);
      });

    Keyboard.dismiss();
  };

  return (
    <View style={mainStyles.screen}>
      <Modal
        header="Создание группы"
        body="Группа успешно создана. Нажимте ОК и заново авторизуйтесь."
        visible={successModalVisible}
        onPress={() => {
          dispatch(logout());
        }}
      />
      <Modal
        header="Создание группы"
        body={errors.join("\n")}
        type="danger"
        visible={errorModalVisible}
        onPress={() => {
          setErrorModalVisible(false);
        }}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={mainStyles.keyboardAwareContent}>
        <View style={[mainStyles.container, mainStyles.form]}>
          {loading && <Loader />}
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
                <View>
                  <View style={styles.pickerWithButton}>
                    <FlatInputPicker
                      items={universities}
                      selectedValue={value}
                      label="Университет"
                      invalid={invalid}
                      loading={universityLoading}
                      onValueChange={onChange}
                      onBlur={onBlur}
                      onEndReached={onUniversityEndReached}
                      style={styles.pickerWithButtonInput}
                    />
                    <Button
                      text="+"
                      onPress={() => {
                        navigation.navigate("CreateUniversity");
                      }}
                      style={styles.pickerButton}
                    />
                  </View>
                  {invalid && (
                    <Text style={mainStyles.inputError}>{error.message}</Text>
                  )}
                </View>
              );
            }}
          />

          <Controller
            control={control}
            name={"groupName"}
            rules={{
              required: "Необходимо заполнить",
              minLength: {
                value: 3,
                message: "Минимальная длина 3",
              },
              maxLength: {
                value: 100,
                message: "Максимальная длина 100",
              },
            }}
            render={({
              field: {value, onBlur, onChange},
              fieldState: {error, invalid},
            }) => {
              return (
                <View>
                  <FlatTextInput
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    invalid={invalid}
                    label="Группа"
                    editable={university !== undefined}
                    style={mainStyles.mt3}
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
            name={"courseNumber"}
            rules={{
              min: {
                value: 1,
                message: "min 1",
              },
              max: {
                value: 15,
                message: "max 15",
              },
            }}
            render={({
              field: {value, onBlur, onChange},
              fieldState: {error, invalid},
            }) => {
              return (
                <View>
                  <FlatTextInput
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    invalid={invalid}
                    label="Курс"
                    editable={university !== undefined}
                    style={mainStyles.mt3}
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
            name={"admissionYear"}
            rules={{
              min: {
                value: 2000,
                message: "min 2000",
              },
              max: {
                value: 2022,
                message: "max 2022",
              },
            }}
            render={({
              field: {value, onBlur, onChange},
              fieldState: {error, invalid},
            }) => {
              return (
                <View>
                  <FlatTextInput
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    invalid={invalid}
                    label="Год поступления"
                    editable={university !== undefined}
                    style={mainStyles.mt3}
                  />
                  {invalid && (
                    <Text style={mainStyles.inputError}>{error.message}</Text>
                  )}
                </View>
              );
            }}
          />

          <Button
            text="Создать группу"
            style={[mainStyles.mt5, mainStyles.mb5]}
            onPress={handleSubmit(onSubmit)}
            type={"primary"}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateGroup;
