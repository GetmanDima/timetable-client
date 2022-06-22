import {View} from "react-native";
import PropTypes from "prop-types";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import {lightColor} from "../../styles/constants";
import ListItem from "../ListItem";
import styles from "./styles";

const EditListItem = ({content, onPressEdit, onPressDelete, style}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <ListItem
        leftContent={<View style={styles.content}>{content}</View>}
        rightContent={
          <View style={styles.buttonWrapper}>
            <MaterialIcon.Button
              onPress={onPressEdit}
              iconStyle={styles.icon}
              backgroundColor={null}
              name="edit"
              size={25}
              color={lightColor}
            />
            <MaterialIcon.Button
              onPress={onPressDelete}
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
};

EditListItem.propTypes = {
  content: PropTypes.element.isRequired,
  onPressEdit: PropTypes.func.isRequired,
  onPressDelete: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

EditListItem.defaultProps = {
  style: {},
};

export default EditListItem;
