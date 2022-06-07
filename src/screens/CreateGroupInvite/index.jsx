import {useState, useEffect} from "react";
import {View, Text, Keyboard} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getIdFromLocation} from "../../utils";
import {
  requestCreateGroupInvite,
  requestEditGroupInvite,
} from "../../api/group";
import {addGroupInvite, deleteGroupInvite} from "../../store/actions/group";
import {Button, Loader, FlatTextInput, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const CreateGroupInvite = ({route, navigation}) => {
  const {invite = {}, edit = false} = route.params ?? {};

  const dispatch = useDispatch();

  const {accessToken, groupId} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      groupId: state.auth.user.groupId,
    };
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `${edit ? "Редактировать" : "Создать"} приглашение`,
    });
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      setErrorModalVisible(true);
    }
  }, [errors]);

  const {control, handleSubmit} = useForm({
    mode: "onTouched",
    defaultValues: {
      code: invite.code,
    },
  });

  const onSubmit = data => {
    Keyboard.dismiss();
    setLoading(true);

    const newInvite = {
      ...invite,
      groupId,
      code: data.code,
    };

    if (edit) {
      requestEditGroupInvite(accessToken, newInvite)
        .then(() => {
          dispatch(deleteGroupInvite(invite));
          dispatch(addGroupInvite(newInvite));

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка редактирования приглашения"]);
        });
    } else {
      requestCreateGroupInvite(accessToken, groupId, newInvite)
        .then(res => {
          const id = getIdFromLocation(res.headers["location"]);
          dispatch(
            addGroupInvite({
              ...newInvite,
              id,
            }),
          );

          navigation.goBack();
        })
        .catch(() => {
          setLoading(false);
          setErrors(["Ошибка создания приглашения"]);
        });
    }
  };

  return (
    <View style={mainStyles.screen}>
      {loading && <Loader />}
      <Modal
        header={`${edit ? "Редактирование" : "Создание"} типа недели`}
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
          <Controller
            control={control}
            name={"code"}
            rules={{
              required: "Необходимо заполнить",
              minLength: {
                value: 1,
                message: "Минимальная длина 1",
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
                    label="Код приглашения"
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
            text={edit ? "Изменить" : "Создать"}
            style={styles.submit}
            onPress={handleSubmit(onSubmit)}
            type={"primary"}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateGroupInvite;
