import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import store from "./src/store/store";
import Navigation from "./src/Navigation";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
