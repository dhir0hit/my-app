import {
  ThemedAntDesign,
  ThemedButton,
  ThemedText,
} from "../../components/ThemedComponents";
import {Pressable, ScrollView, StyleSheet, TextInput, View, Text} from "react-native";
import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import Settings from "../../service/Settings";
import Loading from "../../components/Loading";

export default function PasswordManagerSettings(props) {
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

  const [editPin, SetEditPin] = useState(false);
  const [pin, setPin] = useState("1234");


  if (isReady) {
    return (
        <View style={{flex: 1}}>
          <LinearGradient
              style={{flex: 1, paddingHorizontal: 10}}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}
              colors={[settings.theme.background, settings.theme.secondary]}
          >
            <View style={{...styles.TopBar, marginTop: 45}}>
              <View style={{display: "flex", alignItems: "flex-start", overflow: "visible"}}>
                <Pressable
                    onPress={() => {
                      props.navigation.goBack()
                    }}
                    style={{backgroundColor: "rgba(101,101,101,0.4)", padding: 10}}
                >
                  <ThemedAntDesign name={"left"} size={24} color={settings.theme.text}/>
                </Pressable>
              </View>
              <Text style={{color: settings.theme.text}}>Settings</Text>
            </View>

            <ScrollView>
              <StatusBar style="auto"/>

              <View style={styles.container}>
                <View>
                  <Text style={{...styles.label, color: settings.theme.text}}>Pin</Text>

                  <View style={{...styles.inputContainer, borderBottomColor: settings.theme.text}}>
                    {
                      editPin
                          ? <TextInput
                              style={{...styles.input, color: settings.theme.text}}
                              value={pin}
                          />
                          : <ThemedText style={{...styles.input, color: settings.theme.text}}>{pin}</ThemedText>
                    }

                    <ThemedButton
                        theme={'transparent'}
                        onPress={(value) => {
                          SetEditPin(!editPin)

                          if (editPin) {
                            console.log("pin")
                          }
                        }}
                    >
                      <ThemedAntDesign name={editPin ? 'close' : 'edit'}/>
                    </ThemedButton>
                  </View>
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
    )
  } else {
    return <Loading />
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  TopBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  container: {
    marginVertical: 10
  },
  label: {
    fontSize: 20,
    textTransform: "uppercase",
  },
  input: {
    fontSize: 15,
    height: 40,
    padding: 6,
    margin: 0,
    minWidth: '80%'
    // borderColor: 'transparent'
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderStyle: "solid",
    borderBottomWidth: 1,
  }
})
