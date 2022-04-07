import React from "react"
import {View, Text} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles"

const TimeTableDayLesson = ({
  startTime,
  endTime,
  subject,
  teacher,
  room,
  classType,
  format,
  ...props
}) => {
  return (
    <>
      <View style={styles.time}>
        <Text
          fontSize={12} 
          fontWeight={400} 
          lineHeight={14} 
          style={styles.timeText}
        >
          {startTime} - {endTime}
        </Text>
      </View>
      <View style={subject !== null ? styles.timeTableLessonBlock : styles.notLesson}>
        {subject !== null ? (
          <>
            <View>
              <Text 
                fontSize={12} 
                fontWeight={400} 
                lineHeight={14} 
                style={styles.timeTableLessonText}
              >
                {subject}
              </Text>
              <View style={styles.lessonInfo}>
                <View style={styles.teacher}>
                  <Text 
                    fontSize={12} 
                    fontWeight={400} 
                    lineHeight={18} 
                    style={styles.teacherText}
                  >
                    {teacher}
                  </Text>
                </View>
                <View style={styles.room}>
                  <Text 
                    fontSize={12} 
                    fontWeight={400} 
                    lineHeight={18} 
                    style={styles.roomText}
                  >
                    {room}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.lessonType}>
              <Text 
                fontSize={12} 
                fontWeight={400} 
                lineHeight={12} 
                style={styles.classTypeText}
              >
                {classType}
              </Text>
              <View style={styles.line}></View>
              <Text 
                fontSize={12} 
                fontWeight={400} 
                lineHeight={12} 
                style={styles.formatText}
              >
                {format}
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.notLessonText}>Нет пары</Text>
        )}
      </View>
    </>
  )
}

TimeTableDayLesson.defaultProps = {
  subject: "Информационные технологии и программирование",
  teacher: "Гематудинов",
  room: "A-118",
  classType: "ЛЕКЦ",
  format: "ДИСТ",
  startTime: "9:30",
  endTime: "11:00"
};

TimeTableDayLesson.propTypes = {
  subject: PropTypes.string,
  teacher: PropTypes.string,
  room: PropTypes.string,
  classType: PropTypes.string,
  format: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
};



export default TimeTableDayLesson