// importing built in components
import React, {useEffect, useRef, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {Pressable, ScrollView, StyleSheet, View, Text} from "react-native";

// Importing third party components
import Slider from '@react-native-community/slider';
import {LinearGradient} from "expo-linear-gradient";

// Importing custom components
import {ThemedAntDesign, ThemedButton, ThemedText, ThemedView} from "../../components/ThemedComponents";
import {default as SettingService, SetSettings, SetFontSize} from "../../service/Settings";
import Loading from "../../components/Loading";

const Themes = {
  light: [
      {text: "#343434", background: "#e5e5e5",primary: "", secondary: "#3A86FF", highlight: "#FFD60A"},
      {text: "#343434", background: "#e5e5e5",primary: "", secondary: "#cbf3f0", highlight: "#ffbf69"},
      {text: "#343434", background: "#feeafa",primary: "", secondary: "#dee2ff", highlight: "#829aaf"},
      {text: "#343434", background: "#dad7cd",primary: "", secondary: "#588157", highlight: "#63937b"},
  ],
  dark: [
      {text: "#fffcf2", background: "#000814",primary: "", secondary: "#003566", highlight: "#dca800"},
      {text: "#fffcf2", background: "#252422",primary: "", secondary: "#403d39", highlight: "#d35322"},
      {text: "#fffcf2", background: "#03071e",primary: "", secondary: "#5b010b", highlight: "#faa307"},
      {text: "#ede0ff", background: "#312244",primary: "", secondary: "#1b3a4b", highlight: "#4d194d"},
  ],
  custom: [
      {text: "#fffcf2", background: "#000814",primary: "", secondary: "#003566", highlight: "#dca800"},
  ]
}

/*TODO: CREATE THEME CHANGER*/
/*TODO: Make button for gradient or solid background*/
export default function Settings(props) {
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
  const [isShowTheme, setShowTheme] = useState(0)


  /*
  * Importing settings from local storage
  * Using local service
  * */
  SettingService()
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

  const changeFontSize = () => {
    SetFontSize(settings.fontSize)
        .then(() => {
          /*TODO: show error*/
        })
  }

  const ChangeTheme = (theme) => {
    let temp = {
      username: settings.username,
      pin: settings.pin,
      fontSize: settings.fontSize,
      theme: theme
    };
    SetSettings(JSON.stringify(temp))
        .then((result) => {
          if (result) {
            setSettings(temp);
            props.route.params.settingsService();
          }
          /*TODO: display error*/
        })
  }


  if (isReady) {
    return (
        <View style={{flex: 1}}>
          <LinearGradient
              style={{flex: 1}}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}
              colors={[settings.theme.background, settings.theme.secondary]}
          >
          <View style={{...styles.TopBar, marginTop: 45, marginBottom: 5}}>
            <View style={{display: "flex", alignItems: "flex-start", overflow: "visible"}}>
              <Pressable
                  onPress={() => {
                    props.navigation.goBack()
                  }}
                  style={{backgroundColor: "rgba(101,101,101,0.4)", padding: 10}}
              >
                <ThemedAntDesign name={"left"} size={24} color={"white"}/>
              </Pressable>
            </View>
            <Text style={{color: settings.theme.text}}>Settings</Text>
          </View>
          <ScrollView>
            <StatusBar style="auto"/>

            <View>
              <View style={styles.container}>
                <Text style={{...styles.heading, color: settings.theme.text}}>General Settings</Text>
                <View style={styles.subContainer}>
                  <Text style={{...styles.normalText, color: settings.theme.text}}>Font Size: {settings['fontSize']}</Text>
                  <View style={{marginVertical: 5}}>
                    <Text
                        style={{
                          fontSize: parseFloat(settings.fontSize),
                          height: 80,
                          color: settings.theme.text,
                          borderRadius: 4,
                          backgroundColor: "rgba(255,255,255,0.1)",
                          padding: 4
                        }}
                    >The quick brown fox jumps over the lazy dog</Text>
                    <View style={styles.SliderContainer}>
                      <Text style={{color: settings.theme.text}}>10</Text>
                      <Slider
                          style={{width: "92%", height: 40}}
                          minimumValue={10}
                          maximumValue={30}
                          minimumTrackTintColor="#FFFFFF"
                          maximumTrackTintColor="#000000"
                          defaultValue={parseFloat(settings.fontSize)}
                          onValueChange={(value) => {
                            // had to create whole new variable so new object is created
                            let temp = {
                              username: settings.username,
                              pin: settings.pin,
                              fontSize: Math.round(parseFloat(value) * 100) / 100,
                              theme: settings.theme
                            };
                            setSettings(temp);
                          }}
                      />
                      <Text style={{color: settings.theme.text}}>30</Text>
                    </View>

                    <ThemedButton
                        style={{padding: 10,
                          backgroundColor: settings.theme.highlight+'90',
                          fontWeight: 900,
                          borderRadius: 4,
                          display: "flex",
                          flexDirection: "row-reverse",
                          justifyContent: "center",
                          alignItems: "center"}}
                    >
                      <Text style={{color: settings.theme.text, paddingLeft: 10}}>Change Font Size</Text>
                      <ThemedAntDesign style={{color: settings.theme.text}} name={'check'}/>
                    </ThemedButton>

                  </View>
                  <Text style={{...styles.heading, color: settings.theme.text}}>Theme</Text>


                  <View style={{marginVertical: 5}}>
                    <View style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around"
                    }}>
                      <ThemedButton
                          style={{backgroundColor: settings.theme.secondary+'90', borderRadius: 4, paddingHorizontal: 45, paddingVertical: 10}}
                          onPress={()=> {setShowTheme(()=>"light")}}
                      >
                        <Text style={{color: settings.theme.text}}>Light</Text>
                      </ThemedButton>
                      <ThemedButton
                          style={{backgroundColor: settings.theme.secondary+'90', borderRadius: 4, paddingHorizontal: 45, paddingVertical: 10}}
                          onPress={() => {setShowTheme(()=>"dark")}}
                      >
                        <Text style={{color: settings.theme.text}}>Dark</Text>
                      </ThemedButton>

                      <ThemedButton
                          style={{backgroundColor: settings.theme.secondary+'90', borderRadius: 4, paddingHorizontal: 45, paddingVertical: 10}}
                          onPress={() => {setShowTheme(()=>"custom")}}
                      >
                        <Text style={{color: settings.theme.text}}>Custom</Text>
                      </ThemedButton>
                    </View>
                    {
                      isShowTheme
                          ? <>
                            {
                              isShowTheme === "dark"
                                  ? <ThemesList type={'dark'} ChangeTheme={ChangeTheme}/>
                                  :
                                  isShowTheme === "light"
                                      ? <ThemesList type={'light'} ChangeTheme={ChangeTheme}/>
                                      : <ThemesList type={'custom'} ChangeTheme={ChangeTheme}/>
                            }
                          </>
                          : ""
                    }
                  </View>
                </View>
              </View>

              <ThemedButton style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                backgroundColor: settings.theme.secondary+'90',
                marginTop: 5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}>
                <ThemedAntDesign name={'user'}/>
                <Text style={{...styles.heading, marginLeft: 10, color: settings.theme.text}}>Account</Text>
              </ThemedButton>

              <ThemedButton
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    backgroundColor: settings.theme.secondary+'90',
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    props.navigation.navigate('Settings-Password-Manager')
                  }}>
                <ThemedAntDesign name={'unlock'}/>
                <Text style={{...styles.heading, marginLeft: 10, color: settings.theme.text}}>Password Manager</Text>
              </ThemedButton>

              <View style={{...styles.container, marginTop: 5}}>
                <Text style={{...styles.heading, color: settings.theme.text}}>Support</Text>

                <View style={styles.subContainer}>
                  <ThemedButton theme={'transparent'} style={styles.navigationButton}>
                    <Text style={{color: settings.theme.text}}>About</Text>
                    <ThemedAntDesign name={'right'}/>
                  </ThemedButton>
                  <ThemedButton theme={'transparent'} style={styles.navigationButton}>
                    <Text style={{color: settings.theme.text}}>Make Requests</Text>
                    <ThemedAntDesign name={'right'}/>
                  </ThemedButton>
                  <ThemedButton theme={'transparent'} style={styles.navigationButton}>
                    <Text style={{color: settings.theme.text}}>Help/FAQ</Text>
                    <ThemedAntDesign name={'right'}/>
                  </ThemedButton>
                  <ThemedButton theme={'transparent'} style={styles.navigationButton}>
                    <Text style={{color: settings.theme.text}}>Report an Issue</Text>
                    <ThemedAntDesign name={'right'}/>
                  </ThemedButton>
                  <ThemedButton theme={'transparent'} style={styles.navigationButton}>
                    <Text style={{color: settings.theme.text}}>Contact Us</Text>
                    <ThemedAntDesign name={'right'}/>
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

