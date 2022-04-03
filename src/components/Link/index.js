import {Text} from "react-native";
import PropTypes from "prop-types";
import {Link as NavigationLink} from "@react-navigation/native";
import styles from "./styles";

const Link = ({to, text, style}) => {
  return (
    <NavigationLink to={to} style={style}>
      <Text style={styles.text}>{text}</Text>
    </NavigationLink>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

Link.defaultProps = {
  style: {},
};

export default Link;
