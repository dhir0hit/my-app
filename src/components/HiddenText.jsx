import {Pressable, View} from "react-native";
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
            <View><ThemedText>{isHidden ? hiddenText : textOutput}</ThemedText></View>
            <ThemedButton theme={"transparent"} onPress={()=>{console.log("Hide"); setHidden(!isHidden)}}><ThemedAntDesign name={isHidden ? "eyeo" : "eye"} /></ThemedButton>
        </View>
    )
}

export default HiddenText;