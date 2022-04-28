import {useMemo} from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";
import PickerItem from "./PickerItem";
import styles from "./styles";

const PickerModal = ({
  items,
  visible,
  loading,
  onEndReachedThreshold,
  onValueChange,
  onRequestClose,
  onEndReached,
  style,
}) => {
  const visibleItems = useMemo(() => {
    return [{id: {}}, ...items.filter(item => item.visible !== false)];
  }, [items]);

  const renderPickerItem = ({item}) => {
    return typeof item.id === "object" ? (
      <View item={{}} style={{height: 1}}></View>
    ) : (
      <PickerItem
        item={item}
        onValueChange={value => {
          onValueChange(value);
          onRequestClose();
        }}
      />
    );
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableWithoutFeedback
        onPress={() => {
          onRequestClose();
        }}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <View
          style={[
            styles.itemsWrapper,
            {
              height: 55 * (visibleItems.length - 1) + (loading ? 60 : 30),
            },
            style,
          ]}>
          <FlatList
            onEndReached={onEndReached}
            onEndReachedThreshold={onEndReachedThreshold}
            data={visibleItems}
            renderItem={renderPickerItem}
          />
          {loading && <Text style={styles.loader}>Loading...</Text>}
        </View>
      </View>
    </Modal>
  );
};

PickerModal.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({label: PropTypes.string, value: PropTypes.any}),
  ).isRequired,
  loading: PropTypes.bool,
  onEndReachedThreshold: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

PickerModal.defaultProps = {
  loading: false,
  onEndReachedThreshold: 0.01,
  style: {},
};

export default PickerModal;
