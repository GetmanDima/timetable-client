import {StyleSheet} from "react-native";
import {
  primaryColor,
  whiteColor,
  lightDarkColor,
  h1FontSize,
} from "../../styles/constants";

export default StyleSheet.create({
  modal: {
    backgroundColor: lightDarkColor,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  form: {
    alignItems: "center",
  },
  header: {
    fontSize: h1FontSize,
    color: whiteColor,
    marginTop: 50,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    backgroundColor: primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderTopRightRadius: 0,
  },
  closeButtonText: {
    fontSize: 20,
    color: whiteColor,
  },
  input: {
    marginTop: 16,
  },
  button: {
    marginTop: 32,
  },
});
