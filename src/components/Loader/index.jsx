import {Text, View, Modal} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const Loader = ({style}) => {
  return (
    <Modal animationType="fade" transparent={true}>
      <View style={[styles.container, style]}>
        <View style={styles.inner}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

Loader.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

Loader.defaultProps = {
  style: {},
};

export default Loader;
