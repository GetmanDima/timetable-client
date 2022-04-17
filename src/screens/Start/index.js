import {useSelector} from "react-redux";
import {useEffect} from "react";
import Loader from "../../components/Loader";

const StartScreen = ({navigation}) => {
  const {authLoading, authStatus, user} = useSelector(state => {
    return {
      authLoading: state.auth.loading,
      authStatus: state.auth.status,
      user: state.auth.user,
    };
  });

  useEffect(() => {
    if (!authLoading) {
      if (authStatus) {
        if (user.groupId) {
          navigation.navigate("Timetables");
        } else {
          navigation.navigate("NewGroup");
        }
      } else {
        navigation.navigate("ChooseTimetable");
      }
    }
  }, [authLoading, authStatus, user.groupId]);

  return authLoading ? <Loader /> : null;
};

export default StartScreen;
