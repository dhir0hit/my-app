import {ThemedAntDesign, ThemedButton, ThemedText} from "./ThemedComponents";
import {Image, StyleSheet, View, Text} from "react-native";
import {Component} from "react";
import Settings from "../service/Settings";
import Loading from "./Loading";

const FontHexColor = '66';
class NavChips extends Component {
    constructor(props) {
        super(props);

        if (this.props.pageName === "Add Account") {
            this.iconName = "plus"
        } else if (this.props.pageName === "Generate Password") {
            this.iconName = "sync"
        } else if (this.props.pageName === "Settings") {
            this.iconName = "setting"
        }

        console.log(this.props.accountService.List);
        this.update = this.update.bind(this)

    }

    update = () => {
        this.props.Update()
    }
    render() {
        return (
            <ThemedButton onPress={() => {

                let page = "Password-Manager-" + this.props.pageName.replace(" ", "-");
                let _ = (this.props.pageName.split(" "));
                if (_[_.length - 1] === "List") {
                    page = "Password-Manager-List"
                }
                this.props.navigation.navigate(page, {accountService: this.props.accountService, Update: this.update});
            }} style={{...styles.navChip, ...this.props.style, backgroundColor: this.props.theme.secondary+FontHexColor}}>
                <ThemedAntDesign size={34} name={this.iconName}/>
                <Text style={{...styles.navChips_text, color: this.props.theme.text}}>{this.props.pageName}</Text>
            </ThemedButton>
        )
    }
}

const styles = StyleSheet.create({
    navChip: {
        margin: 5,
        width: 250,
        height: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 5,
        overflow: "hidden",
    },
    navChips_text: {
        fontSize: 17,
        textTransform: "capitalize",
    }
})

export default NavChips;