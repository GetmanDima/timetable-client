import {UPDATE_LOGIN_TIME} from "@env";
import {useState, useEffect, useRef} from "react";
import {LogBox} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {updateLogin} from "../../store/actions/auth";
import {Loader} from "../../components";

LogBox.ignoreLogs(["Setting a timer"]);

const Start = ({navigation}) => {
  const dispatch = useDispatch();

  const {authStatus, authLoading, user} = useSelector(state => {
    return {
      authStatus: state.auth.status,
      authLoading: state.auth.loading,
      user: state.auth.user,
    };
  });

  const [hasSuccessAuth, setHasSuccessAuth] = useState(false);

  const updateLoginInterval = useRef(null);

  useEffect(() => {
    dispatch(updateLogin());
  }, []);

  useEffect(() => {
    if (authStatus) {
      if (updateLoginInterval.current !== null) {
        clearInterval(updateLoginInterval.current);
      }

      updateLoginInterval.current = setInterval(() => {
        dispatch(updateLogin());
      }, UPDATE_LOGIN_TIME * 1000);

      setHasSuccessAuth(true);

      if (user.groupId) {
        navigation.navigate("TabNavigation", {screen: "Timetables"});
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: "CreateGroup"}],
        });
      }
    } else {
      if (updateLoginInterval.current !== null) {
        clearInterval(updateLoginInterval.current);
      }

      if (!authLoading) {
        if (hasSuccessAuth) {
          navigation.reset({
            index: 0,
            routes: [{name: "Auth"}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: "ChooseTimetable"}],
          });
        }
      }
    }
  }, [authStatus, authLoading, user]);

  return authStatus ? null : <Loader />;
};

export default Start;
