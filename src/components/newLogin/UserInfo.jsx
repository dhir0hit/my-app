import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import Settings, {SetName, SetPin, SetFontSize, SetTheme, SetSettings} from "../../service/Settings";

import Logo from '../../../assets/adaptive-icon.png'
import passManagerScreenShot from '../../../assets/passManagerScreenshot.png'
import themeScreenShot from '../../../assets/themeScreenshot.png'
import {ThemedAntDesign, ThemedButton} from "../ThemedComponents";
import {LinearGradient} from "expo-linear-gradient";

const UserInfo = (props) => {
  const [Username, setUsername] = useState('');
  const [Pin, setPin] = useState('');
  const [Theme, setTheme] = useState('');
  const [isValidUsername, setValidUsername] = useState(0);
  const [isValidPin, setValidPin] = useState(0);
  const [isValidTheme, setValidTheme] = useState(0);

  const Submit = () => {
    let temp = props.settingService;

    if (Username && !isValidUsername) {
      temp['username'] = Username;

      SetSettings(JSON.stringify(temp))
          .then((value) => {
            if (value) {
              setValidUsername(1);
            }
          })

    }
    if (Pin && !isValidPin) {
      temp['pin'] = Pin
      SetSettings(JSON.stringify(temp))
          .then((value) => {
            if (value) {
              setValidPin(1);
            }
          })

    }
  }

  const inputTheme = (Theme) => {
    let temp = props.settingService;
    temp['theme'] = Theme
    SetSettings(JSON.stringify(temp))
        .then((value) => {
          if (value) {
            setValidTheme(1);
          }
        })

  }

  useEffect(() => {
    if (isValidUsername && isValidPin && isValidTheme) {
      props.setComplete(0);
    }
  }, [isValidUsername, isValidPin, isValidTheme]);

    return <View style={{...styles.mainContainer, backgroundColor: props.settingService.theme.background}}>
      <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
        {
          isValidUsername ? <>
              {
                isValidPin ? <>
                      <Image
                          style={{width: 200, height: 300, marginVertical: 20}}
                          source={themeScreenShot}
                          contentFit={"contain"}
                      />
                      <Text style={{color: props.settingService.theme.text, fontSize: 20}}>Select Theme</Text>
                    </>
                    : <>
                      <Image
                          style={{width: 200, height: 300, marginVertical: 20}}
                          source={passManagerScreenShot}
                          contentFit={"contain"}
                      />
                      <Text style={{color: props.settingService.theme.text, fontSize: 20}}>Save Your Passwords</Text>
                    </>
              }
              </>
            : <>
                <Text style={{color: props.settingService.theme.text, fontSize: 30}}>MY APP</Text>
                <Image
                    style={{width: 100, height: 100, marginVertical: 20}}
                    source={Logo}
                    contentFit={"contain"}
                />
                <Text style={{color: props.settingService.theme.text}}>One App for Everything</Text>
              </>
        }

      </View>
      <View style={{flex: 1, width: 200}}>
        {
          isValidUsername ? <>
                {
                  isValidPin ? <>

                      </>
                      : <>
                        <Text style={{...styles.label, color: props.settingService.theme.text}}>Enter a Pin</Text>
                        <TextInput
                            key={'pin'}
                            style={{
                              ...styles.input,
                              ...styles.label,
                              color: props.settingService.theme.text,
                              borderBottomColor: props.settingService.theme.text,
                            }}
                            defaultValue={Pin}
                            onChangeText={(value) => {
                              setPin(value);
                            }}
                            keyboardType={'numeric'}
                        />
                      </>
                }
              </>
              : <>
                  <Text style={{...styles.label, color: props.settingService.theme.text}}>Enter Your Name</Text>
                  <TextInput
                      style={{
                        ...styles.input,
                        ...styles.label,
                        color: props.settingService.theme.text,
                        borderBottomColor: props.settingService.theme.text,
                      }}
                      onChangeText={(value) => {
                        setUsername(value);
                      }}
                  />
              </>
        }

        {
          !isValidUsername || !isValidPin
              ? <ThemedButton
                  onPress={Submit}
                  style={{...styles.button, backgroundColor: props.settingService.theme.highlight}}
              >
                <Text style={{color: props.settingService.theme.text}}>SUBMIT</Text>
              </ThemedButton>
              : <>
                <View>
                  <ThemedButton
                      theme={'transparent'}
                      onPress={() => inputTheme({text: "#fffcf2", background: "#252422",primary: "", secondary: "#403d39", highlight: "#d35322"})}
                  >
                    <LinearGradient
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingVertical: 5,
                          marginTop: 5,
                        }}
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 1}}
                        colors={['#252422', '#403d39']}
                    >
                      {/*primary button*/}
                      <View style={{backgroundColor: '#d35322', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 4}}>
                        <Text style={{color: '#fffcf2'}}>Theme 1</Text>
                      </View>
                    </LinearGradient>
                  </ThemedButton>

                  <ThemedButton
                      theme={'transparent'}
                      onPress={() => inputTheme({text: "#ede0ff", background: "#312244",primary: "", secondary: "#1b3a4b", highlight: "#4d194d"})}
                  >
                    <LinearGradient
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingVertical: 5,
                          marginTop: 5,
                        }}
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 1}}
                        colors={['#312244', '#1b3a4b']}
                    >
                      {/*primary button*/}
                      <View style={{backgroundColor: '#4d194d', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 4}}>
                        <Text style={{color: '#ede0ff'}}>Theme 1</Text>
                      </View>
                    </LinearGradient>
                  </ThemedButton>

                  <ThemedButton
                      theme={'transparent'}
                      onPress={() => inputTheme({text: "#343434", background: "#feeafa",primary: "", secondary: "#dee2ff", highlight: "#829aaf"})}
                  >
                    <LinearGradient
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingVertical: 5,
                          marginTop: 5,
                        }}
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 1}}
                        colors={['#feeafa', '#dee2ff']}
                    >
                      {/*primary button*/}
                      <View style={{backgroundColor: '#829aaf', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 4}}>
                        <Text style={{color: '#343434'}}>Theme 1</Text>
                      </View>
                    </LinearGradient>
                  </ThemedButton>

                  <ThemedButton
                      theme={'transparent'}
                      onPress={() => inputTheme({text: "#343434", background: "#e5e5e5",primary: "", secondary: "#3A86FF", highlight: "#FFD60A"})}
                  >
                    <LinearGradient
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingVertical: 5,
                          marginTop: 5,
                        }}
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 1}}
                        colors={['#e5e5e5', '#3A86FF']}
                    >
                      {/*primary button*/}
                      <View style={{backgroundColor: '#FFD60A', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 4}}>
                        <Text style={{color: '#343434'}}>Theme 1</Text>
                      </View>
                    </LinearGradient>
                  </ThemedButton>
                </View>
              </>
        }
      </View>
    </View>
}

export default UserInfo;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    marginVertical: 5,
  },
  input: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
  }
})