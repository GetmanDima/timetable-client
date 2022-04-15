import {useState, useRef, useEffect} from "react";
import {View, Modal} from "react-native";
import PropTypes from "prop-types";
import RecommendationList from "./RecommendationList";
import Button from "../../Button";
import FlatInput from "../../FlatInput";
import styles from "./styles";
import mainStyles from "../../../styles/styles";

const InputPickerModal = ({
  visible,
  value,
  name,
  label,
  setVisible,
  setValue,
  setName,
  runValidation,
  fetchRecommendations,
  style,
}) => {
  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const requestTimer = useRef(null);

  useEffect(() => {
    setSearch(name);
  }, [name]);

  useEffect(() => {
    if (!visible) {
      if (requestTimer.current) {
        clearTimeout(requestTimer.current);
      }

      if (!value) {
        setName("");
      }

      setRecommendations([]);
    }
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
      style={style}>
      <View
        style={[
          mainStyles.containerCenter,
          mainStyles.overflowScreen,
          styles.modalWrapper,
        ]}>
        <View style={styles.modal}>
          <View style={styles.inputWrapper}>
            <View style={{flex: 1}}>
              <FlatInput
                label={label}
                value={search}
                onChange={search => {
                  if (search.length > 1) {
                    if (requestTimer.current) {
                      clearTimeout(requestTimer.current);
                    }

                    requestTimer.current = setTimeout(() => {
                      fetchRecommendations({search}).then(data => {
                        setRecommendations(data);
                      });
                    }, 1500);
                  } else {
                    if (recommendations.length > 0) {
                      setRecommendations([]);
                    }
                  }

                  if (value) {
                    setValue("");
                  }

                  setSearch(search);
                }}
              />
            </View>
            <Button
              text="OK"
              onPress={() => {
                setVisible(false);
                runValidation();
              }}
              style={styles.confirmButton}
            />
          </View>
          {search.length > 1 && (
            <View style={[styles.recommendationWrapper, mainStyles.mt4]}>
              <RecommendationList
                recommendations={recommendations}
                setName={v => {
                  setSearch(v);
                  setName(v);
                }}
                setValue={setValue}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

InputPickerModal.propTypes = {
  visible: PropTypes.bool,
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  runValidation: PropTypes.func,
  fetchRecommendations: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

InputPickerModal.defaultProps = {
  visible: true,
  runValidation: () => {},
  style: {},
};

export default InputPickerModal;
