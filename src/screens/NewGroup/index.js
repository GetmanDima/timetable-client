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
import {requestCreateFaculty, fetchFaculties} from "../../api/faculty";
import {requestCreateDepartment, fetchDepartments} from "../../api/department";
import {requestCreateDirection, fetchDirections} from "../../api/direction";
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
    defaultValues: {
      university: "",
      faculty: "",
      department: "",
      direction: "",
      group: "",
      courseNumber: "",
      admissionYear: "",
    },
  });

  const [universityId, facultyId, departmentId, directionId] = watch([
    "university",
    "faculty",
    "department",
    "direction",
  ]);

  const onSubmit = data => {
    setLoading(true);
    requestCreateGroup(accessToken, directionId, {
      name: data.group,
      courseNumber: data.courseNumber,
      admissionYear: data.admissionYear,
    })
      .then(() => {
        setStatus(true);
        setLoading(false);
        setErrors([]);
      })
      .catch(() => {
        setLoading(false);
        setErrors(["Ошибка создания группы"]);
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

  const newItemModalNameInputs = [
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
  ];

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
            name="university"
            label="Университет"
            rules={{
              required: "Необходимо заполнить",
            }}
            newItemModalHeader={"Добавить университет"}
            newItemModalInputs={[
              ...newItemModalNameInputs,
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
          <InputPickerWithCreatorControl
            control={control}
            name="faculty"
            label="Факультет"
            rules={{
              required: "Необходимо заполнить",
            }}
            newItemModalHeader={"Добавить факультет"}
            newItemModalInputs={newItemModalNameInputs}
            disabled={universityId === ""}
            fetchRecommendations={(...params) => {
              return prepareRecommendationsForInput(
                fetchFaculties(accessToken, universityId, ...params),
              );
            }}
            requestCreateItem={(...params) => {
              return requestCreateFaculty(accessToken, universityId, ...params);
            }}
            style={mainStyles.mt3}
          />
          <InputPickerWithCreatorControl
            control={control}
            name="department"
            label="Кафедра"
            rules={{
              required: "Необходимо заполнить",
            }}
            newItemModalHeader={"Добавить кафедру"}
            newItemModalInputs={newItemModalNameInputs}
            disabled={facultyId === ""}
            fetchRecommendations={(...params) => {
              return prepareRecommendationsForInput(
                fetchDepartments(accessToken, facultyId, ...params),
              );
            }}
            requestCreateItem={(...params) => {
              return requestCreateDepartment(accessToken, facultyId, ...params);
            }}
            style={mainStyles.mt3}
          />
          <InputPickerWithCreatorControl
            control={control}
            name="direction"
            label="Направление"
            rules={{
              required: "Необходимо заполнить",
            }}
            newItemModalHeader={"Добавить направление"}
            newItemModalInputs={newItemModalNameInputs}
            disabled={departmentId === ""}
            fetchRecommendations={(...params) => {
              return prepareRecommendationsForInput(
                fetchDirections(accessToken, departmentId, ...params),
              );
            }}
            requestCreateItem={(...params) => {
              return requestCreateDirection(
                accessToken,
                departmentId,
                ...params,
              );
            }}
            style={mainStyles.mt3}
          />
          <FlatInputControl
            control={control}
            name="group"
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
            editable={directionId !== ""}
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
            editable={directionId !== ""}
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
            editable={directionId !== ""}
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
