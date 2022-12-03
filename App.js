import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ThemedView, ThemedText, ThemedButton} from "./components/ThemedComponents";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import PasswordManagerLanding from "./pages/PasswordManager/PasswordManagerLanding.jsx";
import PasswordManagerHome from "./pages/PasswordManager/PasswordManagerHome";
import PasswordManagerList from "./pages/PasswordManager/PasswordManagerList";
import PasswordManagerDetail from "./pages/PasswordManager/PasswordManagerDetail.jsx";
import PasswordManagerAddAccount from "./pages/PasswordManager/PasswordManagerAddAccount";
import PasswordManagerGeneratePassword from "./pages/PasswordManager/PasswordManagerGeneratePassword.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator
              screenOptions={{headerShown: false}}
          >
            <Stack.Screen
                name={"Home"}
                component={Home}
                options={{title: 'Home'}}
            />
            <Stack.Screen
                name={"Profile"}
                component={Profile}
                options={{title: 'Profile'}}
            />
            <Stack.Screen
                name={"Password-Manager"}
                component={PasswordManagerLanding}
                options={{title: 'Password Manager'}}
            />
            <Stack.Screen
                name={"Password-Manager-Home"}
                component={PasswordManagerHome}
                options={{title: 'Password Manager'}}
            />
            <Stack.Screen
                name={"Password-Manager-List"}
                component={PasswordManagerList}
                options={{title: 'Password Manager'}}
            />
            <Stack.Screen
                name={"Password-Manager-Detail"}
                component={PasswordManagerDetail}
                options={{title: 'Password Manager'}}
            />
            <Stack.Screen
                name={"Password-Manager-Add-Account"}
                component={PasswordManagerAddAccount}
                options={{title: 'Password Manager'}}
            />
            <Stack.Screen
                name={"Password-Manager-Generate-Password"}
                component={PasswordManagerGeneratePassword}
                options={{title: 'Password Manager'}}
            />

          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
