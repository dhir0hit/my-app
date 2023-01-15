import {Component, useState} from "react";
import {ThemedAntDesign, ThemedButton, ThemedText, ThemedView} from "../../components/ThemedComponents";
import {Clipboard, StyleSheet, View} from "react-native";
import GenerateString from "../../utils/GenerateString";


const PasswordManagerGeneratePassword = (props) => {
    const Generator = new GenerateString();
    const [password, setPassword] = useState(Generator.Password);
    const [copyButton, setCopyButton] = useState("copy1")

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
        <ThemedView style={styles.mainContainer}>
            <ThemedText style={{fontSize: 15, marginBottom: 30}}>Generate New Password</ThemedText>
            <View style={{display: "flex", flexDirection: "row", marginVertical: 20}}>
                <ThemedText style={{fontSize: 20, width: 210, textAlign: "center"}}>{password}</ThemedText>
                <ThemedButton onPress={copyToClipboard} style={{marginLeft: 10}} theme={'transparent'} >
                    <ThemedAntDesign name={copyButton} />
                </ThemedButton>
            </View>
            <ThemedButton
                onPress={() => {setPassword(()=>Generator.Password)}}
                style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 10, width: 200, backgroundColor: 'gray', borderRadius: 5}}>
                <ThemedAntDesign name={'sync'} />
                <ThemedText style={{paddingLeft: 10, fontSize: 15}}>Generate</ThemedText>
            </ThemedButton>
        </ThemedView>
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

