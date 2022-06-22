import {View} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const ListItem = ({leftContent, rightContent, style}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.content}>
        <View style={styles.left}>{leftContent}</View>
        {rightContent}
      </View>
    </View>
  );
};

ListItem.propTypes = {
  leftContent: PropTypes.element,
  rightContent: PropTypes.element,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

ListItem.defaultProps = {
  style: {},
};

export default ListItem;
