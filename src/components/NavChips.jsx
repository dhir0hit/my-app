import {ThemedAntDesign, ThemedButton, ThemedText} from "./ThemedComponents";
import {Image, StyleSheet, View} from "react-native";
import {Component} from "react";


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
            }} style={{...styles.navChip, ...this.props.style}}>
                <ThemedAntDesign size={34} name={this.iconName}/>
                <ThemedText style={{...styles.navChips_text}}>{this.props.pageName}</ThemedText>
            </ThemedButton>
        )
    }
}

const styles = StyleSheet.create({
    navChip: {
        margin: 5,
        width: 250,
        height: 100,
        backgroundColor: "rgba(255,255,255,0.18)",
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