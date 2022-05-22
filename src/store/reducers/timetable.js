import {
  SUCCESS_GET_TIMETABLE,
  FAIL_GET_TIMETABLE,
  START_LOADING_TIMETABLE,
  SET_WEEK_TYPES,
  SET_CLASS_TIMES,
  SET_TEACHERS,
  SET_SUBJECTS,
  RESET_TIMETABLE_ERRORS,
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
    case SET_CLASS_TIMES:
      return {
        ...state,
        classTimes: {
          ...state.classTimes,
          [payload.timetableId]: structureItemsById(payload.classTimes),
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
    case SET_SUBJECTS:
      return {
        ...state,
        subjects: {
          ...state.subjects,
          [payload.timetableId]: structureItemsById(payload.subjects),
        },
      };
    default:
      return state;
  }
};
