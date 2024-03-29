/*
* Importing inbuilt components
* */
import React, { Component } from "react";
import { StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**
 * Importing pages
 * */

/*
* Importing commons
* */
import Profile from "./src/pages/Profile";
import Home from "./src/pages/Home";

/*
* Settings Imports
* */
import Settings from "./src/pages/Settings/Settings";
import PasswordManagerSettings from "./src/pages/Settings/PasswordManagerSettings";
import AccountSettings from "./src/pages/Settings/AccountSettings";

/*
* Password Manager Imports
* */
import PasswordManagerLanding from "./src/pages/PasswordManager/PasswordManagerLanding.jsx";
import PasswordManagerHome from "./src/pages/PasswordManager/PasswordManagerHome";
import PasswordManagerList from "./src/pages/PasswordManager/PasswordManagerList";
import PasswordManagerDetail from "./src/pages/PasswordManager/PasswordManagerDetail.jsx";
import PasswordManagerAddAccount from "./src/pages/PasswordManager/PasswordManagerAddAccount";
import PasswordManagerGeneratePassword from "./src/pages/PasswordManager/PasswordManagerGeneratePassword.jsx";

/*
* Disabling Warn messages
* */
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state. Check:'])
LogBox.ignoreLogs(['Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.'])
// LogBox.ignoreLogs(['Can\'t call setState on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the PasswordManagerDetail component.'])

export default class App extends Component {
  constructor(props) {
    super(props);

    // this.PasswordManager = React.lazy(()=> {
    //   return import("./src/pages/PasswordManager/PasswordManagerLanding.jsx")
    // })
  }
  render() {
    const Stack = createNativeStackNavigator();
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
            <Stack.Screen
                name={"Settings"}
                component={Settings}
                options={{title: 'Settings'}}
            />
            <Stack.Screen
                name={"Settings-Password-Manager"}
                component={PasswordManagerSettings}
                options={{title: 'Settings'}}
            />
            <Stack.Screen
                name={"Settings-Account-Info"}
                component={AccountSettings}
                options={{title: 'Settings'}}
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
