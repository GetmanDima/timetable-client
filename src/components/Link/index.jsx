import {Text} from "react-native";
import PropTypes from "prop-types";
import {Link as NavigationLink} from "@react-navigation/native";
import styles from "./styles";

const Link = ({to, text, textStyle, style}) => {
  return (
    <NavigationLink to={to} style={style}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </NavigationLink>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

Link.defaultProps = {
  style: {},
  textStyle: {},
};

export default Link;
