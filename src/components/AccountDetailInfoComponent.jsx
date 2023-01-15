import {View, Clipboard} from "react-native";
import {ThemedAntDesign, ThemedButton, ThemedText} from "./ThemedComponents";
import HiddenText from "./HiddenText";
import {useState} from "react";

export function AccountDetailInfoComponent(props) {

    const [copyButton, setCopyButton] = useState("copy1")

    const copyToClipboard = () => {
        Clipboard.setString(props.info);
        setCopyButton("check");
        if(copyButton === "copy1") {
            let changeCopyButtonInterval = setInterval(function () {
                setCopyButton("copy1");
            }, 2000)
        }
        console.log("copied")
    }

    return (
        <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <View style={{flex: 2}}>
                <ThemedText>{props.head}</ThemedText>
            </View>
            <View style={{flex: 4}}>
                {
                    props.head.toLowerCase() === "password" ?
                        <HiddenText text={props.info} />
                    :
                        <ThemedText>{props.info}</ThemedText>
                }
            </View>
            <View>
                <ThemedButton onPress={copyToClipboard} theme={"transparent"} style={{padding: 5}}><ThemedAntDesign name={copyButton}/></ThemedButton>
            </View>
        </View>
    );
}