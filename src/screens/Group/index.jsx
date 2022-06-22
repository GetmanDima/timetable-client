import {useState, useEffect, useMemo} from "react";
import {ScrollView, View, Text} from "react-native";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import {useSelector} from "react-redux";
import {fetchGroup, fetchGroupUsers} from "../../api/group";
import {ListItem, Loader, Modal} from "../../components";
import {lightColor} from "../../styles/constants";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const Group = () => {
  const {accessToken, groupId} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      groupId: state.auth.user.groupId,
    };
  });

  const [group, setGroup] = useState(null);
  const [groupLoading, setGroupLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setUsersLoading(true);

    fetchGroupUsers(accessToken, groupId)
      .then(res => {
        setUsers(res.data);
        setUsersLoading(false);
      })
      .catch(() => {
        setUsersLoading(false);
        setErrorModalVisible(true);
        setErrors(["Ошибка получения пользователей группы"]);
      });
  }, []);

  useEffect(() => {
    setGroupLoading(true);

    fetchGroup(accessToken, groupId)
      .then(res => {
        setGroup(res.data);
        setGroupLoading(false);
      })
      .catch(() => {
        setGroupLoading(false);
        setErrorModalVisible(true);
        setErrors(["Ошибка получения группы"]);
      });
  }, []);

  const userElements = useMemo(() => {
    return users
      ? users.map(user => {
          return (
            <View key={user.id} style={styles.listItemWrapper}>
              <ListItem
                leftContent={
                  <Text style={styles.text}>
                    {(user.firstName ?? "-") +
                      " " +
                      (user.lastName ?? "-") +
                      " (" +
                      (user.type ?? "-") +
                      ")"}
                  </Text>
                }
                rightContent={
                  <View style={styles.buttonWrapper}>
                    <MaterialIcon.Button
                      onPress={() => {}}
                      iconStyle={styles.icon}
                      backgroundColor={null}
                      name="arrow-circle-up"
                      size={25}
                      color={lightColor}
                    />
                    <MaterialIcon.Button
                      onPress={() => {}}
                      iconStyle={styles.icon}
                      backgroundColor={null}
                      name="delete"
                      size={25}
                      color={lightColor}
                    />
                  </View>
                }
              />
            </View>
          );
        })
      : [];
  }, [users]);

  return (
    <View style={mainStyles.screen}>
      {(groupLoading || usersLoading) && <Loader />}
      <Modal
        header="Группа"
        body={errors.join("\n")}
        type="danger"
        visible={errorModalVisible}
        onPress={() => {
          setErrorModalVisible(false);
          setErrors([]);
        }}
      />
      <ScrollView>
        <Text style={styles.group}>{group && group.name}</Text>
        <View style={[mainStyles.container, styles.container]}>
          {userElements.length > 0 ? (
            userElements
          ) : (
            <View style={styles.noUsers}>
              <Text style={styles.noUsersText}>Нет участников.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Group;
