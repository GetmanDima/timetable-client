import {View, Text, FlatList, Pressable} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const RecommendationList = ({recommendations, setName, setValue, style}) => {
  return (
    <View style={[styles.wrapper, style]}>
      <FlatList
        data={recommendations}
        keyExtractor={item => item.value}
        renderItem={({item}) => (
          <Pressable
            style={styles.item}
            onPress={() => {
              setName(item.name);
              setValue(item.value);
            }}>
            <Text style={styles.itemText}>{item.text || item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

RecommendationList.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      text: PropTypes.string,
    }),
  ).isRequired,
  setName: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

RecommendationList.defaultProps = {
  visible: true,
  runValidation: () => {},
  style: {},
};

export default RecommendationList;
