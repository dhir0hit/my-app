import {ThemedButton, ThemedText} from "../components/ThemedComponents";
import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View, Pressable} from "react-native";
import {useEffect, useState} from "react";
import Loading from "../components/Loading";
import Settings, {SettingsStorageJSONFormat} from "../service/Settings";
import {LinearGradient} from "expo-linear-gradient";
import {useIsFocused} from "@react-navigation/native";
import UserInfo from "../components/newLogin/UserInfo";

function Home(props) {
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
  const [isFirstTimeLogin, setFirstTimeLogin] = useState(0);

  const isFocused = useIsFocused()

  useEffect(() => {}, [isFocused]);

  function loadSettingService () {
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

          if (!settings.username || !settings.pin) {
            // settings first time login true
            // so we can show prompt
            setFirstTimeLogin(1)
          }
        })
    ;
  }
  loadSettingService();

  // console.log(settings['theme']);
  if (isReady) {
    return <>
      {
        isFirstTimeLogin
            ? <UserInfo
                settingService={settings}
                setSettingService={(value)=>setSettings(value)}
                setComplete={(value)=>{setFirstTimeLogin(value); console.log(value)}}
            />
            : <></>
      }


        <View>
          <LinearGradient
              style={{...styles.container, paddingTop: 40}}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}
              colors={[settings.theme.background, settings.theme.secondary]}
          >
          <Text style={{...styles.titleStyle, color: settings.theme.text}}>{props.route.name}</Text>
          <StatusBar style="auto"/>

          <View style={{flex: 1, width: '100%', paddingVertical: 20, paddingHorizontal: 10}}>
            <ThemedButton
                style={{...styles.button, backgroundColor: settings.theme.secondary+'90'}}
                onPress={() => {
                  props.navigation.navigate('Profile', {name: 'User'})
                }}
            >
              <ThemedText style={{...styles.titleStyle, color: settings.theme.text}} theme={'highlight'}>
                Profile
              </ThemedText>
            </ThemedButton>
            <ThemedButton
                style={{...styles.button, backgroundColor: settings.theme.secondary+'90'}}
                onPress={() => {
                  props.navigation.navigate('Password-Manager')
                }}
            >
              <ThemedText style={{...styles.titleStyle, color: settings.theme.text}} theme={'highlight'}>
                Password Manager
              </ThemedText>
            </ThemedButton>

            <ThemedButton
                style={{...styles.button, backgroundColor: settings.theme.secondary+'90'}}
                onPress={() => {
                  props.navigation.navigate('Settings', {settingsService: loadSettingService})
                }}
            >
              <ThemedText style={{...styles.titleStyle, color: settings.theme.text}} theme={'highlight'}>
                Settings
              </ThemedText>
            </ThemedButton>
          </View>
          </LinearGradient>
        </View>
    </>
  } else {
    return <Loading />;
  }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        fontSize: 20,
    },
    button: {
      width: '100%',
      marginVertical: 5,
      paddingVertical: 20,
      paddingHorizontal: 30,
      borderRadius: 4,
      // backgroundColor: 'rgba(255,255,255,0.25)',
    }
});
