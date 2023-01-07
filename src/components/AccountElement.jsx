import {ThemedAntDesign, ThemedButton, ThemedText} from "./ThemedComponents";
import {Image, StyleSheet, View} from "react-native";
import {Component} from "react";

export class AccountElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ThemedButton
                onPress={this.props.Details}
                style={{...styles.menuItemContainer, paddingHorizontal: 20}}
            >
                <View style={{...styles.menuItem}}>
                    {/*<Image style={{margin: 15}} source={require("../media/menu.png")}/>*/}
                    <ThemedAntDesign size={40} name={this.props.Platform}/>
                    <View style={{margin: 15}}>
                        <ThemedText style={{...styles.heading}}>{this.props.Platform}</ThemedText>
                        <ThemedText style={{fontSize: 15, paddingLeft: 2}}>{this.props.UserName}</ThemedText>
                    </View>
                </View>
                <ThemedAntDesign
                    name={'star'}
                    size={30}
                    color={this.props.favorite ? '#ffb400' : '#a8a8a8'}
                />
            </ThemedButton>
        )
    }
}

const styles = StyleSheet.create({
    menuItemContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.18)",
        marginVertical: 5,
        width: "100%"
    },
    heading: {
        fontSize: 25
    },
    menuItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
})