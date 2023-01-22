import {Component, useState} from "react";
import {ThemedAntDesign, ThemedButton, ThemedText, ThemedView} from "../../components/ThemedComponents";
import {Clipboard, StyleSheet, View, Text} from "react-native";
import GenerateString from "../../utils/GenerateString";
import Settings from "../../service/Settings";
import {LinearGradient} from "expo-linear-gradient";

const FontHexColor = '66';
const PasswordManagerGeneratePassword = (props) => {
    const Generator = new GenerateString();
    const [password, setPassword] = useState(Generator.Password);
    const [copyButton, setCopyButton] = useState("copy1")

    const [settings, setSettings] = useState(
        {
          username: "",
          pin: "",
          fontSize: 10,
          theme: {
            text: "#fffcf2",
            background: "#252422",
            primary: "",
            secondary: "#403d39",
            highlight: "#d35322",
          }
        }
    );

    Settings()
        .then((value) => {
          let result = JSON.parse(value);


          let temp = {
            username: result['username'],
            pin: result['pin'],
            fontSize: result['fontSize'],
            theme: result['theme']
          }
          setSettings(temp);
        })
    ;

    const copyToClipboard = () => {
      Clipboard.setString(password);
      setCopyButton("check");
      if(copyButton === "copy1") {
        let changeCopyButtonInterval = setInterval(function () {
          setCopyButton("copy1");
        }, 2000)
      }
      console.log("copied")
    }


    return (
          <View>
            <LinearGradient
                style={{...styles.mainContainer, paddingTop: 40}}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 1}}
                colors={[settings.theme.background, settings.theme.secondary]}
            >
              <Text style={{fontSize: 15, marginBottom: 30, color: settings.theme.text}}>Generate New Password</Text>
              <View style={{display: "flex", flexDirection: "row", marginVertical: 20}}>
                <Text style={{
                  fontSize: 20,
                  width: 210,
                  textAlign: "center",
                  color: settings.theme.text
                }}>{password}</Text>
                <ThemedButton onPress={copyToClipboard} style={{marginLeft: 10}} theme={'transparent'}>
                  <ThemedAntDesign color={settings.theme.text} name={copyButton}/>
                </ThemedButton>
              </View>
              <ThemedButton
                  onPress={() => {
                    setPassword(() => Generator.Password)
                  }}
                  style={
                    {
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 10,
                      width: 200,
                      backgroundColor: settings.theme.highlight + FontHexColor,
                      borderRadius: 5
                    }}>
                <ThemedAntDesign color={settings.theme.text} name={'sync'}/>
                <Text style={{paddingLeft: 10, fontSize: 15, color: settings.theme.text}}>Generate</Text>
              </ThemedButton>
            </LinearGradient>
          </View>
    )
}
/*
export default class PasswordManagerGeneratePassword extends Component{
    constructor(props) {
        super(props);
        this.generator = new GenerateString();
    }

    render() {
        return(
            <ThemedView style={styles.mainContainer}>
                <ThemedText>{this.generator.Password}</ThemedText>
            </ThemedView>
        )
    }
}*/

export default PasswordManagerGeneratePassword;

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

