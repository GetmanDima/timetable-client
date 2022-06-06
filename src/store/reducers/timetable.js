import {removePropertyFromObject} from "../../utils";
import {
  SUCCESS_GET_TIMETABLE,
  FAIL_GET_TIMETABLE,
  START_LOADING_TIMETABLE,
  SET_WEEK_TYPES,
  ADD_WEEK_TYPE,
  SET_CLASS_TIMES,
  ADD_CLASS_TIME,
  SET_TEACHERS,
  ADD_TEACHER,
  SET_SUBJECTS,
  ADD_SUBJECT,
  RESET_TIMETABLE_ERRORS,
  DELETE_WEEK_TYPE,
  DELETE_CLASS_TIME,
  DELETE_SUBJECT,
  DELETE_TEACHER,
} from "../actionTypes/timetable";

const initialState = {
  // key - timetableId. value - basic timetable data
  timetables: {},
  // key - timetableId. value - {key - weekTypeId: value - weekType data}
  weekTypes: {},
  // key - timetableId. value - {key - classTimeId: value - classTime data}
  classTimes: {},
  // key - timetableId. value - {key - teacherId: value - teacher data}
  teachers: {},
  // key - timetableId. value - {key - subjectId: value - subject data}
  subjects: {},
  // key - timetableId
  loadings: {},
  // key - timetableId
  errors: {},
};

const structureItemsById = items => {
  return items.reduce((structuredItems, item) => {
    structuredItems[item.id] = item;
    return structuredItems;
  }, {});
};

export default (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case START_LOADING_TIMETABLE:
      return {
        ...state,
        loadings: {...state.loadings, [payload.timetableId]: true},
      };
    case RESET_TIMETABLE_ERRORS:
      return {
        ...state,
        errors: {...state.errors, [payload.timetableId]: undefined},
      };
    case SUCCESS_GET_TIMETABLE:
      return {
        ...state,
        timetables: {
          ...state.timetables,
          [payload.id]: payload,
        },
        loadings: {...state.loadings, [payload.id]: false},
        errors: {...state.errors, [payload.id]: []},
      };
    case FAIL_GET_TIMETABLE:
      return {
        ...state,
        loadings: {[payload.timetableId]: false},
        errors: {...state.errors, [payload.timetableId]: payload.errors},
      };
    case SET_WEEK_TYPES:
      return {
        ...state,
        weekTypes: {
          ...state.weekTypes,
          [payload.timetableId]: structureItemsById(payload.weekTypes),
        },
      };
    case ADD_WEEK_TYPE:
      return {
        ...state,
        weekTypes: {
          ...state.weekTypes,
          [payload.timetableId]: {
            ...(state.weekTypes[payload.timetableId] ?? {}),
            [payload.weekType.id]: payload.weekType,
          },
        },
      };
    case DELETE_WEEK_TYPE:
      return {
        ...state,
        weekTypes: {
          ...state.weekTypes,
          [payload.timetableId]: removePropertyFromObject(
            state.weekTypes[payload.timetableId],
            payload.weekType.id.toString(),
          ),
        },
      };
    case SET_CLASS_TIMES:
      return {
        ...state,
        classTimes: {
          ...state.classTimes,
          [payload.timetableId]: structureItemsById(payload.classTimes),
        },
      };
    case ADD_CLASS_TIME:
      return {
        ...state,
        classTimes: {
          ...state.classTimes,
          [payload.timetableId]: {
            ...(state.classTimes[payload.timetableId] ?? {}),
            [payload.classTime.id]: payload.classTime,
          },
        },
      };
    case DELETE_CLASS_TIME:
      return {
        ...state,
        classTimes: {
          ...state.classTimes,
          [payload.timetableId]: removePropertyFromObject(
            state.classTimes[payload.timetableId],
            payload.classTime.id.toString(),
          ),
        },
      };
    case SET_TEACHERS:
      return {
        ...state,
        teachers: {
          ...state.teachers,
          [payload.timetableId]: structureItemsById(payload.teachers),
        },
      };
    case ADD_TEACHER:
      return {
        ...state,
        teachers: {
          ...state.teachers,
          [payload.timetableId]: {
            ...(state.teachers[payload.timetableId] ?? {}),
            [payload.teacher.id]: payload.teacher,
          },
        },
      };
    case DELETE_TEACHER:
      return {
        ...state,
        teachers: {
          ...state.teachers,
          [payload.timetableId]: removePropertyFromObject(
            state.teachers[payload.timetableId],
            payload.teacher.id.toString(),
          ),
        },
      };
    case ADD_SUBJECT:
      return {
        ...state,
        subjects: {
          ...state.subjects,
          [payload.timetableId]: {
            ...(state.subjects[payload.timetableId] ?? {}),
            [payload.subject.id]: payload.subject,
          },
        },
      };
    case SET_SUBJECTS:
      return {
        ...state,
        subjects: {
          ...state.subjects,
          [payload.timetableId]: structureItemsById(payload.subjects),
        },
      };
    case DELETE_SUBJECT:
      return {
        ...state,
        subjects: {
          ...state.subjects,
          [payload.timetableId]: removePropertyFromObject(
            state.subjects[payload.timetableId],
            payload.subject.id.toString(),
          ),
        },
      };
    default:
      return state;
  }
};
