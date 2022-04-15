import {useEffect, useState} from "react";
import {View, ScrollView, Keyboard, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import InputPickerWithCreatorControl from "../../components/InputPickerWithCreatorControl";
import FlatInputControl from "../../components/FlatInputControl";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import mainStyles from "../../styles/styles";
import {requestCreateUniversity, fetchUniversities} from "../../api/university";
import {useDispatch, useSelector} from "react-redux";
import {requestCreateGroup} from "../../api/group";
import {logout} from "../../store/actions/auth";

const NewGroupScreen = () => {
  const dispatch = useDispatch();

  const {accessToken} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      user: state.auth.user,
    };
  });

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

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

  const {control, handleSubmit, watch} = useForm({
    mode: "onTouched",
  });

  const universityId = watch("universityId");

  const onSubmit = data => {
    setLoading(true);
    requestCreateGroup(accessToken, universityId, {
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
      <ScrollView>
        <View style={{alignItems: "center"}}>
          {loading && <Loader />}
          <Text
            style={[
              mainStyles.h1,
              mainStyles.textPrimary,
              mainStyles.mb4,
              mainStyles.mt5,
            ]}>
            New group
          </Text>
          <InputPickerWithCreatorControl
            control={control}
            name="universityId"
            label="Университет"
            rules={{
              required: "Необходимо заполнить",
            }}
            newItemModalHeader={"Добавить университет"}
            newItemModalInputs={[
              {
                name: "name",
                label: "Аббревиатура",
                defaultValue: "",
                rules: {
                  required: "Необходимо заполнить",
                  minLength: {
                    value: 3,
                    message: "Минимальная длина 3",
                  },
                  maxLength: {
                    value: 100,
                    message: "Максимальная длина 100",
                  },
                },
              },
              {
                name: "fullName",
                label: "Полное название",
                defaultValue: "",
                rules: {
                  minLength: {
                    value: 3,
                    message: "Минимальная длина 3",
                  },
                  maxLength: {
                    value: 100,
                    message: "Максимальная длина 100",
                  },
                },
              },
              {
                name: "address",
                label: "Адрес",
                defaultValue: "",
                rules: {
                  minLength: {
                    value: 3,
                    message: "Минимальная длина 3",
                  },
                  maxLength: {
                    value: 100,
                    message: "Максимальная длина 100",
                  },
                },
              },
            ]}
            fetchRecommendations={(...params) => {
              return prepareRecommendationsForInput(
                fetchUniversities(accessToken, ...params),
              );
            }}
            requestCreateItem={(...params) => {
              return requestCreateUniversity(accessToken, ...params);
            }}
            style={mainStyles.mt3}
          />
          <FlatInputControl
            control={control}
            name="groupName"
            label="Группа"
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
            style={mainStyles.mt3}
            editable={universityId !== ""}
          />
          <FlatInputControl
            control={control}
            name="courseNumber"
            label="Курс"
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
            style={mainStyles.mt3}
            editable={universityId !== ""}
          />
          <FlatInputControl
            control={control}
            name="admissionYear"
            label="Год поступления"
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
            style={mainStyles.mt3}
            editable={universityId !== ""}
          />
          <Button
            text="Создать группу"
            style={[mainStyles.mt5, mainStyles.mb5, {width: 200}]}
            onPress={handleSubmit(onSubmit)}
            type={"primary"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewGroupScreen;
