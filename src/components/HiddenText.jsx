import {Pressable, View, Text} from "react-native";
import {ThemedAntDesign, ThemedButton, ThemedText} from "./ThemedComponents";
import {useEffect, useState} from "react";

function HiddenText(props) {
    const [textOutput, setTextOutput] = useState(props.text);
    const [isHidden, setHidden] = useState(true);

    let hiddenText = "";
    for (let i = 0; i < textOutput.length; i++) {
        hiddenText += "•"
    }
    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <View><Text style={{color: props.color}}>{isHidden ? hiddenText : textOutput}</Text></View>
            <ThemedButton theme={"transparent"} onPress={()=>{console.log("Hide"); setHidden(!isHidden)}}>
                <ThemedAntDesign color={props.color} name={isHidden ? "eyeo" : "eye"} />
            </ThemedButton>
        </View>
    )
}

export default HiddenText;