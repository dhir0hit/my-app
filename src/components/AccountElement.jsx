import {ThemedAntDesign, ThemedButton, ThemedText} from "./ThemedComponents";
import {Image, StyleSheet, View} from "react-native";
import {Component} from "react";

export class AccountElement extends Component {
    constructor(props) {
        super(props);

        const IconsName = ["google", "googleplus", "instagram", "creditcard", "mail", "laptop",
            "home", "shoppingcart", "user", "phone", "lock", "cloud", "windows", "ie", "chrome",
            "github", "safety", "bank", "apple1", "android1", "codepen", "amazon",
            "dropbox", "gitlab", "skype", "youtube", "wechat", "twitter", "html",
            "codesandbox", "dribbble", "wifi"];

        this.accountIcon = ""

        if (IconsName.includes(this.props.Platform.toLowerCase())) {
            this.accountIcon = this.props.Platform.toLowerCase();
        }
        else if (this.props.Platform.toLowerCase() === "google plus") {
            this.accountIcon = "googleplus"
        } else if (this.props.Platform.toLowerCase() === "drop box") {
            this.accountIcon = "dropbox"
        } else if (this.props.Platform.toLowerCase() === "linkedin") {
            this.accountIcon = "linkedin-sqaure"
        } else if (this.props.Platform.toLowerCase() === "facebook") {
            this.accountIcon = "facebook-sqaure"
        } else if (this.props.Platform.toLowerCase() === "app store") {
            this.accountIcon = "appstore1"
        } else if (this.props.Platform.toLowerCase() === "messange") {
            this.accountIcon = "message1"
        } else if (this.props.Platform.toLowerCase() === "messange") {
            this.accountIcon = "message1"
        } else if (this.props.Platform.toLowerCase() === "android" || this.props.Platform.toLowerCase() === "samsung") {
            this.accountIcon = "android1"
        } else if (this.props.Platform.toLowerCase() === "apple" || this.props.Platform.toLowerCase() === "iphone") {
            this.accountIcon = "apple1"
        } else if (this.props.Platform.toLowerCase() === "mobile" || this.props.Platform.toLowerCase() === "tablet" || this.props.Platform.toLowerCase() === "ipad" || this.props.Platform.toLowerCase() === "i pad") {
            this.accountIcon = "tablet1"
        } else if (this.props.Platform.toLowerCase() === "window") {
            this.accountIcon = "windows"
        } else if (this.props.Platform.toLowerCase() === "internet explorer") {
            this.accountIcon = "ie"
        } else if (this.props.Platform.toLowerCase() === "shopping" || this.props.Platform.toLowerCase() === "cart" || this.props.Platform.toLowerCase() === "shopping cart") {
            this.accountIcon = "shoppingcart"
        } else if (this.props.Platform.toLowerCase() === "email" || this.props.Platform.toLowerCase() === "gmail" || this.props.Platform.toLowerCase() === "mail") {
            this.accountIcon = "mail"
        } else {
            this.accountIcon = "idcard"
        }
    }

    render() {

        return (
            <ThemedButton
                onPress={this.props.Details}
                style={{...styles.menuItemContainer, paddingHorizontal: 20}}
            >
                <View style={{...styles.menuItem}}>
                    {/*<Image style={{margin: 15}} source={require("../media/menu.png")}/>*/}
                    <ThemedAntDesign size={40} name={this.accountIcon}/>
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