import {Text, View, Modal as ReactModal} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import mainStyles from "../../styles/styles";
import Button from "../Button";
import {typesToLightColors} from "../../styles/constants";

const Modal = ({header, body, buttonText, visible, type, onPress, style}) => {
  return (
    <ReactModal animationType="slide" transparent={true} visible={visible}>
      <View style={[mainStyles.containerCenter, mainStyles.overflowScreen]}>
        <View style={[mainStyles.containerCenter, style]}>
          <View
            style={[styles.modal, {backgroundColor: typesToLightColors[type]}]}>
            <Text style={[mainStyles.h1, styles.header]}>{header}</Text>
            <Text style={[mainStyles.text, mainStyles.mt3, styles.body]}>
              {body}
            </Text>
            <Button
              text={buttonText}
              type={type}
              style={mainStyles.mt4}
              onPress={onPress}
            />
          </View>
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
