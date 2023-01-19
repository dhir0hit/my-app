import React, {useRef, useState} from "react";
import {ThemedAntDesign, ThemedButton, ThemedText, ThemedView} from "../../components/ThemedComponents";
import {StatusBar} from "expo-status-bar";
import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import Slider from '@react-native-community/slider';
import {LinearGradient} from "expo-linear-gradient";

/*TODO: CREATE THEME CHANGER*/
export default function Settings(props) {

  const [fontSize, SetFontSize] = useState(0);

  return (
      <ThemedView style={{flex: 1}}>
        <View style={{...styles.TopBar, marginTop: 45, marginBottom: 5}}>
          <View style={{display: "flex", alignItems: "flex-start", overflow: "visible"}}>
            <Pressable
                onPress={() => {props.navigation.goBack()}}
                style={{backgroundColor: "rgba(101,101,101,0.4)", padding: 10}}
            >
              <ThemedAntDesign name={"left"} size={24} color={"white"} />
            </Pressable>
          </View>
          <ThemedText>Settings</ThemedText>
        </View>
        <ScrollView>
        <StatusBar style="auto"/>

        <View>
          <View style={styles.container}>
            <ThemedText style={styles.heading}>General Settings</ThemedText>
            <View style={styles.subContainer}>
              <ThemedText style={styles.normalText}>Font Size: {fontSize}</ThemedText>
              <View style={{marginVertical: 5}}>
                <ThemedText
                    style={{fontSize: fontSize,
                      height: 80,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      padding: 4}}
                >The quick brown fox jumps over the lazy dog</ThemedText>
                <View style={styles.SliderContainer}>
                  <ThemedText>10</ThemedText>
                  <Slider
                      style={{width: "92%", height: 40}}
                      minimumValue={10}
                      maximumValue={30}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#000000"
                      value={15}
                      onValueChange={(value)=>{SetFontSize(Math.round(parseFloat(value) * 100) / 100)}}
                  />
                  <ThemedText>30</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.normalText}>Theme</ThemedText>

              <View style={{marginVertical: 5}}>

                <ThemedButton theme={'transparent'} style={{...styles.themeContainer}}>
                  {/*<LinearGradient
                      style={{height: 50, width: "100%"}}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      colors={['#ffffff', '#3A86FF', '#ffd60a']}
                  ></LinearGradient>*/}
                    <View style={{...styles.themeItem, backgroundColor: "#ffffff"}}></View>
                    <View style={{...styles.themeItem, backgroundColor: "#3A86FF"}}></View>
                    <View style={{...styles.themeItem, backgroundColor: "#ffd60a"}}></View>
                </ThemedButton>
                <ThemedButton theme={'transparent'} style={styles.themeContainer}>
                  {/*<LinearGradient
                      style={{height: 50, width: "100%"}}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      colors={['#ffffff', '#cbf3f0', '#ffbf69']}
                  ></LinearGradient>*/}
                  <View style={{...styles.themeItem, backgroundColor: "#ffffff"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#cbf3f0"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#ffbf69"}}></View>
                </ThemedButton>
                <ThemedButton theme={'transparent'} style={styles.themeContainer}>
                  {/*<LinearGradient
                      style={{height: 50, width: "100%"}}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      colors={['#feeafa', '#dee2ff', '#8e9aaf']}
                  ></LinearGradient>*/}
                  <View style={{...styles.themeItem, backgroundColor: "#feeafa"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#dee2ff"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#8e9aaf"}}></View>
                </ThemedButton>
                <ThemedButton theme={'transparent'} style={styles.themeContainer}>
                  {/*<LinearGradient
                      style={{height: 50, width: "100%"}}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      colors={['#dad7cd', '#588157', '#344e41']}
                  ></LinearGradient>*/}
                  <View style={{...styles.themeItem, backgroundColor: "#dad7cd"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#588157"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#344e41"}}></View>
                </ThemedButton>

                <ThemedButton theme={'transparent'} style={styles.themeContainer}>
                  {/*<LinearGradient
                      style={{height: 50, width: "100%"}}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      colors={['#000814', '#003566', '#ffc300']}
                  ></LinearGradient>*/}
                  <View style={{...styles.themeItem, backgroundColor: "#000814"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#003566"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#ffc300"}}></View>
                </ThemedButton>
                <ThemedButton theme={'transparent'} style={styles.themeContainer}>
                  {/*<LinearGradient
                      style={{height: 50, width: "100%"}}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      colors={['#252422', '#403d39', '#eb5e28']}
                  ></LinearGradient>*/}
                  {/*#fffcf2*/}
                  <View style={{...styles.themeItem, backgroundColor: "#252422"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#403d39"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#eb5e28"}}></View>
                </ThemedButton>
                <ThemedButton theme={'transparent'} style={styles.themeContainer}>
                  {/*<LinearGradient
                      style={{height: 50, width: "100%"}}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      colors={['#03071e', '#9d0208', '#faa307']}
                  ></LinearGradient>*/}
                  {/*#fffcf2*/}
                  <View style={{...styles.themeItem, backgroundColor: "#03071e"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#9d0208"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#faa307"}}></View>
                </ThemedButton>
                <ThemedButton theme={'transparent'} style={styles.themeContainer}>
                  {/*<LinearGradient
                      style={{height: 50, width: "100%"}}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      colors={['#312244', '#1b3a4b', '#4d194d']}
                  ></LinearGradient>*/}
                  {/*#fffcf2*/}
                  <View style={{...styles.themeItem, backgroundColor: "#312244"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#1b3a4b"}}></View>
                  <View style={{...styles.themeItem, backgroundColor: "#4d194d"}}></View>
                </ThemedButton>




              </View>
            </View>
          </View>

          <ThemedButton style={{...styles.container, marginTop: 5, display: "flex", flexDirection: "row", alignItems: "center"}}>
            <ThemedAntDesign name={'user'} />
            <ThemedText style={styles.heading}>Account</ThemedText>
          </ThemedButton>

          <ThemedButton
              style={{...styles.container, marginTop: 5,display: "flex", flexDirection: "row", alignItems: "center"}}
              onPress={() => {props.navigation.navigate('Settings-Password-Manager')}}
          >
            <ThemedAntDesign name={'unlock'} />
            <ThemedText style={styles.heading}>Password Manager</ThemedText>
          </ThemedButton>

          <View style={{...styles.container, marginTop: 5}}>
            <ThemedText style={styles.heading}>Support</ThemedText>

            <View style={styles.subContainer}>
              <ThemedButton theme={'transparent'} style={styles.navigationButton}>
                <ThemedText>About</ThemedText>
                <ThemedAntDesign name={'right'}/>
              </ThemedButton>
              <ThemedButton theme={'transparent'} style={styles.navigationButton}>
                <ThemedText>Make Requests</ThemedText>
                <ThemedAntDesign name={'right'}/>
              </ThemedButton>
              <ThemedButton theme={'transparent'} style={styles.navigationButton}>
                <ThemedText>Help/FAQ</ThemedText>
                <ThemedAntDesign name={'right'}/>
              </ThemedButton>
              <ThemedButton theme={'transparent'} style={styles.navigationButton}>
                <ThemedText>Report an Issue</ThemedText>
                <ThemedAntDesign name={'right'}/>
              </ThemedButton>
              <ThemedButton theme={'transparent'} style={styles.navigationButton}>
                <ThemedText>Contact Us</ThemedText>
                <ThemedAntDesign name={'right'}/>
              </ThemedButton>
            </View>
          </View>
        </View>
        </ScrollView>
      </ThemedView>
  )
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
    marginHorizontal: 10,
    backgroundColor: "rgba(134,134,134,0.3)",
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