const ThemesList = (props) => {
  let _List = [];

  for (const theme of Themes[props.type]) {
    _List.push(
        <ThemedButton
            key={props.type + Themes[props.type].indexOf(theme)}
            theme={'transparent'}
            onPress={() => props.ChangeTheme(theme)}
        >

          <LinearGradient
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 15,
                marginTop: 5,
                borderRadius: 4,
              }}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              colors={[theme.background, theme.secondary]}
          >
            {/*primary button*/}
            <View style={{backgroundColor: theme.highlight, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 4}}>
              <Text style={{color: theme.text}}>Button</Text>
            </View>
            {/*secondary button*/}
            <View style={{backgroundColor: theme.secondary, marginHorizontal: 20 ,paddingHorizontal: 20, paddingVertical: 10, borderRadius: 2}}>
              <Text style={{color: theme.text}}>Secondary</Text>
            </View>
            {/*Text*/}
            <Text style={{color: theme.text}}>Text</Text>
            <ThemedAntDesign style={{color: theme.text, marginLeft: 20}} name={'exclamationcircle'} />
          </LinearGradient>
        </ThemedButton>
    )
  }
  return _List;
}

const styles = StyleSheet.create({
  TopBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  container: {
    // marginHorizontal: 10,
    // backgroundColor: "rgba(134,134,134,0.3)",
    padding: 10,
  },
  subContainer: {
    marginVertical: 5,
  },
  heading: {
    fontSize: 20,
  },
  normalText: {
    fontSize: 15,
  },
  navigationButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 2,

    borderStyle: "solid",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  SliderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  themeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",

    borderStyle: "solid",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    // backgroundColor: "rgba(255,255,255,0.07)",
    margin: 5,
  },
  themeItem: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
  }
})