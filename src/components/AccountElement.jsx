import {Image, StyleSheet, View, Text} from "react-native";
import {Component} from "react";

// Importing Custom Elements
import {ThemedAntDesign, ThemedButton, ThemedText} from "./ThemedComponents"; // Themed components
import Loading from "./Loading"; // Loading components

const FontHexColor = '66';
export class AccountElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ThemedButton
                onPress={this.props.Details}
                style={{...styles.menuItemContainer, paddingHorizontal: 20, backgroundColor: this.props.theme.secondary}}
            >
                <View style={{...styles.menuItem}}>
                    {/*<Image style={{margin: 15}} source={require("../media/menu.png")}/>*/}
                    <ThemedAntDesign size={40} name={this.props.Platform} color={this.props.theme.text}/>
                    <View style={{margin: 15}}>
                        <Text style={{...styles.heading, color: this.props.theme.text}}>{this.props.Platform}</Text>
                        <Text style={{fontSize: 15, paddingLeft: 2, color: this.props.theme.text}}>{this.props.UserName}</Text>
                    </View>
                </View>
                <ThemedAntDesign
                    name={'star'}
                    size={30}
                    color={this.props.favorite ? this.props.theme.highlight : this.props.theme.text}
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