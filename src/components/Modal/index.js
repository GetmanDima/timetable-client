import {Text, View, Modal as ReactModal} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Button from "../Button";
import {typesToLightColors} from "../../styles/constants";

const Modal = ({header, body, buttonText, visible, type, onPress, style}) => {
  return (
    <ReactModal animationType="slide" transparent={true} visible={visible}>
      <View style={[styles.container, style]}>
        <View
          style={[styles.inner, {backgroundColor: typesToLightColors[type]}]}>
          <Text style={styles.header}>{header}</Text>
          <Text style={styles.body}>{body}</Text>
          <Button
            text={buttonText}
            type={type}
            style={styles.button}
            onPress={onPress}
          />
        </View>
      </View>
    </ReactModal>
  );
};

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  visible: PropTypes.bool,
  type: PropTypes.oneOf(["primary", "danger"]),
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

Modal.defaultProps = {
  buttonText: "OK",
  visible: true,
  type: "primary",
  onPress: () => {},
  style: {},
};

export default Modal;
