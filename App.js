import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ThemedText, ThemedView, ThemedButton} from "./src/components/ThemedComponents";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";


import Profile from "./src/pages/Profile";
import Home from "./src/pages/Home";
import Settings from "./src/pages/Settings";

/*
* Password Manager Imports
* */
import PasswordManagerLanding from "./src/pages/PasswordManager/PasswordManagerLanding.jsx";
import PasswordManagerHome from "./src/pages/PasswordManager/PasswordManagerHome";
import PasswordManagerList from "./src/pages/PasswordManager/PasswordManagerList";
import PasswordManagerDetail from "./src/pages/PasswordManager/PasswordManagerDetail.jsx";
import PasswordManagerAddAccount from "./src/pages/PasswordManager/PasswordManagerAddAccount";
import PasswordManagerGeneratePassword from "./src/pages/PasswordManager/PasswordManagerGeneratePassword.jsx";


import React, {Component} from "react";

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
