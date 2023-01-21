import { StyleSheet, View, Text } from "react-native";
import { ThemedButton } from "../components/ThemedComponents";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import Settings from "../service/Settings";
import Loading from "../components/Loading";
import {LinearGradient} from "expo-linear-gradient";

function Profile(props) {
  const [isReady, setReady] = useState(0);
  const [settings, setSettings] = useState(
      {
        username: "",
        pin: "",
        fontSize: 10,
        theme: {
          text: "",
          background: "",
          primary: "",
          secondary: "",
          highlight: "",
        }
      }
  );

  Settings()
      .then((value) => {
        let result = JSON.parse(value);

        settings['username'] = result['username'];
        settings['pin'] = result['pin'];
        settings['fontSize'] = result['fontSize'];
        settings['theme'] = result['theme'];

        setSettings(settings);
        // console.log(result['pin'])
        setReady(1);
      })
  ;

  if (isReady) {
    return (
        <View >
          <LinearGradient
              style={{...styles.container}}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}
              colors={[settings.theme.background, settings.theme.secondary]}
          >
          <Text style={{color: settings.theme.text}}>Open up App.js to start working on your app!</Text>
          <Text style={{color: settings.theme.text}}>{props.route.name}</Text>
          <Text style={{color: settings.theme.text}}>{props.route.params.name}</Text>
          <StatusBar style="auto"/>
          <ThemedButton title={"Button"} onPress={() => {
            props.navigation.goBack();
          }}/>
          </LinearGradient>
        </View>
    )
  } else {
    return <Loading />;
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default Profile;
