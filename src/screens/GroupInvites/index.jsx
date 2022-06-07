import {useState, useEffect, useMemo} from "react";
import {ScrollView, View, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchGroupIdentifier,
  fetchGroupInvites,
  requestDeleteGroupInvite,
} from "../../api/group";
import {
  deleteGroupInvite,
  setGroupIdentifier,
  setGroupInvites,
} from "../../store/actions/group";
import {Button, EditListItem, Loader, Modal} from "../../components";
import mainStyles from "../../styles/styles";
import styles from "./styles";

const GroupInvites = ({navigation}) => {
  const dispatch = useDispatch();

  const {accessToken, groupId, invites, identifier} = useSelector(state => {
    return {
      accessToken: state.auth.accessToken,
      groupId: state.auth.user.groupId,
      invites: state.group.invites,
      identifier: state.group.identifier,
    };
  });

  const [identifierLoading, setIdentifierLoading] = useState(false);
  const [invitesLoading, setInvitesLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setInvitesLoading(true);

    fetchGroupInvites(accessToken, groupId)
      .then(res => {
        dispatch(setGroupInvites(res.data));
        setInvitesLoading(false);
      })
      .catch(() => {
        setInvitesLoading(false);
        setErrorModalVisible(true);
        setErrors(["Ошибка получения приглашений"]);
      });
  }, []);

  useEffect(() => {
    if (identifier) {
      return;
    }

    setIdentifierLoading(true);

    fetchGroupIdentifier(accessToken, groupId)
      .then(res => {
        dispatch(setGroupIdentifier(res.data.identifier));
        setIdentifierLoading(false);
      })
      .catch(() => {
        setIdentifierLoading(false);
        setErrorModalVisible(true);
        setErrors(["Ошибка получения идентификатора группы"]);
      });
  }, []);

  const deleteInvite = invite => {
    setInvitesLoading(true);

    requestDeleteGroupInvite(accessToken, invite)
      .then(() => {
        dispatch(deleteGroupInvite(invite));
        setInvitesLoading(false);
      })
      .catch(() => {
        setInvitesLoading(false);
        setErrorModalVisible(true);
        setErrors(["Ошибка удаления приглашения"]);
      });
  };

  const inviteElements = useMemo(() => {
    return invites
      ? invites.map(invite => {
          return (
            <View key={invite.id}>
              <EditListItem
                content={<Text>{invite.code}</Text>}
                onPressEdit={() => {
                  navigation.navigate("CreateGroupInvite", {
                    invite,
                    edit: true,
                  });
                }}
                onPressDelete={() => {
                  deleteInvite(invite);
                }}
              />
            </View>
          );
        })
      : [];
  }, [invites]);

  return (
    <View style={mainStyles.screen}>
      {(identifierLoading || invitesLoading) && <Loader />}
      <Modal
        header="Приглашение"
        body={errors.join("\n")}
        type="danger"
        visible={errorModalVisible}
        onPress={() => {
          setErrorModalVisible(false);
          setErrors([]);
        }}
      />
      <Button
        text="+"
        onPress={() => {
          navigation.navigate("CreateGroupInvite");
        }}
        textStyle={styles.createButtonText}
        style={styles.createButton}
      />
      <ScrollView>
        <View style={styles.identifier}>
          <Text style={styles.identifierText}>Идентификатор группы</Text>
          <Text style={styles.identifierValueText}>{identifier}</Text>
        </View>
        <View style={[mainStyles.container, styles.container]}>
          {inviteElements.length > 0 ? (
            inviteElements
          ) : (
            <View style={styles.noInvites}>
              <Text style={styles.noInvitesText}>
                Нет приглашений. Добавьте новое!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupInvites;
