import {Text, View, Modal} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import mainStyles from "../../styles/styles";

const Loader = ({style}) => {
  return (
    <Modal animationType="fade" transparent={true} style={style}>
      <View style={[mainStyles.containerCenter, mainStyles.overflowScreen]}>
        <View style={styles.modal}>
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
