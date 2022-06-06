import {View, Text} from "react-native";
import PropTypes from "prop-types";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import {lightColor} from "../../styles/constants";
import styles from "./styles";

const TimetableLesson = ({
  startTime,
  endTime,
  subject,
  teacher,
  room,
  classType,
  format,
  edit,
  remove,
  onPressEdit,
  onPressRemove,
  style,
}) => {
  return (
    <View style={[{width: 300}, style]}>
      <View style={styles.time}>
        <Text
          fontSize={12}
          fontWeight={400}
          lineHeight={14}
          style={styles.timeText}>
          {startTime} - {endTime}
        </Text>
        {edit && (
          <MaterialIcon.Button
            onPress={onPressEdit}
            iconStyle={styles.icon}
            backgroundColor={null}
            name="edit"
            size={23}
            color={lightColor}
          />
        )}
        {remove && (
          <MaterialIcon.Button
            onPress={onPressRemove}
            iconStyle={styles.icon}
            backgroundColor={null}
            name="delete"
            size={23}
            color={lightColor}
          />
        )}
      </View>
      <View
        style={
          subject !== null ? styles.timeTableLessonBlock : styles.notLesson
        }>
        {subject !== null ? (
          <>
            <View>
              <Text
                fontSize={12}
                fontWeight={400}
                lineHeight={14}
                style={styles.timeTableLessonText}>
                {subject && subject.name}
              </Text>
              <View style={styles.lessonInfo}>
                {teacher ? (
                  <View style={styles.teacher}>
                    <Text
                      fontSize={12}
                      fontWeight={400}
                      lineHeight={18}
                      style={styles.teacherText}>
                      {teacher && teacher.name}
                    </Text>
                  </View>
                ) : null}
                {room ? (
                  <View style={styles.room}>
                    <Text
                      fontSize={12}
                      fontWeight={400}
                      lineHeight={18}
                      style={styles.roomText}>
                      {room}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={styles.lessonType}>
              <Text
                fontSize={12}
                fontWeight={400}
                lineHeight={12}
                style={styles.classTypeText}>
                {classType}
              </Text>
              <View style={styles.line} />
              <Text
                fontSize={12}
                fontWeight={400}
                lineHeight={12}
                style={styles.formatText}>
                {format}
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.notLessonText}>Нет пары</Text>
        )}
      </View>
    </View>
  );
};

TimetableLesson.defaultProps = {
  subject: null,
  teacher: null,
  room: "",
  classType: "",
  format: "",
  startTime: "",
  endTime: "",
  edit: false,
  remove: false,
  onPressEdit: () => {},
  onPressRemove: () => {},
  style: {},
};

TimetableLesson.propTypes = {
  subject: PropTypes.object,
  teacher: PropTypes.object,
  room: PropTypes.string,
  classType: PropTypes.string,
  format: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  edit: PropTypes.bool,
  remove: PropTypes.bool,
  onPressEdit: PropTypes.func,
  onPressRemove: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default TimetableLesson;
